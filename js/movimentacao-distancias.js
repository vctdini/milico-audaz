/* Etapa 57 — consulta assistida de distância rodoviária entre guarnições.
   Usa Nominatim (geocodificação) e OSRM público (rota de carro). A distância é estimativa,
   requer conferência do usuário e pode ser substituída manualmente. */
(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const cacheGeo = new Map();
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLocaleLowerCase('pt-BR');
  const parsePlace = raw => {
    const value = String(raw || '').trim();
    const m = value.match(/^(.+?)\s*[-,/]\s*([A-Z]{2})$/i);
    if (m) return `${m[1].trim()}, ${m[2].toUpperCase()}, Brasil`;
    return /brasil/i.test(value) ? value : `${value}, Brasil`;
  };
  async function geocode(place) {
    const query = parsePlace(place);
    const key = norm(query);
    if (cacheGeo.has(key)) return cacheGeo.get(key);
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {headers:{'Accept':'application/json'}});
    if (!response.ok) throw new Error('Não foi possível localizar a cidade agora.');
    const data = await response.json();
    if (!data.length) throw new Error(`Localidade não encontrada: ${place}. Confira cidade e UF.`);
    const point = {lat:Number(data[0].lat), lon:Number(data[0].lon), label:data[0].display_name};
    cacheGeo.set(key, point);
    return point;
  }
  async function routeKm(origin, destination) {
    const a = await geocode(origin);
    if (!cacheGeo.has(norm(parsePlace(destination)))) await new Promise(resolve => setTimeout(resolve, 1100));
    const b = await geocode(destination);
    const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false&alternatives=false&steps=false`;
    const response = await fetch(url, {headers:{'Accept':'application/json'}});
    if (!response.ok) throw new Error('Serviço de rotas indisponível no momento.');
    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes?.length) throw new Error('Não foi encontrada uma rota rodoviária entre as localidades.');
    return Math.round(data.routes[0].distance / 1000);
  }
  function setStatus(row, message, state='') {
    const el = $('.mov-distance-status', row);
    if (el) { el.textContent = message; el.className = `mov-distance-status ${state}`.trim(); }
  }
  function enhanceRow(row) {
    if (!row || $('.mov-distance-actions', row)) return;
    const wrap = document.createElement('div');
    wrap.className = 'mov-distance-actions';
    wrap.innerHTML = '<button type="button" class="btn btn-sec mov-distance-btn">Calcular distância automaticamente</button><small class="mov-distance-status" aria-live="polite">Informe origem e destino para consultar a rota.</small>';
    const remove = $('.mov-remover', row);
    if (remove) row.insertBefore(wrap, remove);
    else row.appendChild(wrap);
  }
  function enhanceAll() {
    document.querySelectorAll('#mov-destinos-lista .mov-destino').forEach(enhanceRow);
  }
  async function calculate(button) {
    const row = button.closest('.mov-destino');
    const origin = $('#mov-origem')?.value.trim();
    const destination = $('.mov-destino-nome', row)?.value.trim();
    const ida = $('.mov-destino-km-ida', row);
    const total = $('.mov-destino-km', row);
    if (!origin || !destination) {
      setStatus(row, 'Preencha a guarnição de origem e o destino.', 'is-error');
      return;
    }
    button.disabled = true;
    button.textContent = 'Consultando rota…';
    setStatus(row, 'Localizando as cidades e calculando a rota rodoviária…');
    try {
      const kmIda = await routeKm(origin, destination);
      if (!(kmIda > 0)) throw new Error('A rota retornou uma distância inválida.');
      const kmTotal = Math.round(kmIda * 2);
      if (ida) ida.value = String(Math.round(kmIda));
      if (total) total.value = String(Math.round(kmTotal));
      [ida,total].forEach(input => input?.dispatchEvent(new Event('input',{bubbles:true})));
      [ida,total].forEach(input => input?.dispatchEvent(new Event('change',{bubbles:true})));
      document.querySelector('#mov-passagens-lista')?.dispatchEvent(new Event('input',{bubbles:true}));
      setStatus(row, `Estimativa: ${kmIda.toLocaleString('pt-BR')} km por trecho · ${kmTotal.toLocaleString('pt-BR')} km ida e volta. Confira antes de usar.`, 'is-success');
    } catch (error) {
      setStatus(row, error.message || 'Falha ao consultar a rota. Informe a distância manualmente.', 'is-error');
    } finally {
      button.disabled = false;
      button.textContent = 'Calcular distância automaticamente';
    }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('.mov-distance-btn');
    if (button) calculate(button);
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'mov-origem' || event.target.classList.contains('mov-destino-nome')) {
      const row = event.target.closest('.mov-destino');
      if (row && $('.mov-distance-status', row)?.classList.contains('is-error')) setStatus(row, 'Altere os dados e consulte novamente.');
    }
  });

  // Distâncias aceitam casas decimais durante a digitação/colagem; ao sair do campo,
  // arredondamos para o quilômetro inteiro mais próximo para uso consistente nos cálculos.
  document.addEventListener('blur', event => {
    const input = event.target;
    if (!input.matches?.('.mov-destino-km, .mov-destino-km-ida')) return;
    const raw = String(input.value || '').trim().replace(',', '.');
    if (!raw) return;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return;
    input.value = String(Math.round(value));
    input.dispatchEvent(new Event('input', {bubbles:true}));
    input.dispatchEvent(new Event('change', {bubbles:true}));
    const row = input.closest('.mov-destino');
    if (row) setStatus(row, `Distância ajustada automaticamente para ${Number(input.value).toLocaleString('pt-BR')} km (quilômetro inteiro mais próximo).`, 'is-success');
  }, true);
  enhanceAll();
  const list = $('#mov-destinos-lista');
  if (list && 'MutationObserver' in window) new MutationObserver(records => {
  
  // Distâncias aceitam casas decimais durante a digitação/colagem; ao sair do campo,
  // arredondamos para o quilômetro inteiro mais próximo para uso consistente nos cálculos.
  document.addEventListener('blur', event => {
    const input = event.target;
    if (!input.matches?.('.mov-destino-km, .mov-destino-km-ida')) return;
    const raw = String(input.value || '').trim().replace(',', '.');
    if (!raw) return;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return;
    input.value = String(Math.round(value));
    input.dispatchEvent(new Event('input', {bubbles:true}));
    input.dispatchEvent(new Event('change', {bubbles:true}));
    const row = input.closest('.mov-destino');
    if (row) setStatus(row, `Distância ajustada automaticamente para ${Number(input.value).toLocaleString('pt-BR')} km (quilômetro inteiro mais próximo).`, 'is-success');
  }, true);
  enhanceAll();
    records.flatMap(record => [...record.addedNodes]).filter(node => node.nodeType === 1).forEach(node => {
      const rows = node.matches?.('.mov-destino') ? [node] : [...(node.querySelectorAll?.('.mov-destino') || [])];
      rows.forEach(row => {
        const button = $('.mov-distance-btn', row);
        if (button) { button.disabled = false; button.textContent = 'Calcular distância automaticamente'; }
        setStatus(row, 'Informe origem e destino para consultar a rota.');
      });
    });
  }).observe(list,{childList:true});
  $('#mov-limpar')?.addEventListener('click', () => setTimeout(() => {
    document.querySelectorAll('#mov-destinos-lista .mov-destino').forEach(row => setStatus(row,'Informe origem e destino para consultar a rota.'));
  },0));
})();
