(() => {
  'use strict';
  const KEY = 'milico-audaz:tempo-servico:v1';
  const DAY = 86400000;
  const YEAR = 365;
  const CUTOFF = new Date(Date.UTC(2019, 11, 17));
  const TYPES = [
    ['efetivo', 'Serviço efetivo computável'],
    ['campanha', 'Serviço de campanha (contagem em dobro)'],
    ['licenca', 'Licença especial em gozo (conta como efetivo)'],
    ['familia', 'Licença para tratamento de saúde de pessoa da família'],
    ['ltip', 'Licença para tratar de interesse particular (não computável)'],
    ['conjuge', 'Licença para acompanhar cônjuge (não computável)'],
    ['outro', 'Outro período não computável']
  ];
  const $ = id => document.getElementById(id);
  const periodRoot = $('periods');
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateDay = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    const d = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value ? Math.floor(d.getTime() / DAY) : null;
  };
  const today = () => {
    const d = new Date();
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  };
  const fromDay = n => new Date(n * DAY);
  const fmtDate = n => fromDay(n).toLocaleDateString('pt-BR', {timeZone:'UTC'});
  const fmtDays = (n, allowFraction = false) => {
    if (!Number.isFinite(n)) return '—';
    const days = allowFraction ? Math.round(n * 100) / 100 : Math.round(n);
    const years = Math.floor(days / YEAR);
    const rest = Math.round((days - years * YEAR) * 100) / 100;
    const whole = Math.floor(rest);
    const fraction = rest - whole;
    const months = Math.floor(whole / 30);
    const remain = whole % 30;
    const parts = [];
    if (years) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
    if (months) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
    if (remain || !parts.length) parts.push(`${remain}${allowFraction && fraction ? `,${String(Math.round(fraction * 100)).padStart(2,'0')}` : ''} ${remain === 1 ? 'dia' : 'dias'}`);
    return parts.join(', ');
  };
  const number = id => {
    const value = Number($(id).value);
    const max = id === 'reserveHours' ? 800000 : 100000;
    return Number.isInteger(value) && value >= 0 && value <= max ? value : NaN;
  };
  const rows = () => [...periodRoot.querySelectorAll('.ts-period')].map(row => ({
    start: row.querySelector('[data-start]').value,
    end: row.querySelector('[data-end]').value,
    type: row.querySelector('[data-type]').value,
    categoryA: row.querySelector('[data-category-a]').checked
  }));
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({periods: rows(), publicDays:$('publicDays').value, reserveHours:$('reserveHours').value, oldLeave:$('oldLeave').value, oldVacation:$('oldVacation').value, lawCredits:$('lawCredits').value, career:$('career').value, framework:$('framework').value}));
    } catch (_) { /* armazenamento indisponível: a calculadora continua utilizável nesta visita */ }
  }
  function makeRow(data = {}) {
    const row = document.createElement('div');
    row.className = 'ts-period';
    row.innerHTML = `<label class="ts-field">Início do período<input type="date" data-start value="${esc(data.start || '')}" required></label>
      <label class="ts-field">Fim do período<input type="date" data-end value="${esc(data.end || '')}" required></label>
      <label class="ts-field">Tipo de período<select data-type>${TYPES.map(([v,t]) => `<option value="${v}" ${data.type === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <label class="ts-check"><input type="checkbox" data-category-a ${data.categoryA ? 'checked' : ''}> Período em guarnição especial Categoria A, conforme registro oficial</label>
      <div class="ts-actions"><button class="btn" type="button" data-remove>Remover período</button></div>`;
    row.querySelector('[data-remove]').addEventListener('click', () => { row.remove(); if (!periodRoot.children.length) makeRow(); changed(); });
    row.addEventListener('input', changed);
    row.addEventListener('change', changed);
    periodRoot.append(row);
  }
  function error(message) { $('error').textContent = message; $('error').hidden = !message; }
  function getPeriods() {
    const out = [];
    const now = Math.floor(today().getTime() / DAY);
    for (const p of rows()) {
      if (!p.start && !p.end) continue;
      const s = dateDay(p.start), e = dateDay(p.end);
      if (s === null || e === null) return {error:'Preencha as datas de início e fim de todos os períodos.'};
      if (e < s) return {error:'A data final de cada período deve ser igual ou posterior à data inicial.'};
      if (e > now) return {error:'Informe somente períodos já iniciados e encerrados até hoje.'};
      out.push({...p, s, e});
    }
    out.sort((a,b) => a.s-b.s);
    for (let i=1;i<out.length;i++) if (out[i].s <= out[i-1].e) return {error:`Os períodos informados se sobrepõem (${fmtDate(out[i].s)}). Ajuste as datas para evitar contagem duplicada.`};
    return {items:out};
  }
  function count(items, cut = Infinity) {
    let familyUsed = 0, effective = 0, excluded = 0, categoryDays = 0, activeDays = 0, isActiveOnCut = false;
    for (const p of items) {
      if (p.s > cut) continue;
      const end = Math.min(p.e, cut);
      if (end < p.s) continue;
      const days = end - p.s + 1;
      if (cut === Math.floor(CUTOFF.getTime()/DAY) && p.s <= cut && p.e >= cut) isActiveOnCut = true;
      if (p.type === 'ltip' || p.type === 'conjuge' || p.type === 'outro') { excluded += days; continue; }
      let eligible = days;
      if (p.type === 'familia') { eligible = Math.min(days, Math.max(0, YEAR - familyUsed)); familyUsed += days; excluded += days - eligible; }
      if (eligible <= 0) continue;
      const multiplier = p.type === 'campanha' ? 2 : 1;
      effective += eligible * multiplier;
      activeDays += eligible * multiplier;
      if (p.categoryA) categoryDays += eligible * multiplier;
    }
    const blocks = Math.floor(categoryDays / (2 * YEAR));
    const garrisonExtra = blocks * (2 * YEAR / 3);
    return {effective, excluded, categoryDays, blocks, garrisonExtra, activeDays, isActiveOnCut};
  }
  function credits() {
    const pub = number('publicDays'), hours = number('reserveHours'), leave = number('oldLeave'), vacation = number('oldVacation'), historical = number('lawCredits');
    if ([pub,hours,leave,vacation,historical].some(x => !Number.isFinite(x))) return null;
    return {pub, reserve:Math.floor(hours/8), leave:leave*2, vacation:vacation*2, historical, total:pub+Math.floor(hours/8)+leave*2+vacation*2+historical};
  }
  function activityRequirement(framework, year, isTransition) {
    if (framework === 'II') return 25 * YEAR;
    if (!isTransition) return 30 * YEAR;
    const yearsSince2021 = Math.max(0, year - 2020);
    return Math.min(30 * YEAR, Math.ceil(25 * YEAR + yearsSince2021 * (4 * YEAR / 12)));
  }
  function project(items, current, creditTotal, need, activityNeed) {
    if (current.activeDays <= 0) return null;
    const todayN = Math.floor(today().getTime()/DAY);
    const servingNow = items.some(p => p.s <= todayN && p.e >= todayN && !['ltip','conjuge','outro'].includes(p.type));
    if (!servingNow) return null;
    for (let delta=1; delta<=50*YEAR; delta++) {
      const d = todayN + delta;
      const futureItems = [...items, {s:todayN+1,e:d,type:'efetivo',categoryA:false}];
      const totals = count(futureItems);
      const total = totals.effective + totals.garrisonExtra + creditTotal;
      const active = current.activeDays + delta;
      if (total >= need && active >= activityNeed) return d;
    }
    return null;
  }
  function update() {
    const parsed = getPeriods();
    const c = credits();
    if (parsed.error) { error(parsed.error); return; }
    if (!c) { error('Use valores inteiros iguais ou maiores que zero nos campos de acréscimos.'); return; }
    error('');
    const items = parsed.items;
    const nowN = Math.floor(today().getTime()/DAY);
    const current = count(items, nowN);
    const total = current.effective + current.garrisonExtra + c.total;
    const cutoffN = Math.floor(CUTOFF.getTime()/DAY);
    const atLawParts = count(items, cutoffN);
    const atLaw = atLawParts.effective + atLawParts.garrisonExtra + c.historical + c.leave + c.vacation;
    const grandfathered = atLawParts.isActiveOnCut && atLaw >= 30*YEAR;
    const transition = atLawParts.isActiveOnCut && !grandfathered;
    const framework = $('framework').value;
    const year = today().getFullYear();
    let required = 35*YEAR;
    let reqActivity = activityRequirement(framework, year, transition);
    let regime = 'Regra geral após a Lei nº 13.954/2019';
    if (grandfathered) { required = 30*YEAR; reqActivity = 0; regime = 'Indício de direito preservado pela regra de transição'; }
    else if (transition) { required = 30*YEAR + Math.ceil(Math.max(0, 30*YEAR-atLaw)*0.17); regime = 'Regra de transição: tempo que faltava para 30 anos + 17%'; }
    $('effective').textContent = fmtDays(current.effective);
    $('excluded').textContent = fmtDays(current.excluded);
    $('garrison').textContent = `${current.blocks} bloco(s) completo(s) de 2 anos · ${fmtDays(current.garrisonExtra, true)}`;
    $('credits').textContent = fmtDays(c.total);
    $('total').textContent = fmtDays(total, true);
    $('transition').textContent = `${regime} · ${fmtDays(atLaw)} em 17/12/2019`;
    $('required').textContent = fmtDays(required, true);
    $('activity').textContent = `${fmtDays(current.activeDays)} / ${reqActivity ? fmtDays(reqActivity) : 'regra preservada'}`;
    $('projectionNote').textContent = 'A projeção pressupõe continuidade do serviço computável, sem novos afastamentos ou mudanças legais. O tempo de atividade é apresentado em dias corridos computáveis; afastamentos e situações funcionais podem alterar o resultado.';
    if ($('career').value !== 'yes') {
      $('projected').textContent = 'Não estimada: o art. 97 se refere ao militar de carreira.';
    } else {
      const projected = project(items, current, c.total, required, reqActivity);
      $('projected').textContent = projected === null ? 'Não estimada: informe serviço ativo na data de referência e um período que alcance hoje.' : fmtDate(projected);
    }
  }
  function changed() { save(); update(); }
  $('addPeriod').addEventListener('click', () => { makeRow(); changed(); periodRoot.lastElementChild.querySelector('[data-start]').focus(); });
  ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits','career','framework'].forEach(id => { $(id).addEventListener('input', changed); $(id).addEventListener('change', changed); });
  $('print').addEventListener('click', () => window.print());
  $('clear').addEventListener('click', () => {
    try { localStorage.removeItem(KEY); } catch (_) { }
    periodRoot.replaceChildren(); makeRow();
    ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits'].forEach(id => $(id).value='0');
    $('career').value='yes'; $('framework').value='I'; error(''); changed();
  });
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      periodRoot.replaceChildren();
      if (Array.isArray(saved.periods)) saved.periods.forEach(p => { if (p && TYPES.some(([v])=>v===p.type)) makeRow(p); });
      for (const id of ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits']) if (saved[id] !== undefined && /^\d+$/.test(String(saved[id]))) $(id).value=String(saved[id]);
      if (saved.career === 'no') $('career').value='no';
      if (saved.framework === 'II') $('framework').value='II';
    }
  } catch (_) { /* segue com formulário vazio */ }
  if (!periodRoot.children.length) makeRow();
  update();
})();
