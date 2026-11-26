(() => {
  'use strict';

  const KEY = 'milico-audaz:perfil:v1';
  const $ = (id) => document.getElementById(id);
  const money = (value) => (Number(value) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const number = (value) => Number(String(value ?? '').trim().replace(',', '.'));
  let base = 0;
  let remuneration = [];
  let indemnityCount = 0;

  function refreshProfile() {
    let profile;
    try { profile = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) { profile = null; }
    const rows = profile?.version === 1 && Array.isArray(profile?.data?.['compensacao-rubricas'])
      ? profile.data['compensacao-rubricas'] : [];
    remuneration = rows.map((item) => ({
      name: String(item?.nome || 'Rubrica remuneratória'),
      value: number(item?.valor)
    })).filter((item) => Number.isFinite(item.value) && item.value >= 0);
    base = remuneration.reduce((sum, item) => sum + item.value, 0);
    $('remuneracao').replaceChildren();
    remuneration.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'calc-row cp-remuneration-row';
      const name = document.createElement('strong'); name.textContent = item.name;
      const value = document.createElement('span'); value.textContent = money(item.value);
      row.append(name, value); $('remuneracao').appendChild(row);
    });
    $('base-total').textContent = money(base);
    const ready = remuneration.length > 0;
    $('perfil-status').textContent = ready
      ? `Remuneração carregada do contracheque de ${profile.data.posto || 'posto não identificado'}. A base é somente leitura e será atualizada quando você salvar alterações no contracheque.`
      : 'Preencha o contracheque para carregar automaticamente sua remuneração nesta simulação.';
    $('perfil-link').textContent = ready ? 'Editar meu contracheque' : 'Preencher meu contracheque';
    $('calcular').disabled = !ready;
    $('sem-perfil').hidden = ready;
  }

  function addIndemnity(name = '', value = '') {
    const row = document.createElement('div');
    row.className = 'calc-row cp-row cp-indemnity-row';
    row.dataset.row = String(++indemnityCount);
    row.innerHTML = '<label>Parcela indenizatória<input type="text" data-name maxlength="90" placeholder="Ex.: férias não gozadas"></label>' +
      '<label>Valor já apurado (R$)<input type="number" data-value min="0" step="0.01" inputmode="decimal" placeholder="0,00"></label>' +
      '<button type="button" class="remove-row" aria-label="Remover parcela">×</button>';
    row.querySelector('[data-name]').value = name;
    row.querySelector('[data-value]').value = value;
    row.querySelector('.remove-row').addEventListener('click', () => { row.remove(); clearResult(); });
    row.addEventListener('input', clearResult);
    $('indenizacoes').appendChild(row);
    return row;
  }

  function clearResult() { $('resultado').hidden = true; $('resultado').replaceChildren(); }
  $('adicionar-indenizacao').addEventListener('click', () => addIndemnity());
  $('forma').addEventListener('change', () => { $('parcelas-wrap').hidden = $('forma').value !== 'parcelado'; clearResult(); });
  $('comp-form').addEventListener('input', clearResult);
  $('comp-form').addEventListener('change', clearResult);
  ['ferias-periodos', 'ferias-dias', 'ferias-adicional-nao-recebido'].forEach((id) => $(id).addEventListener('input', clearResult));
  window.addEventListener('storage', (event) => { if (event.key === KEY) refreshProfile(); });

  function errors() {
    const messages = [];
    [['anos', 'Anos completos do tempo total', true, 0, Infinity], ['dias', 'Dias restantes do tempo total', true, 0, 364],
      ['ob-anos', 'Anos de serviço obrigatório a excluir', false, 0, Infinity], ['ob-dias', 'Dias de serviço obrigatório a excluir', false, 0, 364]]
      .forEach(([id, label, required, min, max]) => {
        const raw = $(id).value.trim();
        if (!raw && !required) { $(id).value = '0'; return; }
        if (!/^\d+$/.test(raw)) { messages.push(`${label}: informe um número inteiro${required ? '' : ' ou deixe em branco para zero'}.`); return; }
        const value = Number(raw);
        if (value < min || value > max) messages.push(`${label}: informe um valor inteiro válido.`);
      });
    const totalDays = Number($('anos').value) * 365 + Number($('dias').value);
    const excludedDays = Number($('ob-anos').value) * 365 + Number($('ob-dias').value);
    if (excludedDays > totalDays) messages.push('O período de serviço obrigatório não pode superar o tempo total informado.');
    if (!remuneration.length) messages.push('Não há remuneração carregada. Salve o contracheque antes de calcular.');
    const vacationPeriods = $('ferias-periodos').value.trim();
    const vacationDays = $('ferias-dias').value.trim();
    const unpaidVacationBonusPeriods = $('ferias-adicional-nao-recebido').value.trim();
    if (!/^\d+$/.test(vacationPeriods) || Number(vacationPeriods) > 100) messages.push('Informe uma quantidade de períodos de férias entre 0 e 100.');
    if (!/^\d+$/.test(vacationDays) || Number(vacationDays) < 1 || Number(vacationDays) > 60) messages.push('Informe entre 1 e 60 dias por período de férias.');
    if (!/^\d+$/.test(unpaidVacationBonusPeriods) || Number(unpaidVacationBonusPeriods) > Number(vacationPeriods)) messages.push('A quantidade de períodos sem adicional de férias recebido não pode superar os períodos informados.');
    $('indenizacoes').querySelectorAll('.cp-indemnity-row').forEach((row, index) => {
      const name = row.querySelector('[data-name]').value.trim();
      const raw = row.querySelector('[data-value]').value.trim();
      if (!name && !raw) return;
      if (!name || !raw || !Number.isFinite(number(raw)) || number(raw) < 0) messages.push(`Parcela adicional ${index + 1}: informe descrição e valor apurado válido.`);
    });
    if ($('forma').value === 'parcelado') {
      const units = Math.floor((totalDays - excludedDays) / 365) + (((totalDays - excludedDays) % 365) >= 180 ? 1 : 0);
      const raw = $('parcelas').value.trim(), count = Number(raw);
      if (!/^\d+$/.test(raw) || count < 2 || count > 60 || count > units) messages.push(`A quantidade de parcelas deve ser de 2 a ${Math.min(60, Math.max(1, units))}, sem superar as remunerações mensais computáveis.`);
    }
    return messages;
  }

  function submit(event) {
    event.preventDefault();
    const issues = errors();
    const box = $('cp-form-errors');
    if (issues.length) {
      const heading = document.createElement('strong'); heading.textContent = 'Revise estes dados antes de calcular:';
      const list = document.createElement('ul');
      issues.forEach((message) => { const li = document.createElement('li'); li.textContent = message; list.appendChild(li); });
      box.replaceChildren(heading, list); box.hidden = false; clearResult(); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); return;
    }
    box.hidden = true;
    const years = Number($('anos').value), days = Number($('dias').value);
    const obligationYears = Number($('ob-anos').value), obligationDays = Number($('ob-dias').value);
    const remaining = years * 365 + days - (obligationYears * 365 + obligationDays);
    const completeYears = Math.floor(remaining / 365), fraction = remaining % 365;
    const units = completeYears + (fraction >= 180 ? 1 : 0);
    const cpTotal = Math.round((base * units + Number.EPSILON) * 100) / 100;
    const vacationPeriods = Number($('ferias-periodos').value);
    const vacationDays = Number($('ferias-dias').value);
    const vacationBonusPeriods = Number($('ferias-adicional-nao-recebido').value);
    const vacationPay = Math.round(((base / 30) * vacationPeriods * vacationDays + (base / 3) * vacationBonusPeriods + Number.EPSILON) * 100) / 100;
    const extras = [...$('indenizacoes').querySelectorAll('.cp-indemnity-row')].map((row) => ({
      name: row.querySelector('[data-name]').value.trim(), value: number(row.querySelector('[data-value]').value)
    })).filter((item) => item.name && Number.isFinite(item.value) && item.value > 0);
    const extrasTotal = extras.reduce((sum, item) => sum + item.value, 0);
    const separateTotal = Math.round((vacationPay + extrasTotal + Number.EPSILON) * 100) / 100;
    const combined = Math.round((cpTotal + separateTotal + Number.EPSILON) * 100) / 100;
    const parts = $('forma').value === 'parcelado' ? Number($('parcelas').value) : 1;
    const each = Math.floor(units / parts), remainder = units % parts;
    const payment = parts === 1 ? `<p>Pagamento único simulado: <strong>${money(cpTotal)}</strong>.</p>`
      : `<p>${Array.from({ length: parts }, (_, index) => { const count = each + (index < remainder ? 1 : 0); return `Parcela ${index + 1}: ${count} remuneração(ões) — ${money(base * count)}`; }).join(' · ')}</p><p>O parcelamento depende de acordo formalizado no âmbito da Força.</p>`;
    const rows = remuneration.map((item) => `<tr><td>${item.name.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</td><td>${money(item.value)}</td></tr>`).join('');
    const additionalRows = `<h3>Indenização estimada por férias não gozadas</h3><p>${vacationPeriods} período(s) × ${vacationDays} dias; adicional de férias não recebido em ${vacationBonusPeriods} período(s).</p><p>Remuneração diária (${money(base)} ÷ 30) × dias não gozados, mais 1/3 da remuneração mensal por período sem adicional recebido: <strong>${money(vacationPay)}</strong>.</p>${extras.length ? `<h3>Outras parcelas informadas</h3><div class="table-wrap"><table><thead><tr><th>Parcela</th><th>Valor</th></tr></thead><tbody>${extras.map((item) => `<tr><td>${item.name.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</td><td>${money(item.value)}</td></tr>`).join('')}</tbody></table></div>` : '<p>Nenhuma outra parcela foi informada.</p>'}<p>Férias e outras parcelas fora da compensação pecuniária: <strong>${money(separateTotal)}</strong>. Soma informativa dos valores simulados: <strong>${money(combined)}</strong>.</p>`;
    $('resultado').innerHTML = `<div class="res-title"><span class="res-title-mark">✓</span><strong>Resultado da simulação</strong></div>
      <div class="cc-report cc-margin-highlight"><small>Compensação pecuniária estimada</small><strong>${money(cpTotal)}</strong><p>${money(base)} de remuneração mensal do contracheque × ${units} ano(s) computável(is).</p></div>
      <h3>Memória do tempo computável</h3><p>Tempo total: ${years} ano(s) e ${days} dia(s). Serviço obrigatório excluído: ${obligationYears} ano(s) e ${obligationDays} dia(s).</p><p>Após a exclusão: ${completeYears} ano(s) completos e ${fraction} dia(s) restantes. ${fraction >= 180 ? 'A fração de 180 dias ou mais foi computada como um ano.' : 'A fração inferior a 180 dias não gerou ano adicional.'}</p>
      <h3>Remuneração carregada do contracheque</h3><div class="table-wrap"><table><thead><tr><th>Rubrica</th><th>Valor mensal</th></tr></thead><tbody>${rows}</tbody></table></div><p><strong>Base mensal utilizada: ${money(base)}</strong></p><h3>Pagamento simulado</h3>${payment}${additionalRows}
      <div class="warn"><strong>Simulação sujeita à conferência administrativa:</strong> a Lei nº 7.963/1989 disciplina a compensação no licenciamento ex officio por término de prorrogação e exclui do cômputo o serviço militar obrigatório. As férias são estimadas separadamente pela remuneração diária e pelo adicional não recebido, conforme a Portaria Normativa nº 28/2019. A simulação não aplica atualização pelo IPCA nem confirma direito ou cumulação; a indenização depende de documentação e análise administrativa.</div>`;
    $('resultado').hidden = false; $('resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $('comp-form').addEventListener('submit', submit);
  refreshProfile();
})();
