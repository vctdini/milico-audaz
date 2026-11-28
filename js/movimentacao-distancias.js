/* Estimativa automática de rota rodoviária por Nominatim/OSRM.
   Os quilômetros são exibidos como resumo, sem edição manual na interface. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const geoCache = new Map();
  const geoPending = new Map();
  const timers = new WeakMap();
  const requests = new WeakMap();
  let geoQueue = Promise.resolve();
  let lastGeoRequest = 0;
  let nextRouteId = 1;
  const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('pt-BR');
  const parsePlace = raw => {
    const value = String(raw || '').trim();
    const match = value.match(/^(.+?)\s*[-,/ ]\s*([A-Z]{2})$/i);
    if (match) return `${match[1].trim()}, ${match[2].toUpperCase()}, Brasil`;
    return /brasil/i.test(value) ? value : `${value}, Brasil`;
  };
  const summaryList = () => $('.mov-distance-summary-list');
  function ensureSummaryItem(row) {
    const list = summaryList();
    if (!row || !list) return null;
    const allRows = [...document.querySelectorAll('#mov-destinos-lista .mov-destino')];
    if (!row.dataset.distanceId || allRows.some(other => other !== row && other.dataset.distanceId === row.dataset.distanceId)) {
      row.dataset.distanceId = `mov-route-${nextRouteId++}`;
    }
    let item = [...list.children].find(child => child.dataset.routeId === row.dataset.distanceId);
    if (!item) {
      item = document.createElement('div');
      item.className = 'mov-distance-summary-item';
      item.dataset.routeId = row.dataset.distanceId;
      const destination = document.createElement('span');
      destination.className = 'mov-distance-summary-destination';
      const value = document.createElement('strong');
      value.className = 'mov-distance-status';
      item.append(destination, value);
      list.appendChild(item);
    }
    const input = $('.mov-destino-nome', row);
    const label = input?.value.trim() || `Destino ${allRows.indexOf(row) + 1}`;
    $('.mov-distance-summary-destination', item).textContent = label;
    const empty = $('.mov-distance-summary-empty', list);
    if (empty) empty.remove();
    return item;
  }
  function setStatus(row, message, state = '') {
    const item = ensureSummaryItem(row);
    const element = $('.mov-distance-status', item);
    if (!element) return;
    element.textContent = message;
    element.className = `mov-distance-status ${state}`.trim();
  }
  async function geocode(place) {
    const query = parsePlace(place);
    const key = norm(query);
    if (geoCache.has(key)) return geoCache.get(key);
    if (geoPending.has(key)) return geoPending.get(key);
    const pending = geoQueue.then(async () => {
      const wait = Math.max(0, 1100 - (Date.now() - lastGeoRequest));
      if (wait) await new Promise(resolve => setTimeout(resolve, wait));
      lastGeoRequest = Date.now();
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&q=${encodeURIComponent(query)}`, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Não foi possível localizar a cidade agora.');
      const data = await response.json();
      if (!data.length) throw new Error(`Localidade não encontrada: ${place}. Confira cidade e UF.`);
      const point = { lat: Number(data[0].lat), lon: Number(data[0].lon) };
      geoCache.set(key, point);
      return point;
    });
    geoPending.set(key, pending);
    geoQueue = pending.catch(() => {});
    try { return await pending; }
    finally { geoPending.delete(key); }
  }
  async function routeKm(origin, destination) {
    const a = await geocode(origin);
    const b = await geocode(destination);
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false&alternatives=false&steps=false`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Serviço de rotas indisponível no momento.');
    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes?.length) throw new Error('Não foi encontrada uma rota rodoviária entre as localidades.');
    return Math.round(data.routes[0].distance / 1000);
  }
  function enhanceRow(row) {
    if (!row) return;
    ensureSummaryItem(row);
  }
  function schedule(row, delay = 500) {
    if (!row) return;
    clearTimeout(timers.get(row));
    requests.set(row, (requests.get(row) || 0) + 1);
    const distance = $('.mov-destino-km-ida', row);
    const origin = $('#mov-origem')?.value.trim();
    const destination = $('.mov-destino-nome', row)?.value.trim();
    if (distance?.dataset.source === 'auto') distance.value = '';
    delete distance?.dataset.source;
    if (!origin || !destination) {
      setStatus(row, 'Informe a origem e o destino para estimar a distância.');
      return;
    }
    setStatus(row, 'Preparando a estimativa automática…', 'is-loading');
    timers.set(row, setTimeout(() => calculate(row, origin, destination), delay));
  }
  async function calculate(row, origin, destination) {
    const token = requests.get(row) || 0;
    const distance = $('.mov-destino-km-ida', row);
    setStatus(row, 'Consultando as guarnições e a rota rodoviária…', 'is-loading');
    try {
      const km = await routeKm(origin, destination);
      if (requests.get(row) !== token) return;
      if (!(km > 0)) throw new Error('A rota retornou uma distância inválida.');
      distance.value = String(km);
      distance.dataset.source = 'auto';
      distance.dispatchEvent(new Event('change', { bubbles: true }));
      $('#mov-passagens-lista')?.dispatchEvent(new Event('input', { bubbles: true }));
      setStatus(row, `${km.toLocaleString('pt-BR')} km de ida`, 'is-success');
    } catch (error) {
      if (requests.get(row) === token) setStatus(row, `${error.message || 'Falha na consulta.'} Confira e selecione novamente as guarnições para tentar outra vez.`, 'is-error');
    }
  }
  function handlePlaceEvent(event) {
    const target = event.target;
    const delay = event.type === 'input' ? 500 : 0;
    if (target.id === 'mov-origem') {
      document.querySelectorAll('#mov-destinos-lista .mov-destino').forEach(row => schedule(row, delay));
    } else if (target.matches?.('.mov-destino-nome')) {
      const row = target.closest('.mov-destino');
      ensureSummaryItem(row);
      schedule(row, delay);
    }
  }
  document.addEventListener('input', handlePlaceEvent, true);
  document.addEventListener('change', handlePlaceEvent, true);
  document.addEventListener('focusout', handlePlaceEvent, true);
  const list = $('#mov-destinos-lista');
  if (list && 'MutationObserver' in window) new MutationObserver(records => {
    records.flatMap(record => [...record.addedNodes]).filter(node => node.nodeType === 1).forEach(node => {
      const row = node.matches?.('.mov-destino') ? node : $('.mov-destino', node);
      if (!row) return;
      delete row.dataset.distanceId;
      const distance = $('.mov-destino-km-ida', row);
      if (distance) { distance.value = ''; delete distance.dataset.source; }
      enhanceRow(row);
      setStatus(row, 'Informe a origem e o destino para estimar a distância.');
    });
    const activeIds = new Set([...list.querySelectorAll('.mov-destino')].map(row => row.dataset.distanceId));
    summaryList()?.querySelectorAll('[data-route-id]').forEach(item => {
      if (!activeIds.has(item.dataset.routeId)) item.remove();
    });
    const summary = summaryList();
    if (summary && !summary.querySelector('[data-route-id]')) {
      summary.innerHTML = '<p class="mov-distance-summary-empty">Informe a origem e o destino para consultar uma estimativa.</p>';
    }
  }).observe(list, { childList: true });
  document.querySelectorAll('#mov-destinos-lista .mov-destino').forEach(row => {
    enhanceRow(row);
    if ($('#mov-origem')?.value.trim() && $('.mov-destino-nome', row)?.value.trim()) schedule(row);
    else setStatus(row, 'Informe a origem e o destino para estimar a distância.');
  });
  $('#mov-limpar')?.addEventListener('click', () => setTimeout(() => {
    document.querySelectorAll('#mov-destinos-lista .mov-destino').forEach(row => {
      const distance = $('.mov-destino-km-ida', row);
      if (distance) delete distance.dataset.source;
      setStatus(row, 'Informe a origem e o destino para estimar a distância.');
    });
  }, 0));
})();
