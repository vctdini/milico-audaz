/**
 * Milico Audaz — perfil compartilhado
 * Armazena localmente os dados de remuneração informados no contracheque.
 * Não transmite dados para servidores. Para sincronização entre dispositivos,
 * será necessária uma funcionalidade autenticada e consentida.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'milico-audaz:perfil:v1';
  const SOURCE_FORM = '[data-fn="contracheque"]';
  const PROFILE_FIELDS = [
    'situacao', 'posto', 'mes-ref', 'hab', 'ats', 'acdm-percentual', 'co', 'co-posto', 'pm', 'gle', 'cmd',
    'pensao-auto', 'pensao-15', 'fusex-quota', 'fusex-nao', 'ferias-valor', 'ferias-ativo', 'natalino-valor', 'natalino-ativo', 'natalino-parcela', 'natalino-meses', 'natalino-base', 'natalino-adiantamento', 'ats-nao', 'co-nao', 'pm-nao', 'gle-nao',
    'dep-total', 'dep-fusex', 'dep-ir', 'dep-salario-familia', 'dep-pre-escolar'
  ];

  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!value || value.version !== 1 || !value.data || typeof value.data !== 'object') return null;
      const data = { ...value.data };
      if (data.posto === 'cabo_e' || data.posto === 'cabo_n') data.posto = 'cabo';
      if (data.qe && data.posto === 'sgt2') data.posto = 'sgt2_qe';
      if (data.qe && data.posto === 'sgt3') data.posto = 'sgt3_qe';
      if (data.situacao === 'ativa-carreira' || data.situacao === 'ativa-temporario') data.situacao = 'ativa';
      delete data.qe;
      delete data.smi;
      return data;
    } catch (error) {
      console.warn('[Milico Audaz] Não foi possível ler o perfil local.', error);
      return null;
    }
  };

  const write = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), data }));
      return true;
    } catch (error) {
      console.warn('[Milico Audaz] Não foi possível salvar o perfil local.', error);
      return false;
    }
  };

  const collect = (form) => {
    const data = PROFILE_FIELDS.reduce((result, id) => {
      const field = form.elements.namedItem(id);
      if (field) result[id] = field.type === 'checkbox' ? field.checked : field.value;
      return result;
    }, {});
    ['receitas-extras', 'descontos-extras'].forEach((id) => {
      const box = document.getElementById(id);
      data[id] = box ? [...box.querySelectorAll('.calc-row')].map((row) => ({
        nome: row.querySelector('[data-row-name]')?.value || '',
        valor: row.querySelector('[data-row-value]')?.value || '0',
        irTributavel: !!row.querySelector('[data-row-ir]')?.checked,
        baseContribuicao: !!row.querySelector('[data-row-base]')?.checked,
        margemPermanente: !!row.querySelector('[data-row-margin]')?.checked,
        irDedutivel: !!row.querySelector('[data-row-ir-deduction]')?.checked
      })) : [];
    });
    const core = window.MilicoAudazCore;
    const posto = core?.dados?.POSTOS?.find((item) => item.id === data.posto);
    if (posto && typeof core.comp === 'function') {
      const percent = (id) => Number(String(data[id] ?? '0').replace(',', '.')) || 0;
      // O contracheque não possui seletor para o maior percentual histórico de ACDM.
      // Ausência do campo deve usar o percentual automático do posto; somente uma
      // seleção explícita em outra ferramenta pode substituir esse valor.
      const disp = !('acdm-percentual' in data) || data['acdm-percentual'] === 'auto'
        ? null : percent('acdm-percentual');
      const remuneracao = core.comp(posto, {
        hab: percent('hab'), ats: percent('ats'), dispPercent: disp,
        co: percent('co'), coPosto: data['co-posto'] || data.posto,
        pm: percent('pm'), gle: percent('gle'), gr: 0
      });
      const money = (value) => Math.round((Number(value) || 0) * 100) / 100;
      data['compensacao-rubricas'] = [
        { nome: 'Soldo', valor: money(remuneracao.s) },
        { nome: 'Adicional militar', valor: money(remuneracao.am) },
        { nome: 'Adicional de habilitação', valor: money(remuneracao.hab) },
        { nome: remuneracao.atsMaior ? 'Adicional de tempo de serviço' : 'Adicional de disponibilidade', valor: money(remuneracao.dd) },
        ...(remuneracao.co > 0 ? [{ nome: 'Compensação orgânica', valor: money(remuneracao.co) }] : []),
        ...(remuneracao.pm > 0 ? [{ nome: 'Adicional de permanência', valor: money(remuneracao.pm) }] : []),
        ...(remuneracao.gle > 0 ? [{ nome: 'Gratificação de localidade especial', valor: money(remuneracao.gle) }] : [])
      ];
    }
    return data;
  };

  const apply = (data, form) => {
    if (!data || !form) return;
    PROFILE_FIELDS.forEach((id) => {
      const field = form.elements.namedItem(id);
      if (!field || !(id in data)) return;
      if (field.type === 'checkbox') field.checked = Boolean(data[id]);
      else if ([...field.options || []].some((option) => option.value === String(data[id])) || field.tagName !== 'SELECT') {
        field.value = data[id];
      }
    });
    if (form.matches(SOURCE_FORM) && (!data.posto || !data.situacao)) {
      ['ferias','natalino'].forEach((name) => {
        const active = form.querySelector(`#${name}-ativo`);
        const panel = form.querySelector(`#cc-evento-${name}`);
        if (active) active.checked = false;
        if (panel) panel.hidden = true;
      });
    }
    [['ats-nao','ats'],['co-nao','co'],['pm-nao','pm'],['gle-nao','gle']].forEach(([checkId, fieldId]) => {
      const check = document.getElementById(checkId), field = document.getElementById(fieldId);
      if (check && field && data[fieldId] != null) check.checked = !(Number(String(data[fieldId]).replace(',','.')) > 0);
    });
    ['receitas-extras', 'descontos-extras'].forEach((id) => {
      const box = document.getElementById(id);
      if (!box) return;
      let items = Array.isArray(data[id]) ? data[id] : [];
      // Migra valores avulsos salvos pela versão anterior para as novas linhas dinâmicas.
      if (id === 'receitas-extras' && !Array.isArray(data[id]) && Number(data.outros) > 0) {
        items = [{ nome: 'Outros créditos (versão anterior)', valor: data.outros }];
      }
      if (id === 'descontos-extras' && !Array.isArray(data[id])) {
        if (Number(data.cons) > 0) items.push({ nome: 'Consignações (versão anterior)', valor: data.cons });
        if (Number(data['pensao-manual']) > 0) {
          items.push({ nome: 'Pensão militar informada na versão anterior', valor: data['pensao-manual'] });
          const automatic = document.getElementById('pensao-auto'); if (automatic) automatic.checked = false;
        }
      }
      items.forEach((item) => {
        const row = document.createElement('div'); row.className = 'calc-row';
        row.innerHTML = '<div class="calc-row-summary"><div><strong data-row-summary-name></strong><small data-row-summary-value></small></div><div class="cc-row-actions"><button type="button" class="cc-icon-action" data-edit-row aria-label="Editar lançamento" title="Editar">✎</button><button type="button" class="remove-row" aria-label="Remover item">×</button></div></div><div class="calc-row-editor"><label>Descrição<input type="text" data-row-name maxlength="60"></label><label>Valor (R$)<input type="number" min="0" step="0.01" data-row-value></label>' + (id === 'receitas-extras' ? '<label class="chk"><input type="checkbox" data-row-ir> Tributável no IR mensal</label><label class="chk"><input type="checkbox" data-row-base> Incide na base PM/FuSEx</label><label class="chk"><input type="checkbox" data-row-margin> Integra rendimentos permanentes da margem consignável</label>' : '<label class="chk"><input type="checkbox" data-row-ir-deduction> Dedutível no IR (somente pensão alimentícia judicial)</label>') + '<button type="button" class="btn btn-secundario cc-row-done" data-row-done>Concluir edição</button></div>';
        row.querySelector('[data-row-name]').value = item.nome || '';
        row.querySelector('[data-row-value]').value = item.valor || '0';
        if (row.querySelector('[data-row-ir]')) row.querySelector('[data-row-ir]').checked = !!item.irTributavel;
        if (row.querySelector('[data-row-base]')) row.querySelector('[data-row-base]').checked = !!item.baseContribuicao;
        if (row.querySelector('[data-row-margin]')) row.querySelector('[data-row-margin]').checked = !!item.margemPermanente;
        if (row.querySelector('[data-row-ir-deduction]')) row.querySelector('[data-row-ir-deduction]').checked = !!item.irDedutivel;
        row.querySelector('[data-row-summary-name]').textContent = item.nome || 'Lançamento';
        row.querySelector('[data-row-summary-value]').textContent = (Number(String(item.valor || 0).replace(',','.')) || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
        box.appendChild(row);
      });
    });
  };

  const createNotice = (data) => {
    const form = document.querySelector('form.calc');
    if (!form || document.querySelector('[data-profile-notice]')) return;
    const notice = document.createElement('section');
    notice.className = 'profile-notice';
    notice.dataset.profileNotice = '';
    notice.setAttribute('aria-label', 'Perfil compartilhado');
    const fn = form.dataset.fn || (form.id === 'taf' ? 'taf' : '');
    const independente = ['alimentacao','imc','juros','taf'].includes(fn);
    const returnPages = {
      'ajuda-custo-cursos.html': 'ajuda de custo para cursos',
      'auxilio-transporte.html': 'auxílio-transporte',
      'diarias.html': 'diárias',
      'gratificacao-representacao.html': 'gratificação de representação',
      'movimentacao.html': 'movimentação',
      'pensao-alimenticia.html': 'pensão alimentícia',
      'compensacao-pecuniaria.html': 'compensação pecuniária'
    };
    const currentPage = window.location.pathname.split('/').pop();
    const currentReturn = Object.prototype.hasOwnProperty.call(returnPages, currentPage) ? currentPage : '';
    const requestedReturn = new URLSearchParams(window.location.search).get('retorno') || '';
    const safeReturn = Object.prototype.hasOwnProperty.call(returnPages, requestedReturn) ? requestedReturn : '';
    const status = data ? 'Perfil carregado.' : (independente
      ? 'Ferramenta independente: preencha os próprios campos; não depende do contracheque.'
      : 'Sem perfil salvo. Você pode preencher esta ferramenta do zero ou abrir o contracheque para importar os campos compatíveis.');
    const formIsSource = form.matches(SOURCE_FORM);
    const returnLabel = returnPages[safeReturn] || '';
    notice.innerHTML = `
      <div><strong>Perfil remuneratório neste dispositivo</strong>
      <p>Os dados do contracheque preenchem automaticamente os campos compatíveis das demais calculadoras.</p>
      <small>${status} Os dados ficam somente neste navegador.</small></div>
      ${formIsSource && safeReturn ? `<a class="btn btn-sec profile-return" href="${safeReturn}" ${data?.posto && data?.situacao ? '' : 'hidden'}>Voltar para ${returnLabel}</a>` : ''}
      ${!formIsSource && !independente && currentReturn ? `<a class="btn btn-sec" href="contracheque.html?retorno=${encodeURIComponent(currentReturn)}">Preencher ou editar contracheque</a>` : ''}
      <button type="button" class="profile-clear">${formIsSource ? 'Limpar dados' : 'Limpar perfil'}</button>`;
    const returnLink = notice.querySelector('.profile-return');
    returnLink?.addEventListener('click', (event) => {
      try {
        const previousPage = new URL(document.referrer);
        if (previousPage.origin === window.location.origin && previousPage.pathname.endsWith(`/${safeReturn}`) && window.history.length > 1) {
          event.preventDefault();
          window.history.back();
        }
      } catch (_) { /* Mantém o link local de retorno como fallback. */ }
    });
    form.parentNode.insertBefore(notice, form);
    notice.querySelector('.profile-clear').addEventListener('click', () => {
      const confirmed = window.confirm(formIsSource
        ? 'Deseja apagar os dados salvos e limpar toda a simulação de contracheque neste dispositivo?'
        : 'Deseja apagar os dados remuneratórios salvos neste dispositivo?');
      if (!confirmed) return;
      let storageCleared = true;
      try { localStorage.removeItem(STORAGE_KEY); } catch (error) { storageCleared = false; console.warn(error); }
      if (formIsSource) {
        form.reset();
        form.querySelectorAll('#receitas-extras .calc-row, #descontos-extras .calc-row').forEach(row => row.remove());
        form.querySelectorAll('.cc-param-card').forEach(card => card.remove());
        form.querySelectorAll('details').forEach(details => { details.open = false; });
        ['ferias','natalino'].forEach(name => {
          const panel = document.getElementById(`cc-evento-${name}`);
          if (panel) { panel.hidden = true; panel.classList.remove('is-editing'); }
          const active = document.getElementById(`${name}-ativo`);
          if (active) active.checked = false;
        });
        ['natalino-base','natalino-adiantamento','natalino-parcela'].forEach(id => {
          const field = document.getElementById(id);
          if (field) { delete field.dataset.userEdited; delete field.dataset.userSelected; }
        });
        const dependentesToggle = document.getElementById('dependentes-toggle');
        const dependentesCampos = document.getElementById('dependentes-campos');
        if (dependentesToggle) dependentesToggle.setAttribute('aria-expanded','false');
        if (dependentesCampos) dependentesCampos.hidden = true;
        const situacaoAviso = document.getElementById('situacao-aviso');
        if (situacaoAviso) { situacaoAviso.hidden = true; situacaoAviso.textContent = ''; }
        const dependentesLegenda = document.getElementById('dependentes-legenda');
        if (dependentesLegenda) dependentesLegenda.textContent = 'Dependentes · Total: 0 | FuSEx: 0 | IR: 0 | Salário-família: 0 | Pré-escolar: 0';
        const receitas = document.getElementById('cc-preview-receitas');
        const descontos = document.getElementById('cc-preview-descontos');
        if (receitas) receitas.innerHTML = '<div class="cc-placeholder">Preencha os dados acima para visualizar as receitas.</div>';
        if (descontos) descontos.innerHTML = '<div class="cc-placeholder">Pensão militar, FuSEx e IR serão estimados automaticamente.</div>';
        ['receitas-extras-total','descontos-extras-total'].forEach(id => {
          const field = document.getElementById(id);
          if (field) field.textContent = 'R$ 0,00';
        });
        ['cc-live-receitas','cc-live-descontos','cc-live-liquido','cc-live-margem'].forEach(id => {
          const field = document.getElementById(id);
          if (field) field.textContent = 'R$ 0,00';
        });
        const resultado = document.getElementById('res');
        if (resultado) {
          resultado.hidden = true;
          resultado.innerHTML = '';
          resultado.classList.remove('res-ready','res-contracheque');
        }
        const returnLink = notice.querySelector('.profile-return');
        if (returnLink) returnLink.hidden = true;
        document.dispatchEvent(new CustomEvent('milico:perfil-limpo'));
        notice.querySelector('small').textContent = storageCleared
          ? 'Dados apagados. Preencha a simulação para criar um novo perfil neste dispositivo.'
          : 'A tela foi limpa, mas o navegador não permitiu apagar os dados salvos neste dispositivo.';
        form.querySelector('#situacao')?.focus();
        return;
      }
      notice.querySelector('small').textContent = storageCleared
        ? 'Perfil apagado deste dispositivo. Os campos já preenchidos nesta calculadora não foram alterados.'
        : 'O navegador não permitiu apagar o perfil salvo neste dispositivo.';
      document.dispatchEvent(new CustomEvent('milico:perfil-limpo'));
    });
  };


  // Painel de dependentes: resumo sempre visível e campos expansíveis.
  const depToggle = document.getElementById('dependentes-toggle');
  const depPanel = document.getElementById('dependentes-campos');
  const depLegend = document.getElementById('dependentes-legenda');
  const depFields = [
    ['dep-total', 'Total'],
    ['dep-fusex', 'FuSEx'],
    ['dep-ir', 'IR'],
    ['dep-salario-familia', 'Salário-família'],
    ['dep-pre-escolar', 'Pré-escolar']
  ];
  const updateDependentesResumo = () => {
    if (!depLegend) return;
    const counts = depFields.map(([id]) => {
      const field = document.getElementById(id);
      const value = field ? Math.max(0, Math.trunc(Number(field.value) || 0)) : 0;
      return value;
    });
    depLegend.textContent = `Dependentes · Total: ${counts[0]} | FuSEx: ${counts[1]} | IR: ${counts[2]} | Salário-família: ${counts[3]} | Pré-escolar: ${counts[4]}`;
  };
  if (depToggle && depPanel) {
    depToggle.addEventListener('click', () => {
      const opening = depToggle.getAttribute('aria-expanded') !== 'true';
      depToggle.setAttribute('aria-expanded', String(opening));
      depPanel.hidden = !opening;
      if (opening) {
        const firstField = depPanel.querySelector('input');
        if (firstField) firstField.focus();
      }
    });
    depFields.forEach(([id]) => {
      const field = document.getElementById(id);
      if (!field) return;
      field.addEventListener('input', updateDependentesResumo);
      field.addEventListener('change', updateDependentesResumo);
      field.addEventListener('blur', () => {
        const value = Math.max(0, Math.trunc(Number(field.value) || 0));
        field.value = String(value);
        updateDependentesResumo();
      });
    });
    updateDependentesResumo();
  }


  const situacaoSelect = document.getElementById('situacao');
  const situacaoAviso = document.getElementById('situacao-aviso');
  const atualizarAvisoSituacao = () => {
    if (!situacaoSelect || !situacaoAviso) return;
    const inativo = ['reserva', 'reformado'].includes(situacaoSelect.value);
    situacaoAviso.hidden = !inativo;
    situacaoAviso.textContent = inativo
      ? 'Atenção: o motor atual de remuneração da ativa não será aplicado. A simulação de proventos da inatividade está em auditoria para evitar resultados incorretos.'
      : 'Perfil selecionado. Algumas regras específicas de temporários e alunos ainda dependem de validação normativa.';
    situacaoAviso.classList.toggle('situacao-inativo', inativo);
  };
  if (situacaoSelect) {
    situacaoSelect.addEventListener('change', atualizarAvisoSituacao);
    atualizarAvisoSituacao();
  }

  const sourceForm = document.querySelector(SOURCE_FORM);
  const existing = read();

  if (sourceForm) {
    apply(existing, sourceForm);
    updateDependentesResumo();
    const save = () => {
      const data = collect(sourceForm);
      if (!data.posto || !data.situacao) {
        try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
        const status = document.querySelector('[data-profile-notice] small');
        if (status) status.textContent = 'Selecione situação funcional e posto ou graduação para salvar o perfil neste dispositivo.';
        const returnLink = document.querySelector('[data-profile-notice] .profile-return');
        if (returnLink) returnLink.hidden = true;
        return;
      }
      const ok = write(data);
      const status = document.querySelector('[data-profile-notice] small');
      if (status && ok) status.textContent = 'Perfil atualizado e salvo neste dispositivo.';
      const returnLink = document.querySelector('[data-profile-notice] .profile-return');
      if (returnLink) returnLink.hidden = !ok;
    };
    sourceForm.addEventListener('input', save);
    sourceForm.addEventListener('change', save);
    sourceForm.addEventListener('submit', save);
    sourceForm.addEventListener('click', (event) => { if (event.target.closest('[data-add-row], .remove-row, [data-remove-event], [data-add-event]')) setTimeout(save, 0); });
  } else if (existing) {
    // As calculadoras secundárias recebem apenas os dados compatíveis do perfil.
    // Se não existir perfil, permanecem em branco/com seus padrões originais.
    const targetForm = document.querySelector('form.calc');
    apply(existing, targetForm);
    setTimeout(() => {
    const setValue = (id, value) => {
      const field = document.getElementById(id);
      if (!field || value == null) return false;
      if (field.tagName === 'SELECT' && ![...field.options].some(option => option.value === String(value))) return false;
      field.value = String(value);
      return true;
    };
    const setChecked = (id, value) => {
      const field = document.getElementById(id);
      if (field && field.type === 'checkbox') field.checked = !!value;
    };
    const core = window.MilicoAudazCore;
    const postos = core?.dados?.POSTOS || [];
    const idPostoSalvo = String(existing.posto || '');
    const idPostoMigrado = idPostoSalvo === 'cabo_e' || idPostoSalvo === 'cabo_n' ? 'cabo' :
      (existing.qe && idPostoSalvo === 'sgt2' ? 'sgt2_qe' : existing.qe && idPostoSalvo === 'sgt3' ? 'sgt3_qe' : idPostoSalvo);
    const posto = postos.find(item => item.id === idPostoMigrado);
    const fn = targetForm?.dataset?.fn || '';
    if (posto) {
      setValue('posto', posto.id);
      const perfilInativo = ['reserva','reformado'].includes(String(existing.situacao || ''));
      // Parâmetros comuns do simulador: QE, serviço inicial, habilitação,
      // ATS reconhecido, compensação orgânica, permanência e localidade.
      if (!perfilInativo) {
        ['hab'].forEach(id => { if (id in existing) setValue(id, existing[id]); });
        // Respeita as opções “não faço jus” marcadas no contracheque: não
        // transfere percentuais residuais para uma ferramenta secundária.
        const percentuais = {
          ats: existing['ats-nao'] ? 0 : Number(existing.ats) || 0,
          co: existing['co-nao'] ? 0 : Number(existing.co) || 0,
          pm: existing['pm-nao'] ? 0 : Number(existing.pm) || 0,
          gle: existing['gle-nao'] ? 0 : Number(existing.gle) || 0
        };
        Object.entries(percentuais).forEach(([id, value]) => setValue(id, value));
        if ('hab' in existing) setValue('habsel', existing.hab);
        setValue('co-posto', existing['co-posto'] || posto.id);
      }
      document.getElementById('posto')?.dispatchEvent(new Event('change', { bubbles: true }));
      setChecked('cmd', existing.cmd);
      const depCount = Math.max(0, Number(existing['dep-total']) || 0);
      setChecked('dep', depCount > 0);

      if (fn === 'diarias') {
        const circleIndex = ['al1','al2'].includes(posto.id) ? 5 :
          ({OG:1, SUP:2, INT:3, SUB:3, SGT:4, PRA:6}[posto.circ] ?? 6);
        setValue('circ', circleIndex);
      }
      if (fn === 'pensao' && !perfilInativo) {
        const opts = {
          hab: Number(existing.hab)||0, ats: existing['ats-nao'] ? 0 : Number(existing.ats)||0,
          co: existing['co-nao'] ? 0 : Number(existing.co)||0, coPosto: existing['co-posto'] || posto.id,
          pm: existing['pm-nao'] ? 0 : Number(existing.pm)||0, gle: existing['gle-nao'] ? 0 : Number(existing.gle)||0, gr: 0
        };
        const remuneracao = core?.comp?.(posto, opts)?.total;
        if (Number.isFinite(remuneracao)) setValue('base', remuneracao.toFixed(2));
        const baseField = document.getElementById('base');
        if (baseField) baseField.dataset.importadoPerfil = 'true';
      }
    }
    const noticeText = document.querySelector('[data-profile-notice] small');
    const applicable = ['transporte','diarias','gr','ajuda','pensao'].includes(fn);
    if (noticeText && applicable && posto && ['reserva','reformado'].includes(String(existing.situacao || ''))) noticeText.textContent = `Posto/graduação importado: ${posto.nome}. Como o perfil está na ${existing.situacao === 'reserva' ? 'reserva' : 'reforma'}, adicionais da ativa não foram importados para evitar cálculo indevido.`;
    else if (noticeText && applicable && posto) noticeText.textContent = `Dados do contracheque importados: ${posto.nome}. Você pode alterar qualquer campo nesta calculadora.`;
    else if (noticeText && !applicable) noticeText.textContent = 'Esta ferramenta não utiliza dados remuneratórios do contracheque; preencha seus próprios campos.';
    }, 0);
  }

  createNotice(read());
  window.MilicoAudazPerfil = Object.freeze({
    get: () => read() || {},
    refresh: () => {
      const form = document.querySelector(SOURCE_FORM);
      if (!form) return false;
      const data = collect(form);
      return data.posto && data.situacao ? write(data) : false;
    },
    clear: () => { try { localStorage.removeItem(STORAGE_KEY); return true; } catch (_) { return false; } }
  });
})();
