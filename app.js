(()=>{
const D={"POSTOS": [{"id": "gen_ex", "nome": "General de Exército", "soldo": 14711, "circ": "OG", "disp": 41, "qe": null, "ref": "gen_ex"}, {"id": "gen_div", "nome": "General de Divisão", "soldo": 14100, "circ": "OG", "disp": 38, "qe": null, "ref": "gen_ex"}, {"id": "gen_bda", "nome": "General de Brigada", "soldo": 13639, "circ": "OG", "disp": 35, "qe": null, "ref": "gen_ex"}, {"id": "cel", "nome": "Coronel", "soldo": 12505, "circ": "SUP", "disp": 32, "qe": null, "ref": "cel"}, {"id": "tc", "nome": "Tenente-Coronel", "soldo": 12285, "circ": "SUP", "disp": 26, "qe": null, "ref": "cel"}, {"id": "maj", "nome": "Major", "soldo": 12108, "circ": "SUP", "disp": 20, "qe": null, "ref": "cel"}, {"id": "cap", "nome": "Capitão", "soldo": 9976, "circ": "INT", "disp": 12, "qe": null, "ref": "cap"}, {"id": "ten1", "nome": "1º Tenente", "soldo": 9004, "circ": "SUB", "disp": 6, "qe": null, "ref": "ten1"}, {"id": "ten2", "nome": "2º Tenente", "soldo": 8179, "circ": "SUB", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "asp", "nome": "Aspirante a Oficial", "soldo": 7988, "circ": "SUB", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "subten", "nome": "Subtenente", "soldo": 6737, "circ": "SGT", "disp": 32, "qe": null, "ref": "subten"}, {"id": "sgt1", "nome": "1º Sargento", "soldo": 5988, "circ": "SGT", "disp": 20, "qe": null, "ref": "subten"}, {"id": "sgt2", "nome": "2º Sargento", "soldo": 5209, "circ": "SGT", "disp": 12, "qe": 26, "ref": "subten"}, {"id": "sgt3", "nome": "3º Sargento", "soldo": 4177, "circ": "SGT", "disp": 6, "qe": 16, "ref": "subten"}, {"id": "cabo_e", "nome": "Cabo (engajado)", "soldo": 2869, "circ": "PRA", "disp": 6, "qe": null, "ref": "subten"}, {"id": "cabo_n", "nome": "Cabo (não engajado)", "soldo": 1177, "circ": "PRA", "disp": 6, "qe": null, "ref": "subten"}, {"id": "sd_esp", "nome": "Soldado de 1ª classe especializado e engajado / Paraquedista engajado", "soldo": 2103, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "sd_eng", "nome": "Soldado engajado (não especializado)", "soldo": 1927, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "sd_rec", "nome": "Soldado / Recruta (não engajado)", "soldo": 1177, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "cad1", "nome": "Cadete ou Aspirante (último ano)", "soldo": 1780, "circ": "PRA", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "cad", "nome": "Cadete (demais anos) ou aluno de formação de oficiais da reserva", "soldo": 1457, "circ": "PRA", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "al1", "nome": "Aluno de escola de sargentos ou EsPCEx (último ano)", "soldo": 1309, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "al2", "nome": "Aluno da EsPCEx (demais anos)", "soldo": 1294, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}], "CIRC": {"OG": 28, "SUP": 25, "INT": 22, "SUB": 19, "SGT": 16, "PRA": 13}, "DIAR": [["Comandantes de Força e Natureza Especial", 800, 700, 650], ["Oficiais-Generais", 600, 515, 455], ["Oficiais-Superiores", 510, 450, 395], ["Oficiais Intermediários, Subalternos e Aspirante a Oficial", 425, 380, 335], ["Subtenentes, Sargentos, Aspirantes e Cadetes", 425, 380, 335], ["Alunos de formação (CFOAer, NPOR, EsPCEx e similares)", 355, 315, 280], ["Demais praças e praças especiais", 355, 315, 280]], "SM": 1621.0, "ETAPA": 13.5};
const $=id=>document.getElementById(id),N=id=>{const e=$(id);return e?parseFloat(String(e.value).replace(',','.'))||0:0},C=id=>!!($(id)&&$(id).checked);
const R=v=>(Number.isFinite(Number(v))?Number(v):0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const show=(h,scroll=true)=>{const r=$('res');r.hidden=false;r.innerHTML=h;if(scroll)r.scrollIntoView({behavior:'smooth',block:'nearest'})};
const tbl=(rows,tot)=>'<table class="tbl">'+rows.filter(r=>(Number.isFinite(Number(r[1]))&&Number(r[1])!==0)||r[2]!=null).map(r=>`<tr><td>${r[0]}</td><td>${r[2]||R(r[1])}</td></tr>`).join('')+(tot?`<tr class="tot"><td>${tot[0]}</td><td>${R(tot[1])}</td></tr>`:'')+'</table>'; 
const IR2026={faixas:[[2428.80,0,0],[2826.65,.075,182.16],[3751.05,.15,394.16],[4664.68,.225,675.49],[Infinity,.275,908.73]],dependente:189.59,simplificado:607.20};
function calcularIRRF(rendimentos,op={}){const bruto=Math.max(0,Number(rendimentos)||0),dependentes=Math.max(0,Math.trunc(Number(op.dependentes)||0)),legais=Math.max(0,Number(op.pensao)||0)+Math.max(0,Number(op.fusex)||0)+Math.max(0,Number(op.quota)||0)+Math.max(0,Number(op.alimenticia)||0)+dependentes*IR2026.dependente;const simplificado=IR2026.simplificado,usarLegal=op.modo==='simplificado'?false:(op.modo==='legal'?true:legais>=simplificado),deducao=usarLegal?legais:simplificado,base=Math.max(0,bruto-deducao);let faixa=IR2026.faixas.find(f=>base<=f[0])||IR2026.faixas.at(-1);let impostoBase=Math.max(0,base*faixa[1]-faixa[2]);let reducao=bruto<=5000?Math.min(impostoBase,312.89):bruto<=7350?Math.min(impostoBase,Math.max(0,978.62-.133145*bruto)):0;return{bruto,legais,simplificado,deducao,metodo:usarLegal?'Deduções legais':'Desconto simplificado',base,aliquota:faixa[1],parcela:faixa[2],impostoBase,reducao,imposto:Math.max(0,impostoBase-reducao),aliquotaEfetiva:bruto?Math.max(0,impostoBase-reducao)/bruto*100:0};}
function calcularAdicionalFerias(remuneracao){const base=Math.max(0,Number(remuneracao)||0);return Math.round(base/3*100)/100;}
function calcularAdicionalNatalino(remuneracao,meses=12){const base=Math.max(0,Number(remuneracao)||0),m=Math.min(12,Math.max(1,Math.trunc(Number(meses)||12))),total=Math.round(base*m/12*100)/100,primeira=Math.round(base/2*100)/100,segunda=Math.round((total-primeira)*100)/100;return{base,meses:m,total,primeira,segunda};}
function calcularAssistenciaPreEscolar(quantidade,remuneracao,vb,valorTeto=526.64){const qtd=Math.max(0,Math.trunc(Number(quantidade)||0)),rem=Math.max(0,Number(remuneracao)||0),baseVB=Math.max(1,Number(vb)||1),mult=rem/baseVB,cota=mult<=5?0.05:mult<=10?0.10:mult<=15?0.15:mult<=20?0.20:0.25,participacao=Math.round(valorTeto*cota*100)/100,liquidoUnit=Math.round((valorTeto-participacao)*100)/100;return{quantidade:qtd,valorTeto,cotaPercent:cota*100,participacao,liquidoUnit,total:Math.round(liquidoUnit*qtd*100)/100,multiplosVB:mult};}
function calcularDescontosObrigatorios(base,quotaPercent=0,op={}){const b=Math.max(0,Number(base)||0),cent=v=>Math.round(v*100)/100,pensaoBase=op.pensaoAuto===false?0:cent(b*.105),pensaoHistorica=op.pensaoAuto===false||!op.optou15?0:cent(b*.015),fusex=op.fusexNao?0:cent(b*.03),quota=op.fusexNao?0:cent(b*(Math.max(0,Number(quotaPercent)||0)/100));return{base:b,pensaoBase,pensaoHistorica,pensao:pensaoBase+pensaoHistorica,fusex,quota};}
const P=id=>D.POSTOS.find(p=>p.id===$(id).value);
function comp(p,o){const s=p.soldo,d=(o.qe&&p.qe)?p.qe:p.disp,am=o.smi?0:s*D.CIRC[p.circ]/100,hab=s*o.hab/100,ats=s*o.ats/100,dp=s*d/100,dd=Math.max(ats,dp),coPosto=D.POSTOS.find(x=>x.id===o.coPosto)||p,co=coPosto.soldo*o.co/100,pm=s*o.pm/100,gle=s*o.gle/100,gr=s*o.gr/100;
 return{p,s,am,hab,ats,dp,dd,co,coPosto,pm,gle,gr,disp:d,atsMaior:ats>dp,base:s+am+hab+dd+co+pm+gle,total:s+am+hab+dd+co+pm+gle+gr}}
const prm=()=>({qe:C('qe'),smi:C('smi'),hab:N('hab'),ats:N('ats'),co:N('co'),coPosto:$('co-posto')?.value||$('posto')?.value,pm:N('pm'),gle:N('gle'),gr:0});
function perfil(){const p=P('posto'),o=prm();o.gr=0;return comp(p,o)}
const linhasRem=f=>[['Soldo',f.s],['Adicional militar',f.am],['Adicional de habilitação',f.hab],[f.atsMaior?'Adicional de tempo de serviço':'Adicional de disponibilidade',f.dd],[`Compensação orgânica (${f.co}% sobre ${f.coPosto.nome})`,f.co],['Adicional de permanência',f.pm],['Gratificação de localidade especial',f.gle],['Gratificação de representação (mensal)',f.gr]];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function normalizarLancamentos(items){return (Array.isArray(items)?items:[]).map(r=>({nome:String(r.nome||'').trim(),valor:Math.max(0,Number(String(r.valor??0).replace(',','.'))||0),irTributavel:!!r.irTributavel,baseContribuicao:!!r.baseContribuicao,irDedutivel:!!r.irDedutivel,margemPermanente:!!r.margemPermanente})).filter(r=>r.nome&&r.valor>0)}
function somarLancamentos(items){return normalizarLancamentos(items).reduce((s,r)=>s+r.valor,0)}
function calcularMargemConsignavel(op={}){const rendimentos=Math.max(0,Number(op.rendimentosPermanentes)||0),soldo=Math.max(0,Number(op.soldo)||0),obrigatorios=Math.max(0,Number(op.descontosObrigatorios)||0),autorizados=Math.max(0,Number(op.descontosAutorizados)||0),limite=rendimentos*.70,reserva=soldo*.10,disponivel=limite-reserva-obrigatorios-autorizados;return{rendimentosPermanentes:rendimentos,limite,reserva,descontosObrigatorios:obrigatorios,descontosAutorizados:autorizados,disponivel:Math.round(disponivel*100)/100};}
function calcularTotaisSimulacao(op={}){const receitasBase=Math.max(0,Number(op.remuneracao)||0)+Math.max(0,Number(op.preEscolar)||0)+Math.max(0,Number(op.ferias)||0)+Math.max(0,Number(op.natalino)||0)+somarLancamentos(op.receitasExtras||[]);const descontosBase=(Array.isArray(op.descontosAutomaticos)?op.descontosAutomaticos.reduce((s,v)=>s+Math.max(0,Number(v)||0),0):0)+Math.max(0,Number(op.adiantamentoNatal)||0)+somarLancamentos(op.descontosExtras||[]);return{totalReceitas:Math.round(receitasBase*100)/100,totalDescontos:Math.round(descontosBase*100)/100,liquido:Math.round((receitasBase-descontosBase)*100)/100};}
function readRows(id){const box=$(id);if(!box)return[];return [...box.querySelectorAll('.calc-row')].map(row=>({nome:row.querySelector('[data-row-name]')?.value.trim()||'',valor:Math.max(0,Number(String(row.querySelector('[data-row-value]')?.value||'0').replace(',','.'))||0),irTributavel:!!row.querySelector('[data-row-ir]')?.checked,baseContribuicao:!!row.querySelector('[data-row-base]')?.checked,irDedutivel:!!row.querySelector('[data-row-ir-deduction]')?.checked,margemPermanente:!!row.querySelector('[data-row-margin]')?.checked})).filter(r=>r.nome&&r.valor>0)}
function addRow(id,data={}){const box=$(id);if(!box)return;const receita=id==='receitas-extras';const row=document.createElement('div');row.className='calc-row is-editing';row.innerHTML=`<div class="calc-row-summary"><div><strong data-row-summary-name></strong><small data-row-summary-value></small></div><div class="calc-row-actions"><button type="button" class="cc-icon-action" data-edit-row aria-label="Editar lançamento" title="Editar">✎</button><button type="button" class="remove-row" aria-label="Remover lançamento" title="Remover lançamento">×</button></div></div><div class="calc-row-editor"><label>Descrição<input type="text" data-row-name maxlength="60" placeholder="Ex.: ${receita?'indenização':'empréstimo'}"></label><label>Valor (R$)<input type="number" min="0" step="0.01" inputmode="decimal" data-row-value value="0"></label>${receita?'<label class="chk"><input type="checkbox" data-row-ir> Tributável no IR mensal</label><label class="chk"><input type="checkbox" data-row-base> Incide na base PM/FuSEx</label><label class="chk"><input type="checkbox" data-row-margin> Integra rendimentos permanentes da margem consignável</label>':'<label class="chk"><input type="checkbox" data-row-ir-deduction> Dedutível no IR (somente pensão alimentícia judicial)</label>'}<button type="button" class="btn btn-secundario cc-row-done" data-row-done>Concluir edição</button></div>`;box.appendChild(row);if(data.nome)row.querySelector('[data-row-name]').value=data.nome;if(data.valor!=null&&data.valor!=='')row.querySelector('[data-row-value]').value=data.valor;if(row.querySelector('[data-row-ir]'))row.querySelector('[data-row-ir]').checked=!!data.irTributavel;if(row.querySelector('[data-row-base]'))row.querySelector('[data-row-base]').checked=!!data.baseContribuicao;if(row.querySelector('[data-row-margin]'))row.querySelector('[data-row-margin]').checked=!!data.margemPermanente;if(row.querySelector('[data-row-ir-deduction]'))row.querySelector('[data-row-ir-deduction]').checked=!!data.irDedutivel;atualizarResumoLinha(row);return row;}
function atualizarResumoLinha(row){if(!row)return;const nome=row.querySelector('[data-row-name]')?.value.trim()||'Nova rubrica';const valor=Number(String(row.querySelector('[data-row-value]')?.value||0).replace(',','.'))||0;const n=row.querySelector('[data-row-summary-name]'),v=row.querySelector('[data-row-summary-value]');if(n)n.textContent=nome;if(v)v.textContent=R(valor);}
function initOptionalFields(){[['ats-nao','ats'],['co-nao','co'],['pm-nao','pm'],['gle-nao','gle']].forEach(([checkId,fieldId])=>{const c=$(checkId),f=$(fieldId);if(!c||!f)return;const update=()=>{f.hidden=c.checked;if(c.checked)f.value='0';if(fieldId==='co'){const ref=$('co-posto');if(ref)ref.hidden=c.checked;}};c.addEventListener('change',update);update();});}
const coPostoField=$('co-posto'),postoField=$('posto'),perfilSalvo=window.MilicoAudazPerfil?.get?.()||{};let coPostoManual=!!perfilSalvo['co-posto'];
if($('pensao-auto'))$('pensao-auto').checked=true;
if($('fusex-nao'))$('fusex-nao').checked=false;
if(coPostoField&&postoField&&!coPostoManual)coPostoField.value=postoField.value;
if(coPostoField)coPostoField.addEventListener('change',()=>{coPostoManual=true;});
if(postoField&&coPostoField)postoField.addEventListener('change',()=>{if(!coPostoManual)coPostoField.value=postoField.value;atualizarDescontosPreview?.();});
function atualizarSubtotaisExtras(){[['receitas-extras','receitas-extras-total'],['descontos-extras','descontos-extras-total']].forEach(([boxId,totalId])=>{const el=$(totalId);if(el)el.textContent=R(somarLancamentos(readRows(boxId)));});}
function initExtraRows(){document.querySelectorAll('[data-add-row]').forEach(b=>b.addEventListener('click',()=>{const row=addRow(b.dataset.addRow);row?.querySelector('[data-row-name]')?.focus();atualizarSubtotaisExtras();}));document.addEventListener('click',e=>{const b=e.target.closest('.remove-row');if(b){b.closest('.calc-row')?.remove();atualizarSubtotaisExtras();atualizarDescontosPreview?.();}});document.addEventListener('input',e=>{if(e.target.matches('[data-row-name],[data-row-value],[data-row-ir],[data-row-base],[data-row-ir-deduction],[data-row-margin],[data-row-margin],[data-row-margin]')){atualizarResumoLinha(e.target.closest('.calc-row'));atualizarSubtotaisExtras();atualizarDescontosPreview?.();}});const auto=$('pensao-auto'),value=$('pensao-auto-valor');if(auto&&value)auto.addEventListener('change',()=>{value.value=auto.checked?'Calculada ao enviar':'0';});atualizarSubtotaisExtras();}
initExtraRows();

const CATALOGO_LANCAMENTOS={
 receitas:[
  {id:'ferias',nome:'Adicional de férias (1/3)',desc:'Calcula 1/3 da remuneração do mês de início das férias e estima o IR em separado.',evento:'ferias'},
  {id:'permanencia',nome:'Adicional de permanência',desc:'Selecione o percentual previsto para seu caso; cálculo automático sobre o soldo.',param:'pm'},
  {id:'ats',nome:'Adicional de tempo de serviço (ATS)',desc:'Informe o percentual de direito adquirido reconhecido; o sistema compara com a disponibilidade e aplica o maior.',param:'ats'},
  {id:'pttc',nome:'Adicional de PTTC',desc:'Lançamento identificado; informe o valor do ato de convocação.',linha:true,ir:true,base:false},
  {id:'natalino',nome:'Adicional natalino (13º)',desc:'Escolha 1ª ou 2ª parcela; a 2ª calcula IR sobre o 13º integral e abate a antecipação.',evento:'natalino'},
  {id:'alimentacao',nome:'Auxílio-alimentação',desc:'Lançamento identificado; informe o valor apurado pela calculadora própria.',linha:true,ir:false,base:false},
  {id:'fardamento',nome:'Auxílio-fardamento',desc:'Informe o valor quando devido; incidências não presumidas.',linha:true,ir:false,base:false},
  {id:'natalidade',nome:'Auxílio-natalidade',desc:'Informe o valor quando devido; incidências não presumidas.',linha:true,ir:false,base:false},
  {id:'pre-escolar',nome:'Auxílio pré-escolar',desc:'Calculado pela quantidade de dependentes e remuneração de referência.',campo:'dep-pre-escolar'},
  {id:'transporte',nome:'Auxílio-transporte',desc:'Informe o valor apurado pela calculadora de transporte.',linha:true,ir:false,base:false},
  {id:'organica',nome:'Compensação orgânica',desc:'Selecione percentual de 1% a 20% e o posto/graduação de referência.',param:'co'},
  {id:'localidade',nome:'Gratificação de localidade especial',desc:'Selecione a categoria aplicável; cálculo automático sobre o soldo.',param:'gle'},
  {id:'representacao',nome:'Gratificação de representação (2%)',desc:'Lançamento eventual; informe o valor da calculadora individual.',linha:true,ir:true,base:false},
  {id:'representacao-comando',nome:'Gratificação de representação de comando',desc:'Lançamento eventual; informe o valor conforme o ato.',linha:true,ir:true,base:false},
  {id:'outra-receita',nome:'Outra receita',desc:'Lançamento genérico com nome, valor e incidências.',linha:true}
 ],
 descontos:[
  {id:'despesa-medica',nome:'Despesa médica / indenização FuSEx',desc:'Informe o valor efetivamente descontado.',linha:true},
  {id:'alimenticia',nome:'Pensão judicial / alimentícia',desc:'Informe o valor; marque a dedução no IR somente se houver decisão ou acordo judicial válido.',linha:true,irDedutivel:true},
  {id:'pensao-15',nome:'Pensão militar adicional de 1,5%',desc:'Selecione somente se houver opção histórica formalizada até 31/08/2001 e registrada nos assentamentos.',param:'pensao-15'},
  {id:'fusex-quota',nome:'Quota complementar FuSEx',desc:'Selecione 0,4% ou 0,5% conforme o tipo e a quantidade de dependentes enquadrados na norma.',param:'fusex-quota'},
  {id:'pnr',nome:'Taxa de PNR',desc:'Informe o valor efetivamente descontado.',linha:true},
  {id:'outro-desconto',nome:'Outro desconto',desc:'Lançamento genérico com nome e valor.',linha:true}
 ]
};
const catalogEl=$('cc-catalog'),catalogItems=$('cc-catalog-items'),catalogSearch=$('cc-catalog-search');
let catalogTipo='receitas';
function abrirCampoCatalogo(item){
 const el=$(item.campo);if(!el)return false;
 const details=el.closest('details');if(details)details.open=true;
 const depWrap=el.closest('#dependentes-campos');
 if(depWrap&&depWrap.hidden){const toggle=$('dependentes-toggle');toggle?.click();}
 if(item.check){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}
 el.scrollIntoView({behavior:'smooth',block:'center'});
 el.focus({preventScroll:true});
 const status=$('cc-catalog-status');if(status)status.textContent=`${item.nome} selecionado. Preencha ou confira o campo destacado.`;
 return true;
}
const POSTO_OPTIONS=D.POSTOS.map(p=>`<option value="${p.id}">${esc(p.nome)}</option>`).join('');
const PARAM_CONFIG={
 ats:{box:'cc-receita-parametros',title:'Adicional de tempo de serviço',html:()=>`<label>Percentual de ATS reconhecido (%)<input type="number" min="0" max="100" step="0.01" data-param-value="ats" value="${Number($('ats')?.value||0)}"></label><small>Informe somente o percentual reconhecido e registrado. O cálculo compara ATS e disponibilidade, sem somar os dois.</small>`},
 co:{box:'cc-receita-parametros',title:'Compensação orgânica',html:()=>`<label>Percentual<select data-param-value="co">${Array.from({length:20},(_,i)=>i+1).map(v=>`<option value="${v}" ${Number($('co')?.value||0)===v?'selected':''}>${v}%</option>`).join('')}</select></label><label>Posto/graduação de referência<select data-param-value="co-posto">${POSTO_OPTIONS}</select></label><small>O percentual incide sobre o soldo do posto/graduação selecionado, que pode ser diferente do posto atual.</small>`},
 pm:{box:'cc-receita-parametros',title:'Adicional de permanência',html:()=>`<label>Percentual<select data-param-value="pm">${[5,10,15,20].map(v=>`<option value="${v}" ${Number($('pm')?.value||0)===v?'selected':''}>${v}%</option>`).join('')}</select></label><small>Selecione somente o percentual a que efetivamente faz jus.</small>`},
 gle:{box:'cc-receita-parametros',title:'Gratificação de localidade especial',html:()=>`<label>Categoria<select data-param-value="gle">${[[10,'Categoria B — 10%'],[20,'Categoria A — 20%']].map(([v,t])=>`<option value="${v}" ${Number($('gle')?.value||0)===v?'selected':''}>${t}</option>`).join('')}</select></label><small>Selecione a categoria reconhecida para a localidade de serviço.</small>`},
 'fusex-quota':{box:'cc-desconto-parametros',title:'Quota complementar FuSEx',html:()=>`<label>Enquadramento da quota complementar<select data-param-value="fusex-quota"><option value="0">Não se aplica</option><option value="0.4" ${$('fusex-quota')?.value==='0.4'?'selected':''}>0,4% — um dependente direto, além do cônjuge</option><option value="0.5" ${$('fusex-quota')?.value==='0.5'?'selected':''}>0,5% — mais de um dependente direto (exceto cônjuge) ou um ou mais dependentes indiretos</option></select></label><small>A contribuição básica de 3% permanece separada. Confira o enquadramento na norma do FuSEx.</small>`},
 'pensao-15':{box:'cc-desconto-parametros',title:'Contribuição histórica adicional de 1,5%',html:()=>`<label class="chk"><input type="checkbox" data-param-value="pensao-15" ${$('pensao-15')?.checked?'checked':''}> Confirmo que existe opção histórica formalizada e registrada</label><small>Não é adesão atual. Só marque se a opção histórica foi feita no prazo legal e consta dos assentamentos.</small>`}
};
function mostrarParametro(key){
 const cfg=PARAM_CONFIG[key];if(!cfg)return false;const box=$(cfg.box);if(!box)return false;
 let card=box.querySelector(`[data-param-card="${key}"]`);
 if(!card){card=document.createElement('section');card.className='cc-param-card is-editing';card.dataset.paramCard=key;card.innerHTML=`<div class="cc-param-summary"><div><strong>${cfg.title}</strong><small data-param-summary></small></div><div class="cc-row-actions"><button type="button" class="cc-icon-action" data-edit-param="${key}" aria-label="Editar ${cfg.title}" title="Editar">✎</button><button type="button" class="remove-row" data-remove-param="${key}" aria-label="Remover configuração ${cfg.title}">×</button></div></div><div class="cc-param-editor"><div class="cc-param-fields">${cfg.html()}</div><button type="button" class="btn btn-secundario cc-row-done" data-param-done="${key}">Concluir edição</button></div>`;box.appendChild(card);
  card.querySelectorAll('[data-param-value]').forEach(field=>{const target=$(field.dataset.paramValue);if(!target)return;if(field.type==='checkbox')field.checked=target.checked;else if(field.tagName==='SELECT'){field.value=target.value||field.options[0]?.value||'';if(!field.value&&field.options.length)field.value=field.options[0].value;if(field.dataset.paramValue==='co-posto'&&!target.value)field.value=$('posto')?.value||field.options[0]?.value||'';target.value=field.value;}else field.value=target.value||'0';});
 }
 card.classList.add('is-editing');atualizarResumoParametro(key,card);card.scrollIntoView({behavior:'smooth',block:'center'});card.querySelector('input,select')?.focus({preventScroll:true});return true;
}
function atualizarResumoParametro(key,card){card=card||document.querySelector(`[data-param-card="${key}"]`);if(!card)return;const val=$(key);let text='';if(key==='fusex-quota')text=val?.value==='0.4'?'0,4% — dependente direto':val?.value==='0.5'?'0,5% — enquadramento ampliado':'Não se aplica';else if(key==='pensao-15')text=val?.checked?'Opção histórica confirmada':'Não selecionada';else if(key==='co')text=`${N('co')}% sobre ${P('co-posto')?.nome||P('posto')?.nome||'posto de referência'}`;else if(key==='gle')text=`Categoria ${N('gle')===20?'A — 20%':'B — 10%'}`;else if(key==='pm')text=`${N('pm')}% do soldo`;else if(key==='ats')text=`${N('ats')}% reconhecido`;const el=card.querySelector('[data-param-summary]');if(el)el.textContent=text;}
function removerParametro(key){const cfg=PARAM_CONFIG[key];if(!cfg)return;const box=$(cfg.box);box?.querySelector(`[data-param-card="${key}"]`)?.remove();const target=$(key);if(target){if(target.type==='checkbox')target.checked=false;else target.value='0';target.dispatchEvent(new Event('change',{bubbles:true}));}atualizarDescontosPreview();}
function restaurarParametrosSalvos(){Object.keys(PARAM_CONFIG).forEach(key=>{const el=$(key);if(!el)return;const active=el.type==='checkbox'?el.checked:Number(String(el.value||0).replace(',','.'))>0;if(active)mostrarParametro(key);});}
function renderCatalogo(){
 if(!catalogItems)return;
 const q=(catalogSearch?.value||'').trim().toLocaleLowerCase('pt-BR');
 const itens=(CATALOGO_LANCAMENTOS[catalogTipo]||[]).filter(x=>(x.nome+' '+x.desc).toLocaleLowerCase('pt-BR').includes(q));
 catalogItems.innerHTML=itens.map(x=>`<button type="button" class="cc-catalog-item" data-catalog-item="${esc(x.id)}"><strong>${esc(x.nome)}</strong><span>${esc(x.desc)}</span><small>${x.evento?'Ativar cálculo automático':x.linha?'Adicionar lançamento identificado':x.param?'Configurar rubrica na simulação':'Abrir parâmetro correspondente'}</small></button>`).join('')||'<p class="cc-catalog-empty">Nenhuma rubrica encontrada.</p>';
}
function abrirCatalogo(tipo){
 catalogTipo=tipo==='descontos'?'descontos':'receitas';
 const title=$('cc-catalog-title');if(title)title.textContent=catalogTipo==='receitas'?'Adicionar receita':'Adicionar desconto';
 if(catalogSearch){catalogSearch.value='';catalogSearch.placeholder=`Pesquisar ${catalogTipo==='receitas'?'receita':'desconto'}...`;}
 const status=$('cc-catalog-status');if(status)status.textContent='Selecione uma rubrica para adicioná-la ao demonstrativo.';
 renderCatalogo();if(catalogEl){catalogEl.hidden=false;catalogEl.setAttribute('aria-hidden','false');}catalogSearch?.focus();
}
function fecharCatalogo(){if(catalogEl){catalogEl.hidden=true;catalogEl.setAttribute('aria-hidden','true');}}
// Delegação no documento: continua funcionando mesmo se os botões ou cartões forem recriados.
document.addEventListener('click',e=>{
 const open=e.target.closest('[data-open-catalog]');
 if(open){e.preventDefault();abrirCatalogo(open.dataset.openCatalog);return;}
 const close=e.target.closest('.cc-catalog-close');
 if(close){e.preventDefault();fecharCatalogo();return;}
 if(e.target===catalogEl){fecharCatalogo();return;}
 const card=e.target.closest('[data-catalog-item]');
 if(!card||!catalogItems?.contains(card))return;
 e.preventDefault();
 const item=(CATALOGO_LANCAMENTOS[catalogTipo]||[]).find(x=>x.id===card.dataset.catalogItem);if(!item)return;
 fecharCatalogo();
 if(item.evento){
  const panel=$(item.evento==='ferias'?'cc-evento-ferias':'cc-evento-natalino');if(panel){panel.hidden=false;panel.classList.add('is-editing');panel.scrollIntoView({behavior:'smooth',block:'center'});}
  const active=$(item.evento==='ferias'?'ferias-ativo':'natalino-ativo');if(active){active.checked=true;active.dispatchEvent(new Event('change',{bubbles:true}));}
  if(item.evento==='natalino'&&$('natalino-parcela')&&!$('natalino-parcela').dataset.userSelected){const mes=($('mes-ref')?.value||'').slice(5,7);$('natalino-parcela').value=(mes==='11'||mes==='12')?'2':'1';}
  atualizarDescontosPreview();return;
 }
 if(item.param){mostrarParametro(item.param);atualizarDescontosPreview();return;}
 if(item.linha){
  const boxId=catalogTipo==='receitas'?'receitas-extras':'descontos-extras';
  const row=addRow(boxId,{nome:item.nome,valor:'',irTributavel:!!item.ir,baseContribuicao:!!item.base,irDedutivel:!!item.irDedutivel});
  atualizarSubtotaisExtras();atualizarDescontosPreview();
  const campo=row?.querySelector('[data-row-value]');campo?.focus();row?.scrollIntoView({behavior:'smooth',block:'center'});
 }else{
  const ok=abrirCampoCatalogo(item);
  if(!ok){const boxId=catalogTipo==='receitas'?'receitas-extras':'descontos-extras';const row=addRow(boxId,{nome:item.nome,valor:'',irTributavel:false,baseContribuicao:false,irDedutivel:!!item.irDedutivel});row?.querySelector('[data-row-value]')?.focus();}
  atualizarDescontosPreview();
 }
});
document.addEventListener('click',e=>{const editRow=e.target.closest('[data-edit-row]');if(editRow){const row=editRow.closest('.calc-row');row?.classList.add('is-editing');row?.querySelector('[data-row-name]')?.focus();return;}const doneRow=e.target.closest('[data-row-done]');if(doneRow){const row=doneRow.closest('.calc-row');atualizarResumoLinha(row);row?.classList.remove('is-editing');atualizarSubtotaisExtras();atualizarDescontosPreview();return;}const editParam=e.target.closest('[data-edit-param]');if(editParam){const card=editParam.closest('.cc-param-card');card?.classList.add('is-editing');card?.querySelector('input,select')?.focus();return;}const doneParam=e.target.closest('[data-param-done]');if(doneParam){const key=doneParam.dataset.paramDone,card=doneParam.closest('.cc-param-card');atualizarResumoParametro(key,card);card?.classList.remove('is-editing');atualizarDescontosPreview();return;}});
document.addEventListener('click',e=>{const editEvent=e.target.closest('[data-edit-event]');if(editEvent){editEvent.closest('.cc-event-control')?.classList.add('is-editing');return;}const doneEvent=e.target.closest('[data-event-done]');if(doneEvent){doneEvent.closest('.cc-event-control')?.classList.remove('is-editing');atualizarDescontosPreview();return;}});
document.addEventListener('click',e=>{const p=e.target.closest('[data-remove-param]');if(p){removerParametro(p.dataset.removeParam);return;}const b=e.target.closest('[data-remove-event]');if(!b)return;const id=b.dataset.removeEvent;const panel=$(id==='ferias'?'cc-evento-ferias':'cc-evento-natalino');if(panel)panel.hidden=true;const active=$(id==='ferias'?'ferias-ativo':'natalino-ativo');if(active){active.checked=false;active.dispatchEvent(new Event('change',{bubbles:true}));}atualizarDescontosPreview();});
catalogSearch?.addEventListener('input',renderCatalogo);
document.addEventListener('input',e=>{const field=e.target.closest('[data-param-value]');if(!field)return;const target=$(field.dataset.paramValue);if(!target)return;target.value=field.type==='checkbox'?(field.checked?'1':'0'):field.value; if(field.type==='checkbox')target.checked=field.checked;target.dispatchEvent(new Event('change',{bubbles:true}));atualizarResumoParametro(field.dataset.paramValue==='co-posto'?'co':field.dataset.paramValue);atualizarDescontosPreview();});
document.addEventListener('change',e=>{const field=e.target.closest('[data-param-value]');if(!field)return;const target=$(field.dataset.paramValue);if(!target)return;if(field.type==='checkbox')target.checked=field.checked;else target.value=field.value;atualizarResumoParametro(field.dataset.paramValue==='co-posto'?'co':field.dataset.paramValue);atualizarDescontosPreview();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&catalogEl&&!catalogEl.hidden)fecharCatalogo();});
function atualizarResumoTopo(receitas,descontos,liquido,margem=0){
 const valores=[['cc-live-receitas',receitas],['cc-live-descontos',descontos],['cc-live-liquido',liquido],['cc-live-margem',margem]];
 valores.forEach(([id,valor])=>{const el=$(id);if(el)el.textContent=R(Number.isFinite(Number(valor))?Number(valor):0);});
}
function atualizarDescontosPreview(){
 const areaR=$('cc-preview-receitas'),areaD=$('cc-preview-descontos');
 if(!$('pensao-auto-valor')||!$('fusex-auto-valor'))return;
 try{
  const f=perfil();if(!f.p)throw new Error('Selecione o posto ou graduação.');
  const extras=readRows('receitas-extras'),extrasDesc=readRows('descontos-extras');
  const base=f.base+extras.filter(r=>r.baseContribuicao).reduce((s,r)=>s+r.valor,0);
  const rawQuota=$('fusex-quota')?.value||'0',quotaPercent=parseFloat(rawQuota)||0;
  const d=calcularDescontosObrigatorios(base,quotaPercent,{pensaoAuto:C('pensao-auto'),optou15:C('pensao-15'),fusexNao:C('fusex-nao')});
  const feriasAtivo=C('ferias-ativo')&&!$('cc-evento-ferias')?.hidden;
  const feriasBase=feriasAtivo?f.total:0,feriasValor=feriasAtivo?calcularAdicionalFerias(feriasBase):0;
  const natalinoAtivo=C('natalino-ativo')&&!$('cc-evento-natalino')?.hidden;
  const natalino=calcularAdicionalNatalino(natalinoAtivo?(N('natalino-base')||f.total):0,N('natalino-meses')||12);
  const parcelaNatal=Number($('natalino-parcela')?.value||1);
  const natalinoCredito=natalinoAtivo?(parcelaNatal===1?natalino.primeira:natalino.total):0;
  const adiantamentoNatal=natalinoAtivo&&parcelaNatal===2?Math.min(natalino.total,N('natalino-adiantamento')||natalino.primeira):0;
  const irNatalino=natalinoAtivo&&parcelaNatal===2?calcularIRRF(natalino.total,{modo:'simplificado'}):calcularIRRF(0,{modo:'simplificado'});
  const tributaveis=extras.filter(r=>r.irTributavel).reduce((s,r)=>s+r.valor,0),pensaoAlimenticia=extrasDesc.filter(r=>r.irDedutivel).reduce((s,r)=>s+r.valor,0);
  const irFerias=feriasAtivo?calcularIRRF(f.total+feriasValor,{dependentes:N('dep-ir'),pensao:d.pensao,fusex:d.fusex,quota:d.quota,alimenticia:pensaoAlimenticia}):calcularIRRF(0);
  const ir=calcularIRRF((feriasAtivo?0:f.total)+tributaveis,{dependentes:N('dep-ir'),pensao:d.pensao,fusex:d.fusex,quota:d.quota,alimenticia:pensaoAlimenticia});
  const money=(label,value,sub='')=>`<div class="cc-preview-row"><div><strong>${label}</strong>${sub?`<small>${sub}</small>`:''}</div><b>${R(value)}</b></div>`;
  const receitaRows=[money('Soldo',f.s,'Tabela vigente'),money('Adicional militar',f.am,`${D.CIRC[f.p.circ]}% do soldo de ${f.p.nome}`),money('Adicional de habilitação',f.hab,`${N('hab')}% do soldo`),money(f.atsMaior?'Adicional de tempo de serviço':'Adicional de disponibilidade',f.dd,`${f.disp}% do soldo`),...(f.co?[money('Compensação orgânica',f.co,`${f.co}% sobre ${f.coPosto.nome}`)]:[]),...(f.pm?[money('Adicional de permanência',f.pm,`${N('pm')}% do soldo`)]:[]),...(f.gle?[money('Gratificação de localidade especial',f.gle)]:[]),money('Assistência pré-escolar',calcularAssistenciaPreEscolar(N('dep-pre-escolar'),base,1927,526.64).total,`${N('dep-pre-escolar')} dependente(s)`),...(feriasAtivo?[money('Adicional de férias (1/3)',feriasValor,'Decreto nº 4.307/2002, art. 80')]:[]),...(natalinoAtivo?[money(parcelaNatal===1?'Adicional natalino — 1ª parcela':'Adicional natalino — 2ª parcela (13º integral)',natalinoCredito,parcelaNatal===1?'50% do valor proporcional; sem IR na antecipação':'Valor integral do 13º antes do abatimento da 1ª parcela')]:[]),...extras.map(r=>money(esc(r.nome),r.valor,r.irTributavel?'Tributável no IR mensal':'Incidência de IR não marcada'))];
  const descontoRows=[money('Pensão militar',d.pensao,`${C('pensao-auto')?(C('pensao-15')?'12% total (10,5% + 1,5%)':'10,5% da base'):'Desativada'}`),money('FuSEx',d.fusex,'3% da base'),money('FuSEx — dependentes',d.quota,`${quotaPercent}% da base`),money('Imposto de Renda mensal',ir.imposto,`Alíquota efetiva ${ir.aliquotaEfetiva.toFixed(2).replace('.',',')}%`),...(feriasAtivo?[money('IR sobre férias',irFerias.imposto,'Apuração separada sobre remuneração de férias + 1/3')]:[]),...(natalinoAtivo&&parcelaNatal===2?[money('Adiantamento da 1ª parcela do 13º',adiantamentoNatal,'Abatimento da antecipação já recebida'),money('IR sobre 13º',irNatalino.imposto,'Tributação exclusiva sobre o valor integral')]:[]),...extrasDesc.map(r=>money(esc(r.nome),r.valor,r.irDedutivel?'Dedutível no IR (marcação do usuário)':''))];
  if(areaR)areaR.innerHTML=receitaRows.join('');if(areaD)areaD.innerHTML=descontoRows.join('');
  if($('ferias-base'))$('ferias-base').value=feriasBase.toFixed(2);if($('ferias-valor'))$('ferias-valor').value=feriasValor.toFixed(2);if($('ferias-summary-value'))$('ferias-summary-value').textContent=R(feriasValor);
  if($('natalino-valor'))$('natalino-valor').value=natalino.total.toFixed(2);if($('natalino-summary-value'))$('natalino-summary-value').textContent=R(natalinoCredito);
  const natBaseLabel=$('natalino-base')?.closest('label');if(natBaseLabel){const t=natBaseLabel.firstChild;if(t&&t.nodeType===3)t.textContent=parcelaNatal===1?'Remuneração do mês anterior à 1ª parcela (R$)':'Remuneração-base de dezembro (R$)';}
  if($('natalino-base')&&!$('natalino-base').dataset.userEdited)$('natalino-base').value=(f.total||0).toFixed(2);
  if($('natalino-adiantamento')&&!$('natalino-adiantamento').dataset.userEdited)$('natalino-adiantamento').value=natalino.primeira.toFixed(2);
  $('pensao-auto-valor').value=R(d.pensao);$('fusex-auto-valor').value=R(d.fusex);$('fusex-quota-valor').value=R(d.quota);
  atualizarSubtotaisExtras();
  // Atualiza também o demonstrativo detalhado automaticamente, sem botão de confirmação.
  if(typeof FN!=='undefined'&&FN.contracheque)FN.contracheque();
 }catch(e){if(areaR)areaR.innerHTML='<div class="cc-placeholder">Informe os dados principais para calcular.</div>';atualizarResumoTopo(0,0,0);}
}

const FN={
contracheque(){
 const situacao=$('situacao')?.value||'ativa-carreira';
 if(situacao==='reserva'||situacao==='reformado'){atualizarResumoTopo(0,0,0);const nome=situacao==='reserva'?'reserva remunerada':'reformado';return show(`<h3>Simulação de inatividade em preparação</h3><p>Você selecionou <strong>${nome}</strong>. O motor atual atende à remuneração da ativa; não será aplicado a proventos para evitar resultados incorretos.</p><div class="warn">A simulação de reserva e reforma será desenvolvida em etapa própria.</div>`,false);}
 const f=perfil();if(!f.p){atualizarResumoTopo(0,0,0);return show('<div class="warn">Selecione seu posto ou graduação para calcular o contracheque.</div>',false);}const quantidadePre=Math.max(0,Math.trunc(N('dep-pre-escolar'))),valorPreUnit=526.64,vbPre=D.POSTOS.find(p=>p.id==='sd_eng')?.soldo||1927;
 const receitasExtras=readRows('receitas-extras'),descontosExtras=readRows('descontos-extras');
 const lancamentoInvalido=[...document.querySelectorAll('.calc-row')].some(row=>{const valor=Number(String(row.querySelector('[data-row-value]')?.value||'0').replace(',','.'))||0;const nome=row.querySelector('[data-row-name]')?.value.trim()||'';return valor>0&&!nome;});
 if(lancamentoInvalido){atualizarResumoTopo(0,0,0);return show('<div class="warn">Preencha a descrição de cada receita ou desconto que tenha valor maior que zero.</div>',false);}
 atualizarSubtotaisExtras();
 const base=f.base+receitasExtras.filter(r=>r.baseContribuicao).reduce((s,r)=>s+r.valor,0),preEscolar=calcularAssistenciaPreEscolar(quantidadePre,base,vbPre,valorPreUnit),creditoPre=preEscolar.total,quotaPercent=C('fusex-nao')?0:parseFloat(String($('fusex-quota')?.value||'0').replace(',','.'))||0;
 const descObrigatorios=calcularDescontosObrigatorios(base,quotaPercent,{pensaoAuto:C('pensao-auto'),optou15:C('pensao-15'),fusexNao:C('fusex-nao')});
 const fusex=descObrigatorios.fusex,quota=descObrigatorios.quota,pensao=descObrigatorios.pensao;
 if($('pensao-auto-valor'))$('pensao-auto-valor').value=R(pensao);
 if($('fusex-auto-valor'))$('fusex-auto-valor').value=R(fusex);
 if($('fusex-quota-valor'))$('fusex-quota-valor').value=R(quota);
 const pensaoAlimenticia=descontosExtras.filter(r=>r.irDedutivel).reduce((s,r)=>s+r.valor,0),feriasAtivo=C('ferias-ativo')&&!$('cc-evento-ferias')?.hidden,feriasBase=feriasAtivo?f.total:0,ferias=feriasAtivo?calcularAdicionalFerias(feriasBase):0,natalinoAtivo=C('natalino-ativo')&&!$('cc-evento-natalino')?.hidden,natalinoCalc=calcularAdicionalNatalino(natalinoAtivo?(N('natalino-base')||f.total):0,N('natalino-meses')||12),natalinoParcela=Number($('natalino-parcela')?.value||1),natalino=natalinoAtivo?(natalinoParcela===1?natalinoCalc.primeira:natalinoCalc.total):0,adiantamentoNatal=natalinoAtivo&&natalinoParcela===2?Math.min(natalinoCalc.total,N('natalino-adiantamento')||natalinoCalc.primeira):0;
 const receitasTributaveis=receitasExtras.filter(r=>r.irTributavel).reduce((s,r)=>s+r.valor,0);
 const totalRemuneracao=f.total;
 const rendimentoMensalTributavel=(feriasAtivo?0:totalRemuneracao)+receitasTributaveis;
 const depIR=Math.max(0,Math.trunc(N('dep-ir')));
 const irMensal=calcularIRRF(rendimentoMensalTributavel,{dependentes:depIR,pensao,fusex:C('fusex-nao')?0:fusex,quota:C('fusex-nao')?0:quota,alimenticia:pensaoAlimenticia});
 // Eventos de férias e 13º são apurados em separado da remuneração mensal, sem duplicar os créditos no demonstrativo.
 const remuneracaoFeriasEvento=feriasAtivo?f.total:0;
  const irFerias=feriasAtivo?calcularIRRF(remuneracaoFeriasEvento+ferias,{dependentes:depIR,pensao,fusex:C('fusex-nao')?0:fusex,quota:C('fusex-nao')?0:quota,alimenticia:pensaoAlimenticia}):calcularIRRF(0);
 const irNatalino=natalinoAtivo&&natalinoParcela===2?calcularIRRF(natalinoCalc.total,{modo:'simplificado'}):calcularIRRF(0,{modo:'simplificado'});
 const descontosAuto=[['Pensão militar (10,5%)',descObrigatorios.pensaoBase],['Contribuição adicional histórica (1,5%)',descObrigatorios.pensaoHistorica],['FuSEx padrão (3%)',fusex],['FuSEx — quota complementar ('+(quotaPercent*1).toLocaleString('pt-BR')+'%)',quota],['Imposto de Renda mensal',irMensal.imposto],['IR sobre férias',irFerias.imposto],['IR sobre adicional natalino / 13º',irNatalino.imposto]];
 const outrosDescontos=[['Adiantamento da 1ª parcela do 13º',adiantamentoNatal],...descontosExtras.map(r=>[esc(r.nome),r.valor])];
 const totais=calcularTotaisSimulacao({remuneracao:totalRemuneracao,preEscolar:creditoPre,ferias,natalino,receitasExtras,descontosAutomaticos:descontosAuto.map(r=>r[1]),adiantamentoNatal,descontosExtras});
 const totalCreditos=totais.totalReceitas,totalDescontos=totais.totalDescontos,liquido=totais.liquido;
 const extrasPermanentes=receitasExtras.filter(r=>r.margemPermanente).reduce((s,r)=>s+r.valor,0);
 // CPEx: rendimentos permanentes x 70%, menos reserva de 10% do soldo, descontos obrigatórios e descontos autorizados. GLE, representação/PTTC e direitos remuneratórios/eventuais não compõem a base.
 const margemBase=Math.max(0,f.total-f.gle+extrasPermanentes), descontosObrigatoriosMargem=descObrigatorios.pensao+descObrigatorios.fusex+descObrigatorios.quota+irMensal.imposto, descontosAutorizadosMargem=descontosExtras.reduce((s,r)=>s+r.valor,0), margemCalc=calcularMargemConsignavel({rendimentosPermanentes:margemBase,soldo:f.s,descontosObrigatorios:descontosObrigatoriosMargem,descontosAutorizados:descontosAutorizadosMargem}), margem=margemCalc.disponivel, reserva=margemCalc.reserva;
 atualizarResumoTopo(totalCreditos,totalDescontos,liquido,margem);
 const rowsReceitas=[...linhasRem(f),['Assistência pré-escolar ('+quantidadePre+' dependente(s))',creditoPre],...(feriasAtivo?[['Adicional de férias (1/3)',ferias]]:[]),...(natalinoAtivo?[[natalinoParcela===1?'Adicional natalino — 1ª parcela':'Adicional natalino — 2ª parcela (13º integral)',natalino]]:[]),...receitasExtras.map(r=>[esc(r.nome)+(r.irTributavel?' · tributável IR':' · sem incidência IR marcada'),r.valor])];
 let h=`<button type="button" class="btn btn-secundario cc-pdf-button" id="imprimir-contracheque">Baixar simulação em PDF</button><section class="cc-report cc-margin-highlight"><h3>Margem consignável disponível</h3><strong>${R(margem)}</strong><small>Rendimentos permanentes × 70% − reserva de 10% do soldo − descontos obrigatórios − descontos autorizados. Pode ser negativa, conforme orientação do CPEx.</small></section>
 <section class="cc-report"><h3>Dados da simulação</h3>${tbl([['Situação funcional',0,situacao==='ativa-carreira'?'Ativa — carreira':situacao==='ativa-temporario'?'Ativa — temporário':'Aluno'],['Posto ou graduação',0,f.p.nome],['Mês de referência',0,($('mes-ref')?.value||'Não informado')],['Base de contribuição PM/FuSEx',base],['Posto de referência da compensação orgânica',0,f.coPosto.nome]])}
 <div class="cc-report-receitas"><h3>Receitas</h3>${tbl(rowsReceitas,['Total de receitas',totalCreditos])}</div>
 <div class="cc-report-descontos"><h3>Descontos</h3>${tbl([...descontosAuto,...outrosDescontos],['Total de descontos',totalDescontos])}</div>
 <h3>Imposto de Renda mensal detalhado</h3>${tbl([['Método aplicado',0,irMensal.metodo],['Rendimentos tributáveis',irMensal.bruto],['Deduções legais disponíveis',irMensal.legais],['Desconto simplificado de referência',irMensal.simplificado],['Dedução aplicada',irMensal.deducao],['Dedução por dependentes',depIR*IR2026.dependente],['Base de cálculo',irMensal.base],['Alíquota da faixa',0,(irMensal.aliquota*100).toFixed(1)+'%'],['Parcela a deduzir',irMensal.parcela],['Imposto antes da redução',irMensal.impostoBase],['Redução mensal Lei 15.270/2025',irMensal.reducao]],['Imposto mensal estimado',irMensal.imposto])}
 <h3>Imposto sobre férias — apuração separada</h3>${tbl([['Remuneração de férias considerada automaticamente',remuneracaoFeriasEvento],['Adicional de 1/3',ferias],['Rendimentos tributáveis de férias (remuneração + 1/3)',irFerias.bruto],['Método de dedução',0,irFerias.metodo],['Deduções legais disponíveis',irFerias.legais],['Dedução aplicada',irFerias.deducao],['Base de cálculo',irFerias.base],['Alíquota da faixa',0,(irFerias.aliquota*100).toFixed(1)+'%']],['IR sobre férias',irFerias.imposto])}
 <h3>Imposto sobre adicional natalino — tributação exclusiva</h3>${tbl([['Parcela selecionada',0,natalinoParcela===1?'1ª parcela — antecipação sem IR':'2ª parcela — quitação'],['Meses computados',0,natalinoCalc.meses],['Valor integral proporcional do 13º',natalinoCalc.total],['Adiantamento da 1ª parcela já recebido',adiantamentoNatal],['Rendimentos tributáveis do 13º',irNatalino.bruto],['Desconto simplificado aplicado',irNatalino.deducao],['Dedução de pensão alimentícia judicial informada',0,pensaoAlimenticia?'A pensão informada entra na apuração mensal; confirme a parcela correspondente ao 13º':'Não informada'],['Base de cálculo',irNatalino.base],['Alíquota da faixa',0,(irNatalino.aliquota*100).toFixed(1)+'%']],['IR sobre adicional natalino',irNatalino.imposto])}
 <h3>Margem consignável estimada</h3>${tbl([['Base de cálculo da margem (remuneração mensal)',margemBase],['Percentual de referência',0,'70% da base de cálculo'],['Limite de margem (base × 70%)',margemBase*.70],['Descontos obrigatórios considerados',descontosObrigatoriosMargem],['Descontos autorizados considerados',descontosAutorizadosMargem],['Reserva de 10% do soldo',reserva]],['Margem disponível estimada',margem])}
 </section><div class="warn">Estimativa para conferência. O IR mensal compara deduções legais informadas (pensão militar, FuSEx, quota complementar, dependentes e pensão alimentícia) com o desconto simplificado e aplica a redução de 2026. Férias e 13º são apurados em separado. Férias: adicional de 1/3 conforme art. 80 do Decreto 4.307/2002, com IR estimado separadamente sobre remuneração + terço, comparando deduções legais informadas e desconto simplificado. 13º: 1ª parcela sem IR; na 2ª, o IR incide sobre o valor integral, inclusive antecipação, e a 1ª parcela é abatida como adiantamento. As receitas manuais só entram no IR mensal quando marcadas como tributáveis e na base PM/FuSEx quando marcada a incidência. Descontos manuais são somados uma única vez; a pensão alimentícia só é dedutível no IR quando marcada e amparada por decisão/acordo judicial. Quando férias estão ativas, a remuneração-base e o terço são apurados em separado do IR mensal, sem duplicar o crédito da remuneração. Confira incidências e valores com o CPEx.</div>`;
 if(situacao==='ativa-temporario'||situacao==='aluno')h+='<div class="warn">Atenção: a situação temporária/de aluno exige validação individual de elegibilidade. Esta versão não implementa as regras específicas de cada vínculo.</div>';
 show(h,false);const printBtn=$('imprimir-contracheque');if(printBtn)printBtn.addEventListener('click',()=>window.print());
},

transporte(){const p=P('posto'),soldo=N('soldoc')||p.soldo,gasto=(N('ida')+N('volta'))*N('dias'),cota=soldo*22/30*0.06,aux=Math.max(0,gasto-cota);
 let h=`<div>Auxílio-transporte estimado por mês</div><div class="big">${R(aux)}</div>`+tbl([['Despesa mensal com transporte',gasto],['Cota-parte do militar (6% do soldo proporcional a 22 dias)',cota],['Valor pago pela União',aux]]);
 if(gasto<=cota)h+='<div class="warn">Sem direito ao benefício: a despesa não supera a cota-parte (Portaria 849-Cmt Ex, art. 8º, § 3º).</div>';show(h)},
diarias(){const r=D.DIAR[+$('circ').value],v=r[1+ +$('dest').value],dias=Math.round(N('dias'));if(dias<1)return show('Informe os dias de afastamento.');
 const meia=C('lt8')?0:v*0.5,inteiras=C('lt8')?0:Math.max(0,dias-1)*v,diarias=inteiras+(dias>=1?meia:0),acr=N('acr')*N('acrv'),desc=N('atd')*N('atdias');
 const tot=diarias+acr-desc;
 let h=`<div>Total estimado</div><div class="big">${R(tot)}</div>`+tbl([[`Diárias (${Math.max(0,dias-1)} com pernoite × ${R(v)})`,inteiras],['Meia diária no dia do retorno',meia],['Acréscimo de embarque e desembarque',acr],['Desconto do auxílio-transporte',-desc,'− '+R(desc)]],['Total',tot]);
 h+='<div class="warn">Confira no Decreto 4.307/2002 as regras de meia diária e o valor do acréscimo de embarque/desembarque. Não acumula com gratificação de representação (se houver as duas, prevalecem as diárias).</div>';show(h)},
gr(){const p=P('posto'),s=p.soldo,og=p.circ==='OG'?s*0.10:0,cmd=C('cmd')?s*0.10*Math.min(30,N('dcmd'))/30:0,ev=s*0.02*N('dev'),tot=og+cmd+ev;
 let h=`<div>Gratificação estimada no mês</div><div class="big">${R(tot)}</div>`+tbl([['Oficial-general (10% do soldo)',og],['Cargo de comando, direção ou chefia (10%, proporcional aos dias)',cmd],['Viagem, instrução ou emprego operacional (2% do soldo por dia)',ev]],['Total',tot]);
 h+='<div class="warn">Pelo Decreto 11.002/2022, períodos de 8 a 24 horas contam como 1 dia nos casos de viagem, instrução e emprego operacional, e esses casos não acumulam entre si. A gratificação eventual exige ato de autorização.</div>';show(h)},
alimentacao(){const e=N('etapa'),a=N('n24'),b=N('n8'),c=N('n1'),tot=e*(10*a+5*b+c);
 show(`<div>Total estimado</div><div class="big">${R(tot)}</div>`+tbl([[`Serviço de 24 h (${a} × 10 etapas)`,e*10*a],[`Expediente acima de 8 h e abaixo de 24 h (${b} × 5 etapas)`,e*5*b],[`Outras situações (${c} × 1 etapa)`,e*c]],['Total',tot])+'<div class="warn">Valor da etapa: Portaria GM-MD nº 2.774/2025. Confirme se o seu caso se enquadra nas situações do art. 3º, XIII da MP 2.215-10.</div>')},
ajuda(m){const f=perfil(),dep=C('dep'),sit=$('sit').value;let mult,txt,rem=f.total;
 if(sit==='f'){const ref=D.POSTOS.find(x=>x.id===f.p.ref),o=prm();o.gle=0;o.gr=0;rem=comp(ref,o).total;mult=8;txt='8 × remuneração calculada com o soldo do último posto do círculo (Anexo V, situação f)'}
 else{const t={a:[2,'2 × remuneração (com desligamento da OM)'],d:[4,'4 × remuneração (Localidade Especial Categoria A)'],b:[3,'2 × na ida + 1 × na volta (comissão de mais de 3 até 12 meses)'],c:[2,'1 × na ida + 1 × na volta (comissão de mais de 15 dias até 3 meses)']}[sit];mult=t[0];txt=t[1];if(!dep){mult/=2;txt+=', pela metade (sem dependente)'}}
 const tot=rem*mult;let h=`<div>Ajuda de custo estimada</div><div class="big">${R(tot)}</div>`+tbl([['Remuneração considerada',rem],['Regra aplicada',0,txt],['Fator',0,mult+' ×']],['Total',tot]);
 h+='<div class="warn">Anexo V da Lei 13.954/2019. A "remuneração" soma soldo, adicionais e gratificações (art. 1º da MP 2.215-10; Portaria 290-DGP, art. 27). Transporte, bagagem e passagens não entram neste cálculo.</div>';show(h)},
imc(){const p=N('peso'),a=N('altura')/100;if(!p||!a)return show('Informe peso e altura.');const v=p/(a*a);show(`<div class="big">IMC ${v.toFixed(1)}</div>`+(v<18.5?'Abaixo do peso':v<25?'Peso normal':v<30?'Sobrepeso':v<35?'Obesidade grau I':v<40?'Obesidade grau II':'Obesidade grau III'))},
juros(){const i=N('ini'),m=N('apt'),t=N('taxa')/100,n=Math.round(N('meses')),mt=$('per').value==='a'?Math.pow(1+t,1/12)-1:t;let s=i,tot=i,rows='';
 for(let k=1;k<=n;k++){const r=s*mt;s+=r+m;tot+=m;if(k<=360)rows+=`<tr><td>${k}</td><td>${R(tot)}</td><td>${R(r)}</td><td>${R(s)}</td></tr>`}
 show(`<div>Saldo final</div><div class="big">${R(s)}</div>Aportado: ${R(tot)} · Rendimento: ${R(s-tot)}<div style="overflow-x:auto"><table class="tbl"><tr><th>Mês</th><th>Aportado</th><th>Rend.</th><th>Saldo</th></tr>${rows}</table></div>`)},
pensao(){const b=N('base'),p=N('perc')/100;show(`<div>Pensão</div><div class="big">${R(b*p)}</div>Base ${R(b)} × ${(p*100).toFixed(2)}%`)}};
document.querySelectorAll('form[data-fn]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();FN[f.dataset.fn](f.dataset.modo)}));
const hs=$('habsel');if(hs){hs.addEventListener('change',()=>{$('hab').value=hs.value;atualizarDescontosPreview();});const savedHab=N('hab');if([...hs.options].some(o=>Number(o.value)===savedHab))hs.value=String(savedHab);}
// A prévia da etapa 2 precisa acompanhar todo o preenchimento, não apenas a troca do adicional de habilitação.
const CAMPOS_PREVIA = new Set([
 'situacao','posto','mes-ref','qe','smi','habsel','hab','ats','co','co-posto','pm','gle',
 'dep-total','dep-fusex','dep-ir','dep-salario-familia','dep-pre-escolar',
 'pensao-auto','pensao-15','fusex-quota','fusex-nao','ferias-ativo','natalino-ativo','natalino-parcela','natalino-meses','natalino-base','natalino-adiantamento'
]);
const atualizarSeCampoDaPrevia = (event) => {
 const alvo=event.target;
 if(!alvo || !alvo.id) return;
 if(alvo.id==='mes-ref'&&$('cc-evento-natalino')&&!$('cc-evento-natalino').hidden&&!$('natalino-parcela')?.dataset.userSelected){const mes=(alvo.value||'').slice(5,7);$('natalino-parcela').value=(mes==='11'||mes==='12')?'2':'1';}
 if(CAMPOS_PREVIA.has(alvo.id) || alvo.matches('[data-row-name],[data-row-value],[data-row-ir],[data-row-base],[data-row-ir-deduction],[data-row-margin],[data-row-margin]')) atualizarDescontosPreview();
};
document.addEventListener('input',e=>{if(e.target?.id==='natalino-base'||e.target?.id==='natalino-adiantamento')e.target.dataset.userEdited='1';atualizarSeCampoDaPrevia(e);});
$('natalino-parcela')?.addEventListener('change',e=>{e.target.dataset.userSelected='1';atualizarDescontosPreview();});
document.addEventListener('change',atualizarSeCampoDaPrevia);
// Restaura os eventos opcionais salvos no perfil local e renderiza a prévia.
if(C('ferias-ativo')&&$('cc-evento-ferias'))$('cc-evento-ferias').hidden=false;
if(C('natalino-ativo')&&$('cc-evento-natalino'))$('cc-evento-natalino').hidden=false;
restaurarParametrosSalvos();
Object.keys(PARAM_CONFIG).forEach(k=>{const card=document.querySelector(`[data-param-card="${k}"]`);atualizarResumoParametro(k,card);if(card)card.classList.remove('is-editing');});
['ferias','natalino'].forEach(k=>{const panel=$(`cc-evento-${k}`);if(panel&&!panel.hidden)panel.classList.remove('is-editing');});
atualizarDescontosPreview();
if (typeof window !== 'undefined') window.MilicoAudazCore = Object.freeze({ dados: D, comp, formatarMoeda: R, adicionarLinha: addRow, normalizarLancamentos, somarLancamentos, calcularIRRF, calcularDescontosObrigatorios, calcularAssistenciaPreEscolar, calcularAdicionalFerias, calcularAdicionalNatalino, lerLancamentos: readRows, calcularTotaisSimulacao, calcularMargemConsignavel });
// ----- home: busca, filtros e favoritos -----
const tiles=[...document.querySelectorAll('.tile')];
if(tiles.length){let cat='all',q='',favs=[];try{favs=JSON.parse(localStorage.getItem('milico-fav')||'[]')}catch(e){}
 const box=$('favs'),sb=$('busca');
 const apply=()=>{let n=0;tiles.forEach(t=>{const ok=(cat==='all'||t.dataset.cat===cat)&&(!q||t.dataset.q.includes(q));t.hidden=!ok;if(ok)n++});const nr=$('nores');if(nr)nr.hidden=n>0};
 const paint=()=>{tiles.forEach(t=>{const b=t.querySelector('.fav');if(b)b.setAttribute('aria-pressed',favs.includes(t.dataset.id))});
  if(box){box.innerHTML='';favs.forEach(id=>{const t=document.querySelector('.tile[data-id="'+id+'"]');if(t){const c=t.cloneNode(true);c.hidden=false;box.appendChild(c)}});const fs=$('favsec');if(fs)fs.hidden=!box.children.length}};
 document.addEventListener('click',e=>{const b=e.target.closest('.fav');if(!b)return;const id=b.dataset.id;favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];try{localStorage.setItem('milico-fav',JSON.stringify(favs))}catch(x){}paint()});
 document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{cat=c.dataset.cat;document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));apply()}));
 if(sb)sb.addEventListener('input',()=>{q=sb.value.trim().toLowerCase();apply()});paint();apply()}
})();