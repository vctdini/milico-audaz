/* Milico Audaz — apresentação simplificada e integração explícita do perfil remuneratório */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const form = document.querySelector('form.mov-calc');
  if (!form) return;

  const actions = form.querySelector('.mov-actions');
  // Remove o aviso genérico de perfil nesta tela: o cartão específico abaixo o substitui.
  document.querySelector('[data-profile-notice]')?.remove();
  const items = $('mov-itens');
  const destinations = $('comparacao-destinos');
  $('mov-adicionar-destino')?.classList.add('mov-add-destination');
  const passages = $('mov-passagens-grupo');
  const hint = form.querySelector('.mov-form-hint');
  const shortcuts = form.querySelector('.mov-atalhos');
  shortcuts?.remove();

  // Resumo do contracheque: os dados detalhados continuam no perfil compartilhado.
  const panel = document.createElement('section');
  panel.className = 'mov-profile-card';
  panel.id = 'mov-profile-card';
  panel.setAttribute('aria-labelledby', 'mov-profile-title');
  panel.innerHTML = `
    <div class="mov-profile-heading"><div><h2 id="mov-profile-title">Posto e base de cálculo da ajuda de custo</h2><p>Dados aproveitados do seu contracheque.</p></div><span class="mov-profile-state" id="mov-profile-state">Verificando perfil…</span></div>
    <div class="mov-profile-grid">
      <div><span class="mov-mini-label">Posto ou graduação</span><strong id="mov-profile-posto">—</strong></div>
      <div><span class="mov-mini-label">Base de cálculo (R$)</span><strong id="mov-profile-base">—</strong></div>
      <div><span class="mov-mini-label">Quantidade de dependentes</span><strong id="mov-profile-dependentes">0</strong></div>
    </div>
    <div class="mov-profile-actions"><a class="btn btn-sec mov-edit-profile" href="contracheque.html?retorno=movimentacao.html">Editar contracheque</a><button class="btn mov-use-profile" id="mov-utilizar-contracheque" type="button">Utilizar contracheque</button></div>
    <p class="mov-profile-feedback" id="mov-profile-feedback" role="status" aria-live="polite">Confira os dados e confirme para continuar.</p>`;
  actions?.after(panel);

  // A tela de movimentação exibe somente Situação e Natureza.
  // Os demais controles remuneratórios permanecem no DOM, ocultos, para que
  // perfil.js/app.js preservem os IDs esperados pelo motor de cálculo.
  const technical = document.createElement('div');
  technical.id = 'mov-dados-perfil-interno';
  technical.hidden = true;
  technical.setAttribute('aria-hidden', 'true');
  const children = [...form.children];
  children.forEach((node) => {
    if (node === actions || node === panel || node === items || node === destinations || node === passages || node.id === 'res' || node.classList.contains('fonte')) return;
    const isSituation = !!node.querySelector?.('#sit');
    const isNature = !!node.querySelector?.('#natureza-mov');
    const isCommissionPeriod = node.id === 'comissao-periodo';
    if (isSituation || isNature || isCommissionPeriod) return;
    if (node === hint || node.matches('label, .grp, details, p, .note, .warn') || node.tagName === 'BUTTON') technical.appendChild(node);
  });
  if (technical.children.length) panel.after(technical);
  hint?.remove();

  // A ordem visual segue a referência: opções, origem/destinos e resultado.
  if (items && destinations) destinations.before(items);
  if (destinations && passages) destinations.after(passages);

  // Botão de cálculo fica junto ao bloco de origem/destinos.
  const calculateButton = [...form.querySelectorAll('button[type="submit"]')].find((button) => button.textContent.toLowerCase().includes('calcular'));
  if (calculateButton && destinations) destinations.appendChild(calculateButton);

  const money = (value) => (Number(value) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const getProfile = () => window.MilicoAudazPerfil?.get?.() || null;
  const profileBase = (data) => {
    const core = window.MilicoAudazCore;
    if (!core?.dados?.POSTOS || !core?.comp || !data?.posto) return null;
    const posto = core.dados.POSTOS.find((item) => item.id === String(data.posto));
    if (!posto) return null;
    const inactive = ['reserva', 'reformado'].includes(String(data.situacao || ''));
    const options = {
      hab: inactive ? 0 : Number(data.hab) || 0,
      ats: inactive || data['ats-nao'] ? 0 : Number(data.ats) || 0,
      co: inactive || data['co-nao'] ? 0 : Number(data.co) || 0,
      coPosto: data['co-posto'] || posto.id,
      pm: inactive || data['pm-nao'] ? 0 : Number(data.pm) || 0,
      gle: inactive || data['gle-nao'] ? 0 : Number(data.gle) || 0,
      gr: inactive || !data.cmd ? 0 : 10
    };
    const result = core.comp(posto, options);
    return { posto: posto.nome, base: result.total, updatedAt: data.updatedAt || null };
  };
  const renderProfile = () => {
    const data = getProfile();
    const result = profileBase(data);
    const state = $('mov-profile-state');
    const posto = $('mov-profile-posto');
    const base = $('mov-profile-base');
    const dependentes = $('mov-profile-dependentes');
    const feedback = $('mov-profile-feedback');
    const button = $('mov-utilizar-contracheque');
    const panel = $('mov-profile-card');
    if (result) {
      panel?.classList.remove('is-missing');
      posto.textContent = result.posto;
      base.textContent = money(result.base);
      dependentes.textContent = String(Math.max(0, Number(data['dep-total']) || 0));
      state.textContent = 'Contracheque encontrado';
      state.classList.add('is-ready');
      button.disabled = false;
      form.querySelector('.mov-edit-profile').textContent = 'Editar contracheque';
      feedback.textContent = 'Os dados do contracheque foram carregados neste navegador. Se precisar alterar algo, edite e retorne para confirmar.';
    } else {
      panel?.classList.add('is-missing');
      posto.textContent = 'Não informado';
      base.textContent = 'Preencha o contracheque';
      dependentes.textContent = '—';
      state.textContent = 'Sem contracheque salvo';
      state.classList.remove('is-ready');
      button.disabled = true;
      form.querySelector('.mov-edit-profile').textContent = 'Preencher contracheque';
      feedback.textContent = 'Preencha primeiro seu contracheque para continuar. Ao concluir, use “Voltar para movimentação” para retornar a esta calculadora.';
    }
    return result;
  };
  renderProfile();
  form.querySelector('.mov-edit-profile')?.addEventListener('click', () => sessionStorage.removeItem('milico-audaz:movimentacao:perfil-confirmado'));
  form.addEventListener('submit', (event) => {
    if (getProfile() && sessionStorage.getItem('milico-audaz:movimentacao:perfil-confirmado') !== '1') {
      event.preventDefault();
      event.stopImmediatePropagation();
      $('mov-profile-feedback').textContent = 'Clique em “Utilizar contracheque” para confirmar os dados antes de calcular.';
      $('mov-profile-feedback').classList.remove('is-confirmed');
      $('mov-profile-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, true);
  $('mov-utilizar-contracheque')?.addEventListener('click', () => {
    const result = renderProfile();
    if (!result) return;
    sessionStorage.setItem('milico-audaz:movimentacao:perfil-confirmado', '1');
    $('mov-profile-feedback').textContent = 'Contracheque confirmado. Você já pode informar a origem e os destinos.';
    $('mov-profile-feedback').classList.add('is-confirmed');
    destinations?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // A tela de movimentação acompanha alterações feitas no contracheque ao retornar.
  window.addEventListener('pageshow', renderProfile);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderProfile(); });

  // Exibe só o essencial dos itens na primeira tela; os formulários específicos abrem sob demanda.
  const itemLabels = form.querySelectorAll('.mov-item-option');
  itemLabels.forEach((label) => label.classList.add('mov-item-compact'));
  const status = $('mov-itens-status');
  if (status) status.textContent = 'Marque somente o que faz parte da sua movimentação. Os campos adicionais aparecem quando necessários.';

  // Dependentes ficam em um controle compacto, sem duplicar quantidades do contracheque.
  const dep = $('dep');
  if (dep) {
    const label = dep.closest('label');
    if (label) label.classList.add('mov-dependent-compact');
  }
})();
