(() => {
  'use strict';
  const KEY = 'milico-audaz:tempo-servico:v1';
  const DAY = 86400000;
  const YEAR = 365;
  const CUTOFF = new Date(Date.UTC(2019, 11, 17));
  const TYPES = ['efetivo', 'licenca', 'ltip', 'lac', 'familia', 'campanha', 'outroComputavel', 'outro'];
  const $ = id => document.getElementById(id);
  const periodRoot = $('periods');
  const periodDialog = $('periodDialog');
  const periodForm = $('periodForm');
  let periods = [];
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
    if (!Number.isFinite(n)) return '\u2014';
    const days = allowFraction ? Math.round(n * 100) / 100 : Math.round(n);
    const years = Math.floor(days / YEAR);
    const rest = Math.round((days - years * YEAR) * 100) / 100;
    const whole = Math.floor(rest);
    const fraction = rest - whole;
    const months = Math.floor(whole / 30);
    const remain = whole % 30;
    const parts = [];
    if (years) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
    if (months) parts.push(`${months} ${months === 1 ? 'm\u00eas' : 'meses'}`);
    if (remain || !parts.length) parts.push(`${remain}${allowFraction && fraction ? `,${String(Math.round(fraction * 100)).padStart(2,'0')}` : ''} ${remain === 1 ? 'dia' : 'dias'}`);
    return parts.join(', ');
  };
  const number = id => {
    const value = Number($(id).value);
    const max = id === 'reserveHours' ? 800000 : 100000;
    return Number.isInteger(value) && value >= 0 && value <= max ? value : NaN;
  };
  const rows = () => periods.map(p => ({...p}));
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({periods:rows(), publicDays:$('publicDays').value, reserveHours:$('reserveHours').value, oldLeave:$('oldLeave').value, oldVacation:$('oldVacation').value, lawCredits:$('lawCredits').value, career:$('career').value, framework:$('framework').value}));
    } catch (_) { /* Armazenamento indispon\u00edvel; o formul\u00e1rio continua nesta visita. */ }
  }
  function error(message) { $('error').textContent = message; $('error').hidden = !message; }
  function renderPeriods() {
    if (!periods.length) {
      periodRoot.innerHTML = '<p class="ts-period-empty">Nenhum per\u00edodo adicionado. Use o bot\u00e3o para incluir o primeiro.</p>';
      return;
    }
    periodRoot.innerHTML = periods.map((p, index) => {
      const option = $('dialogType').querySelector(`option[value="${p.type}"]`);
      const type = option ? option.textContent : 'Per\u00edodo informado';
      const tags = p.categoryA ? '<span>Guarni\u00e7\u00e3o Categoria A</span>' : '';
      return `<article class="ts-period-card"><div class="ts-period-info"><strong>${esc(type)}</strong><span>${esc(fmtDate(dateDay(p.start)))} a ${esc(fmtDate(dateDay(p.end)))}</span>${p.description ? `<small>${esc(p.description)}</small>` : ''}<div class="ts-period-tags">${tags}</div></div><button class="btn btn-sec ts-remove-period" type="button" data-remove-period="${index}" aria-label="Remover ${esc(type)} de ${esc(fmtDate(dateDay(p.start)))} a ${esc(fmtDate(dateDay(p.end)))}">Remover</button></article>`;
    }).join('');
    periodRoot.querySelectorAll('[data-remove-period]').forEach(button => button.addEventListener('click', () => {
      periods.splice(Number(button.dataset.removePeriod), 1);
      renderPeriods();
      changed();
    }));
  }
  function getPeriods() {
    const out = [];
    const now = Math.floor(today().getTime() / DAY);
    for (const p of rows()) {
      const s = dateDay(p.start), e = dateDay(p.end);
      if (s === null || e === null) return {error:'Verifique as datas dos per\u00edodos cadastrados.'};
      if (e < s) return {error:'A data final deve ser igual ou posterior \u00e0 data inicial.'};
      if (e > now) return {error:'Informe somente per\u00edodos encerrados at\u00e9 hoje.'};
      out.push({...p, s, e});
    }
    out.sort((a,b) => a.s-b.s);
    for (let i=1;i<out.length;i++) if (out[i].s <= out[i-1].e) return {error:`Os per\u00edodos se sobrep\u00f5em (${fmtDate(out[i].s)}). Evite contagem duplicada.`};
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
      if (p.type === 'ltip' || p.type === 'lac' || p.type === 'outro') { excluded += days; continue; }
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
    const servingNow = items.some(p => p.s <= todayN && p.e >= todayN && !['ltip','lac','outro'].includes(p.type));
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
    if (!c) { error('Use n\u00fameros inteiros iguais ou maiores que zero nos acr\u00e9scimos.'); return; }
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
    let regime = 'Regra geral ap\u00f3s a Lei n\u00ba 13.954/2019';
    if (grandfathered) { required = 30*YEAR; reqActivity = 0; regime = 'Ind\u00edcio de direito preservado pela regra de transi\u00e7\u00e3o'; }
    else if (transition) { required = 30*YEAR + Math.ceil(Math.max(0, 30*YEAR-atLaw)*0.17); regime = 'Regra de transi\u00e7\u00e3o: tempo que faltava para 30 anos + 17%'; }
    $('effective').textContent = fmtDays(current.effective);
    $('excluded').textContent = fmtDays(current.excluded);
    $('garrison').textContent = `${current.blocks} bloco(s) completo(s) de 2 anos \u00b7 ${fmtDays(current.garrisonExtra, true)}`;
    $('credits').textContent = fmtDays(c.total);
    $('total').textContent = fmtDays(total, true);
    $('transition').textContent = `${regime} \u00b7 ${fmtDays(atLaw)} em 17/12/2019`;
    $('required').textContent = fmtDays(required, true);
    $('activity').textContent = `${fmtDays(current.activeDays)} / ${reqActivity ? fmtDays(reqActivity) : 'regra preservada'}`;
    $('projectionNote').textContent = 'A proje\u00e7\u00e3o pressup\u00f5e continuidade do servi\u00e7o comput\u00e1vel, sem novos afastamentos ou mudan\u00e7as legais. A contagem depende da confer\u00eancia dos assentamentos.';
    if ($('career').value !== 'yes') $('projected').textContent = 'N\u00e3o estimada: o art. 97 se refere ao militar de carreira.';
    else {
      const projected = project(items, current, c.total, required, reqActivity);
      $('projected').textContent = projected === null ? 'N\u00e3o estimada: informe servi\u00e7o ativo que alcance a data de hoje.' : fmtDate(projected);
    }
  }
  function changed() { save(); update(); }
  function clearDialogError() { $('dialogError').textContent = ''; $('dialogError').hidden = true; }
  $('addPeriod').addEventListener('click', () => {
    periodForm.reset();
    clearDialogError();
    const max = today().toISOString().slice(0,10);
    $('dialogStart').max = max;
    $('dialogEnd').max = max;
    periodDialog.showModal();
    $('dialogStart').focus();
  });
  $('closeDialog').addEventListener('click', () => periodDialog.close());
  $('cancelDialog').addEventListener('click', () => periodDialog.close());
  periodForm.addEventListener('submit', event => {
    event.preventDefault();
    clearDialogError();
    const period = {start:$('dialogStart').value, end:$('dialogEnd').value, type:$('dialogType').value, description:$('dialogDescription').value.trim().slice(0,120), categoryA:$('dialogCategoryA').checked};
    const start = dateDay(period.start), end = dateDay(period.end), todayN = Math.floor(today().getTime()/DAY);
    let message = '';
    if (start === null || end === null) message = 'Preencha as datas inicial e final.';
    else if (end < start) message = 'A data final deve ser igual ou posterior \u00e0 data inicial.';
    else if (end > todayN) message = 'Informe somente per\u00edodos encerrados at\u00e9 hoje.';
    else if (periods.some(p => start <= dateDay(p.end) && end >= dateDay(p.start))) message = 'Este per\u00edodo se sobrep\u00f5e a outro j\u00e1 cadastrado. Ajuste as datas antes de adicionar.';
    if (message) { $('dialogError').textContent = message; $('dialogError').hidden = false; return; }
    periods.push(period);
    periods.sort((a,b) => dateDay(a.start)-dateDay(b.start));
    renderPeriods();
    periodDialog.close();
    changed();
    $('addPeriod').focus();
  });
  ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits','career','framework'].forEach(id => { $(id).addEventListener('input', changed); $(id).addEventListener('change', changed); });
  $('print').addEventListener('click', () => window.print());
  $('clear').addEventListener('click', () => {
    try { localStorage.removeItem(KEY); } catch (_) { }
    periods = [];
    renderPeriods();
    ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits'].forEach(id => $(id).value='0');
    $('career').value='yes'; $('framework').value='I'; error(''); changed();
  });
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      if (Array.isArray(saved.periods)) saved.periods.forEach(p => {
        const type = p && p.type === 'conjuge' ? 'lac' : p?.type;
        if (p && TYPES.includes(type) && dateDay(p.start) !== null && dateDay(p.end) !== null && dateDay(p.end) >= dateDay(p.start)) periods.push({start:p.start,end:p.end,type,description:String(p.description || '').slice(0,120),categoryA:!!p.categoryA});
      });
      for (const id of ['publicDays','reserveHours','oldLeave','oldVacation','lawCredits']) if (saved[id] !== undefined && /^\d+$/.test(String(saved[id]))) $(id).value=String(saved[id]);
      if (saved.career === 'no') $('career').value='no';
      if (saved.framework === 'II') $('framework').value='II';
    }
  } catch (_) { /* Abre com os valores padr\u00e3o. */ }
  renderPeriods();
  update();
})();
