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
    'situacao', 'posto', 'mes-ref', 'qe', 'smi', 'hab', 'ats', 'co', 'co-posto', 'pm', 'gle', 'cmd',
    'pensao-auto', 'pensao-15', 'fusex-quota', 'fusex-nao', 'ferias-valor', 'ferias-ativo', 'natalino-valor', 'natalino-ativo', 'natalino-parcela', 'natalino-meses', 'natalino-base', 'natalino-adiantamento', 'ats-nao', 'co-nao', 'pm-nao', 'gle-nao',
    'dep-total', 'dep-fusex', 'dep-ir', 'dep-salario-familia', 'dep-pre-escolar'
  ];

  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return value && value.version === 1 && value.data && typeof value.data === 'object'
        ? value.data
        : null;
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
    const status = data ? 'Perfil carregado.' : (independente
      ? 'Ferramenta independente: preencha os próprios campos; não depende do contracheque.'
      : 'Sem perfil salvo. Você pode preencher esta ferramenta do zero ou abrir o contracheque para importar os campos compatíveis.');
    notice.innerHTML = `
      <div><strong>Perfil remuneratório neste dispositivo</strong>
      <p>Os dados do contracheque preenchem automaticamente os campos compatíveis das demais calculadoras.</p>
      <small>${status} Os dados ficam somente neste navegador.</small></div>
      <button type="button" class="profile-clear">Limpar perfil</button>`;
    form.parentNode.insertBefore(notice, form);
    notice.querySelector('.profile-clear').addEventListener('click', () => {
      const confirmed = window.confirm('Deseja apagar os dados remuneratórios salvos neste dispositivo?');
      if (!confirmed) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
      notice.querySelector('small').textContent = 'Perfil apagado deste dispositivo.';
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
      const ok = write(collect(sourceForm));
      const status = document.querySelector('[data-profile-notice] small');
      if (status && ok) status.textContent = 'Perfil atualizado e salvo neste dispositivo.';
    };
    sourceForm.addEventListener('input', save);
    sourceForm.addEventListener('change', save);
    sourceForm.addEventListener('submit', save);
    sourceForm.addEventListener('click', (event) => { if (event.target.closest('[data-add-row], .remove-row, [data-remove-event], [data-add-event]')) setTimeout(save, 0); });
    // Cria o perfil inicial mesmo se o usuário apenas abrir o simulador e depois navegar.
    save();
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
    const posto = postos.find(item => item.id === String(existing.posto || ''));
    const fn = targetForm?.dataset?.fn || '';
    if (posto) {
      setValue('posto', posto.id);
      const perfilInativo = ['reserva','reformado'].includes(String(existing.situacao || ''));
      // Parâmetros comuns do simulador: QE, serviço inicial, habilitação,
      // ATS reconhecido, compensação orgânica, permanência e localidade.
      if (!perfilInativo) {
        ['qe','smi','hab'].forEach(id => { if (id in existing) setValue(id, existing[id]); });
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
        setChecked('qe', existing.qe);
        setChecked('smi', existing.smi);
      }
      setChecked('cmd', existing.cmd);
      const depCount = Math.max(0, Number(existing['dep-total']) || 0);
      setChecked('dep', depCount > 0);

      if (fn === 'transporte') {
        // O posto importado já fornece o soldo da tabela; mantemos o campo
        // de soldo personalizado vazio para não congelar o soldo se o usuário
        // mudar o posto nesta calculadora.
        const soldoField = document.getElementById('soldoc');
        if (soldoField) soldoField.value = '';
      }
      if (fn === 'diarias') {
        const circleIndex = ['al1','al2'].includes(posto.id) ? 5 :
          ({OG:1, SUP:2, INT:3, SUB:3, SGT:4, PRA:6}[posto.circ] ?? 6);
        setValue('circ', circleIndex);
      }
      if (fn === 'pensao' && !perfilInativo) {
        const opts = {
          qe: !!existing.qe, smi: !!existing.smi,
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
    clear: () => { try { localStorage.removeItem(STORAGE_KEY); return true; } catch (_) { return false; } }
  });
})();
