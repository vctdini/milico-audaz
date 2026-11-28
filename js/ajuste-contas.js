(() => {
  'use strict';
  const form = document.getElementById('ajusteForm');
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const number = (id) => Math.max(0, Number($(id)?.value) || 0);
  const stateKey = 'milico-audaz:ajuste-contas:sessao:v1';
  const motives = {reserva:'Passagem para a reserva remunerada',termino:'Licenciamento ex officio por término de prorrogação',pedido:'Licenciamento a pedido',conveniencia:'Licenciamento por conveniência do serviço',demissao:'Demissão',desincorporacao:'Desincorporação',outro:'Outro motivo'};
  const defaultNote = 'Informe somente parcelas compatíveis com o motivo selecionado e confirmadas nos seus assentamentos.';
  let remuneration = 0;
  let hasProfile = false;
  function loadProfile() {
    const profile = window.MilicoAudazPerfil?.get?.() || {};
    const rubricas = Array.isArray(profile['compensacao-rubricas']) ? profile['compensacao-rubricas'] : [];
    remuneration = rubricas.reduce((sum, item) => sum + (Number(item?.valor) || 0), 0);
    const inactiveProfile = ['reserva','reformado'].includes(String(profile.situacao || ''));
    hasProfile = remuneration > 0 && Boolean(profile.posto && profile.situacao) && !inactiveProfile;
    $('ajPosto').textContent = hasProfile ? profile.posto : inactiveProfile ? 'Perfil na inatividade' : 'Perfil não encontrado';
    $('ajBase').textContent = hasProfile ? money.format(remuneration) : inactiveProfile ? 'Confira a remuneração aplicável antes de usar esta simulação.' : 'Preencha o contracheque para importar a remuneração.';
    $('ajPerfil').classList.toggle('is-ready', hasProfile);
  }
  function updateSections() {
    const reason = $('ajMotivo').value;
    $('ajReservaCard').hidden = reason !== 'reserva';
    $('ajNatalinoCard').hidden = reason === 'reserva';
    $('ajCompCard').hidden = reason !== 'termino';
    $('ajMotivoNota').textContent = reason === 'reserva'
      ? 'Na passagem para a reserva, o adicional natalino permanece vinculado ao pagamento na inatividade; não o somei novamente neste ajuste.'
      : reason === 'termino'
        ? 'A compensação pecuniária tem hipótese legal própria e requisitos específicos. O valor deve ser informado a partir da calculadora correspondente.'
        : reason === 'desincorporacao'
          ? 'A incidência de férias e demais parcelas depende do enquadramento e dos registros do caso. Informe apenas valores reconhecidos.'
          : defaultNote;
  }
  function restore() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(stateKey) || 'null');
      if (saved?.version === 1 && saved.fields) Object.entries(saved.fields).forEach(([id, value]) => {
        const field = $(id);
        if (field && typeof value === 'string') field.value = value;
      });
    } catch (_) {}
  }
  function persist() {
    try {
      const fields = [...form.querySelectorAll('input,select')].reduce((out, field) => {
        if (field.id) out[field.id] = field.value;
        return out;
      }, {});
      sessionStorage.setItem(stateKey, JSON.stringify({version:1, fields}));
    } catch (_) {}
  }
  const line = (title, amount, type) => ({title, amount:Math.max(0,amount), type});
  function calculate(event) {
    event?.preventDefault();
    const error = $('ajErro');
    error.hidden = true;
    loadProfile();
    if (!hasProfile) {
      error.textContent = 'Preencha ou edite o contracheque antes de calcular. Depois, use o botão “Voltar para ajuste de contas”.';
      error.hidden = false;
      return;
    }
    const date = $('ajData').value ? new Date($('ajData').value + 'T12:00:00') : null;
    if (!date || Number.isNaN(date.getTime())) {
      error.textContent = 'Informe a data do desligamento.';
      error.hidden = false;
      $('ajData').focus();
      return;
    }
    const monthDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const days = $('ajDias').value === '' ? NaN : Number($('ajDias').value);
    if (!Number.isInteger(days) || days < 0 || days > monthDays) {
      error.textContent = 'Informe dias com direito à remuneração entre 0 e ' + monthDays + ', conforme conferência da unidade.';
      error.hidden = false;
      $('ajDias').focus();
      return;
    }
    const reason = $('ajMotivo').value;
    const credits = [];
    const debits = [];
    if (number('ajTercoMeses') > number('ajFeriasMeses')) {
      error.textContent = 'Os meses com adicional de 1/3 não podem superar os meses de férias informados.';
      error.hidden = false;
      $('ajTercoMeses').focus();
      return;
    }
    credits.push(line('Remuneração proporcional · ' + days + ' dia(s)', remuneration*days/30, 'credit'));
    const vacationMonths = number('ajFeriasMeses');
    const thirdMonths = number('ajTercoMeses');
    const remainingDays = Math.max(0, vacationMonths*2.5-number('ajFeriasDias'));
    const vacation = remuneration*remainingDays/30;
    const vacationThird = remuneration*thirdMonths/36;
    $('ajFeriasResumo').textContent = 'Saldo estimado: ' + remainingDays.toLocaleString('pt-BR') + ' dia(s) de férias · ' + money.format(vacation+vacationThird) + ' incluindo 1/3 informado.';
    if (vacation > 0) credits.push(line('Férias proporcionais declaradas · ' + remainingDays + ' dia(s)', vacation, 'credit'));
    if (vacationThird > 0) credits.push(line('Adicional de 1/3 sobre férias declaradas', vacationThird, 'credit'));
    if (reason !== 'reserva') {
      const months = Math.min(12, Math.trunc(number('ajNatalinoMeses')));
      const natalinoGross = remuneration*months/12;
      const advance = number('ajNatalinoAdiantado');
      const natalinoCredit = Math.max(0, natalinoGross-advance);
      const natalinoDebit = Math.max(0, advance-natalinoGross);
      $('ajNatalinoResumo').textContent = 'Proporcional bruto: ' + money.format(natalinoGross) + ' · saldo após adiantamento: ' + money.format(natalinoCredit) + (natalinoDebit ? ' · adiantamento excedente a conferir: ' + money.format(natalinoDebit) : '') + '.';
      if (natalinoCredit > 0) credits.push(line('Adicional natalino proporcional · ' + months + '/12', natalinoCredit, 'credit'));
      if (natalinoDebit > 0) debits.push(line('Adiantamento natalino acima do proporcional declarado', natalinoDebit, 'debit'));
    }
    if (reason === 'reserva') {
      const help = number('ajBaseReserva')*8;
      if (help > 0) credits.push(line('Ajuda de custo para a inatividade · 8× base informada', help, 'credit'));
      const paid = number('ajAjudaPaga');
      if (paid > 0) debits.push(line('Ajuda de custo já recebida', paid, 'debit'));
    }
    if (reason === 'termino' && number('ajCompensacao') > 0) credits.push(line('Compensação pecuniária informada pelo usuário', number('ajCompensacao'), 'credit'));
    if (number('ajCreditos') > 0) credits.push(line('Outros créditos informados pelo usuário', number('ajCreditos'), 'credit'));
    if (number('ajPago') > 0) debits.push(line('Pagamentos ou adiantamentos já recebidos', number('ajPago'), 'debit'));
    if (number('ajDescontos') > 0) debits.push(line('Descontos do mês informados pelo usuário', number('ajDescontos'), 'debit'));
    if (number('ajOutrosDescontos') > 0) debits.push(line('Outros descontos ou reposições informados', number('ajOutrosDescontos'), 'debit'));
    const totalCredits = credits.reduce((sum,item)=>sum+item.amount,0);
    const totalDebits = debits.reduce((sum,item)=>sum+item.amount,0);
    const balance = totalCredits-totalDebits;
    $('ajLinhas').replaceChildren(...[...credits,...debits].map((item)=>{
      const row=document.createElement('div');
      row.className='aj-line '+item.type;
      const label=document.createElement('span');
      const amount=document.createElement('strong');
      label.textContent=item.title;
      amount.textContent=(item.type==='debit'?'− ':'+ ')+money.format(item.amount);
      row.append(label,amount);
      return row;
    }));
    $('ajTotalCreditos').textContent=money.format(totalCredits);
    $('ajTotalDescontos').textContent=money.format(totalDebits);
    $('ajSaldo').textContent=money.format(balance);
    $('ajSaldo').classList.toggle('is-negative',balance<0);
    $('ajResultadoIntro').textContent=motives[reason]+' · data informada: '+date.toLocaleDateString('pt-BR')+'.';
    $('ajResultado').hidden=false;
    $('ajResultado').scrollIntoView({behavior:'smooth',block:'start'});
    persist();
  }
  function clear() {
    form.reset();
    $('ajData').value='';
    $('ajDias').value='';
    $('ajResultado').hidden=true;
    $('ajLinhas').replaceChildren();
    $('ajErro').hidden=true;
    $('ajFeriasResumo').textContent='Saldo de férias estimado: —';
    $('ajNatalinoResumo').textContent='Saldo estimado: —';
    try { sessionStorage.removeItem(stateKey); } catch (_) {}
    updateSections();
    $('ajMotivo').focus();
  }
  restore();
  loadProfile();
  updateSections();
  form.addEventListener('input',persist);
  form.addEventListener('change',(event)=>{if(event.target===$('ajMotivo'))updateSections();persist();});
  form.addEventListener('submit',calculate);
  $('ajLimpar').addEventListener('click',clear);
  $('ajPdf').addEventListener('click',()=>{
    if($('ajResultado').hidden){$('ajErro').textContent='Calcule o ajuste antes de imprimir ou salvar o PDF.';$('ajErro').hidden=false;return;}
    window.print();
  });
  document.addEventListener('milico:perfil-limpo',loadProfile);
})();
