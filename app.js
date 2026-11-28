(()=>{
const D={"POSTOS": [{"id": "gen_ex", "nome": "General de Exército", "soldo": 14711, "circ": "OG", "disp": 41, "qe": null, "ref": "gen_ex"}, {"id": "gen_div", "nome": "General de Divisão", "soldo": 14100, "circ": "OG", "disp": 38, "qe": null, "ref": "gen_ex"}, {"id": "gen_bda", "nome": "General de Brigada", "soldo": 13639, "circ": "OG", "disp": 35, "qe": null, "ref": "gen_ex"}, {"id": "cel", "nome": "Coronel", "soldo": 12505, "circ": "SUP", "disp": 32, "qe": null, "ref": "cel"}, {"id": "tc", "nome": "Tenente-Coronel", "soldo": 12285, "circ": "SUP", "disp": 26, "qe": null, "ref": "cel"}, {"id": "maj", "nome": "Major", "soldo": 12108, "circ": "SUP", "disp": 20, "qe": null, "ref": "cel"}, {"id": "cap", "nome": "Capitão", "soldo": 9976, "circ": "INT", "disp": 12, "qe": null, "ref": "cap"}, {"id": "ten1", "nome": "1º Tenente", "soldo": 9004, "circ": "SUB", "disp": 6, "qe": null, "ref": "ten1"}, {"id": "ten2", "nome": "2º Tenente", "soldo": 8179, "circ": "SUB", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "asp", "nome": "Aspirante a Oficial", "soldo": 7988, "circ": "SUB", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "subten", "nome": "Subtenente", "soldo": 6737, "circ": "SGT", "disp": 32, "qe": null, "ref": "subten"}, {"id": "sgt1", "nome": "1º Sargento", "soldo": 5988, "circ": "SGT", "disp": 20, "qe": null, "ref": "subten"}, {"id": "sgt2", "nome": "2º Sargento", "soldo": 5209, "circ": "SGT", "disp": 12, "qe": 26, "ref": "subten"}, {"id": "sgt3", "nome": "3º Sargento", "soldo": 4177, "circ": "SGT", "disp": 6, "qe": 16, "ref": "subten"}, {"id": "cabo_e", "nome": "Cabo (engajado)", "soldo": 2869, "circ": "PRA", "disp": 6, "qe": null, "ref": "subten"}, {"id": "cabo_n", "nome": "Cabo (não engajado)", "soldo": 1177, "circ": "PRA", "disp": 6, "qe": null, "ref": "subten"}, {"id": "sd_esp", "nome": "Soldado de 1ª classe especializado e engajado / Paraquedista engajado", "soldo": 2103, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "sd_eng", "nome": "Soldado engajado (não especializado)", "soldo": 1927, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "sd_rec", "nome": "Soldado / Recruta (não engajado)", "soldo": 1177, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "cad1", "nome": "Cadete ou Aspirante (último ano)", "soldo": 1780, "circ": "PRA", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "cad", "nome": "Cadete (demais anos) ou aluno de formação de oficiais da reserva", "soldo": 1457, "circ": "PRA", "disp": 5, "qe": null, "ref": "ten1"}, {"id": "al1", "nome": "Aluno de escola de sargentos ou EsPCEx (último ano)", "soldo": 1309, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}, {"id": "al2", "nome": "Aluno da EsPCEx (demais anos)", "soldo": 1294, "circ": "PRA", "disp": 5, "qe": null, "ref": "subten"}], "CIRC": {"OG": 28, "SUP": 25, "INT": 22, "SUB": 19, "SGT": 16, "PRA": 13}, "DIAR": [["Comandantes de Força e Natureza Especial", 800, 700, 650], ["Oficiais-Generais", 600, 515, 455], ["Oficiais-Superiores", 510, 450, 395], ["Oficiais Intermediários, Subalternos e Aspirante a Oficial", 425, 380, 335], ["Subtenentes, Sargentos, Aspirantes e Cadetes", 425, 380, 335], ["Alunos de formação (CFOAer, NPOR, EsPCEx e similares)", 355, 315, 280], ["Demais praças e praças especiais", 355, 315, 280]], "SM": 1621.0, "ETAPA": 13.5};
const postosOriginais=D.POSTOS.reduce((acc,p)=>({...acc,[p.id]:p}),{});
const clonarPosto=(base,id,nome,disp)=>({...postosOriginais[base],id,nome,disp});
D.POSTOS=[
 postosOriginais.gen_ex,postosOriginais.gen_div,postosOriginais.gen_bda,postosOriginais.cel,postosOriginais.tc,postosOriginais.maj,
 clonarPosto('cap','cap_qao','Capitão QAO',32),{...postosOriginais.cap,nome:'Capitão'},
 clonarPosto('ten1','ten1_qao','Primeiro-Tenente QAO',32),{...postosOriginais.ten1,nome:'Primeiro-Tenente'},
 clonarPosto('ten2','ten2_qao','Segundo-Tenente QAO',32),{...postosOriginais.ten2,nome:'Segundo-Tenente'},
 {...postosOriginais.asp,nome:'Aspirante a Oficial'},postosOriginais.subten,{...postosOriginais.sgt1,nome:'Primeiro-Sargento'},
 clonarPosto('sgt2','sgt2_qe','Segundo-Sargento QE',26),{...postosOriginais.sgt2,nome:'Segundo-Sargento',qe:null},
 clonarPosto('sgt3','sgt3_qe','Terceiro-Sargento QE',16),{...postosOriginais.sgt3,nome:'Terceiro-Sargento',qe:null},
 {...postosOriginais.cabo_e,id:'cabo',nome:'Cabo'},
 {...postosOriginais.sd_esp,nome:'Soldado especializado (PQDT)'},
 {...postosOriginais.sd_eng,nome:'Soldado engajado'},
 {...postosOriginais.sd_rec,nome:'Soldado do efetivo variável (recruta)'}
];
const $=id=>document.getElementById(id),N=id=>{const e=$(id);return e?parseFloat(String(e.value).replace(',','.'))||0:0},C=id=>!!($(id)&&$(id).checked);
const R=v=>(Number.isFinite(Number(v))?Number(v):0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const show=(h,scroll=true)=>{const r=$('res');r.hidden=false;const form=document.querySelector('form.calc[data-fn], form#taf');r.classList.add('res-ready');r.innerHTML='<div class="res-title"><span class="res-title-mark" aria-hidden="true">✓</span><strong>Resultado da simulação</strong></div>'+h+(form?'<div class="res-actions"><button type="button" class="res-edit" data-result-edit>Alterar dados e simular novamente</button></div>':'');r.classList.toggle('res-contracheque',!!r.querySelector('.cc-report'));const edit=r.querySelector('[data-result-edit]');if(edit)edit.addEventListener('click',()=>{form.scrollIntoView({behavior:'smooth',block:'center'});const first=form.querySelector('input:not([type=hidden]):not([disabled]),select:not([disabled]),button:not([disabled])');if(first)first.focus({preventScroll:true});});if(scroll)r.scrollIntoView({behavior:'smooth',block:'nearest'})};
const tbl=(rows,tot)=>'<table class="tbl">'+rows.filter(r=>(Number.isFinite(Number(r[1]))&&Number(r[1])!==0)||r[2]!=null||r[3]===true).map(r=>`<tr><td>${r[0]}</td><td>${r[2]||R(r[1])}</td></tr>`).join('')+(tot?`<tr class="tot"><td>${tot[0]}</td><td>${R(tot[1])}</td></tr>`:'')+'</table>';
const IR2026={faixas:[[2428.80,0,0],[2826.65,.075,182.16],[3751.05,.15,394.16],[4664.68,.225,675.49],[Infinity,.275,908.73]],dependente:189.59,simplificado:607.20};
function calcularIRRF(rendimentos,op={}){const bruto=Math.max(0,Number(rendimentos)||0),dependentes=Math.max(0,Math.trunc(Number(op.dependentes)||0)),legais=Math.max(0,Number(op.pensao)||0)+Math.max(0,Number(op.fusex)||0)+Math.max(0,Number(op.quota)||0)+Math.max(0,Number(op.alimenticia)||0)+dependentes*IR2026.dependente;const simplificado=IR2026.simplificado,usarLegal=op.modo==='simplificado'?false:(op.modo==='legal'?true:legais>=simplificado),deducao=usarLegal?legais:simplificado,base=Math.max(0,bruto-deducao);let faixa=IR2026.faixas.find(f=>base<=f[0])||IR2026.faixas.at(-1);let impostoBase=Math.max(0,base*faixa[1]-faixa[2]);let reducao=bruto<=5000?Math.min(impostoBase,312.89):bruto<=7350?Math.min(impostoBase,Math.max(0,978.62-.133145*bruto)):0;return{bruto,legais,simplificado,deducao,metodo:usarLegal?'Deduções legais':'Desconto simplificado',base,aliquota:faixa[1],parcela:faixa[2],impostoBase,reducao,imposto:Math.max(0,impostoBase-reducao),aliquotaEfetiva:bruto?Math.max(0,impostoBase-reducao)/bruto*100:0};}
function calcularAuxilioTransporte(tarifaIda,tarifaVolta,dias,soldo){const ida=Math.max(0,Number(tarifaIda)||0),volta=Math.max(0,Number(tarifaVolta)||0),qtd=Math.min(22,Math.max(0,Math.trunc(Number(dias)||0))),base=Math.max(0,Number(soldo)||0),despesaDiaria=ida+volta,despesaMensal=despesaDiaria*qtd,cotaParte=base*22/30*.06;return{ida,volta,dias:qtd,despesaDiaria,despesaMensal,soldo:base,cotaParte,estimativa:Math.max(0,despesaMensal-cotaParte)};}
function calcularAuxilioAlimentacao(etapa,n24,n8,n1){const valor=Math.round(Number(etapa)*100)/100,servicos24=Math.trunc(Number(n24)),servicos8a24=Math.trunc(Number(n8)),outrasSituacoes=Math.trunc(Number(n1)),valor24=Math.round(valor*10*servicos24*100)/100,valor8a24=Math.round(valor*5*servicos8a24*100)/100,valorOutras=Math.round(valor*outrasSituacoes*100)/100,total=Math.round((valor24+valor8a24+valorOutras)*100)/100;return{etapa:valor,servicos24,servicos8a24,outrasSituacoes,valor24,valor8a24,valorOutras,total,diasArt67:servicos24+servicos8a24};}
function calcularPensaoAlimenticia(op={}){const num=v=>Number(String(v??0).replace(',','.'))||0,cent=v=>Math.round(num(v)*100)/100;if(op.tipo==='fixo')return{tipo:'fixo',base:null,percentual:null,valor:cent(op.valorFixo)};const base=Math.max(0,num(op.base)),percentual=Math.max(0,num(op.percentual));return{tipo:'percentual',base,percentual,valor:cent(base*percentual/100)};}
function calcularGratificacaoRepresentacao(op={}){const cent=v=>Math.round((Number(v)||0)*100)/100,soldo=Math.max(0,Number(op.soldo)||0),oficialGeneral=!!op.oficialGeneral,comando=!!op.comando,diasComando=Math.min(30,Math.max(0,Math.trunc(Number(op.diasComando)||0))),diasEventuais=Math.max(0,Math.trunc(Number(op.diasEventuais)||0)),recebeDiarias=!!op.recebeDiarias,tipoEvento=String(op.tipoEvento||''),mensalOG=oficialGeneral?cent(soldo*.10):0,comandoMensal=comando?cent(soldo*.10*diasComando/30):0,eventoBruto=tipoEvento&&diasEventuais?cent(soldo*.02*diasEventuais):0,evento=recebeDiarias?0:eventoBruto,total=cent(mensalOG+comandoMensal+evento);return{soldo,oficialGeneral,comando,diasComando,diasEventuais,tipoEvento,mensalOG,comandoMensal,eventoBruto,evento,recebeDiarias,total};}
function calcularDiarias(op={}){const cent=v=>Math.round((Number(v)||0)*100)/100,valorDiaria=Math.max(0,Number(op.valor)||0),diasIntegrais=Math.max(0,Math.trunc(Number(op.diasIntegrais)||0)),meiasDiarias=Math.max(0,Math.trunc(Number(op.meiasDiarias)||0)),localidades=Math.max(0,Math.trunc(Number(op.localidades)||0)),valorAcrescimo=Math.max(0,Number(op.valorAcrescimo)||0),motivos=[];let fator=1;if(op.afastamentoInferiorOitoHoras){fator=0;motivos.push('Afastamento inferior a oito horas consecutivas: sem diária (art. 19, IV).');}if(op.coberturaIntegral){fator=0;motivos.push('Alimentação, pousada e locomoção urbana garantidas: sem diária (art. 19, I).');}if(op.mudancaSede){fator=0;motivos.push('Movimentação com mudança de sede e desligamento da OM: sem diária (art. 19, parágrafo único).');}const valorIntegral=cent(diasIntegrais*valorDiaria*fator),valorMeia=cent(meiasDiarias*valorDiaria*.5*fator),diarias=cent(valorIntegral+valorMeia),acrescimo=cent((op.veiculoOficial?0:localidades*valorAcrescimo)*(diarias>0?1:0)),total=cent(diarias+acrescimo);if(op.veiculoOficial)motivos.push('Acréscimo de embarque/desembarque zerado por uso de veículo oficial em trajeto previsto no art. 20, § 2º.');return{valorDiaria,diasIntegrais,meiasDiarias,localidades,valorAcrescimo,valorIntegral,valorMeia,diarias,acrescimo,total,motivos};}
function calcularAdicionalFerias(remuneracao){const base=Math.max(0,Number(remuneracao)||0);return Math.round(base/3*100)/100;}
function calcularAdicionalNatalino(remuneracao,meses=12){const base=Math.max(0,Number(remuneracao)||0),m=Math.min(12,Math.max(1,Math.trunc(Number(meses)||12))),total=Math.round(base*m/12*100)/100,primeira=Math.round(base/2*100)/100,segunda=Math.round((total-primeira)*100)/100;return{base,meses:m,total,primeira,segunda};}
function calcularAssistenciaPreEscolar(quantidade,remuneracao,vb,valorTeto=526.64){const qtd=Math.max(0,Math.trunc(Number(quantidade)||0)),rem=Math.max(0,Number(remuneracao)||0),baseVB=Math.max(1,Number(vb)||1),mult=rem/baseVB,cota=mult<=5?0.05:mult<=10?0.10:mult<=15?0.15:mult<=20?0.20:0.25,participacao=Math.round(valorTeto*cota*100)/100,liquidoUnit=Math.round((valorTeto-participacao)*100)/100;return{quantidade:qtd,valorTeto,cotaPercent:cota*100,participacao,liquidoUnit,total:Math.round(liquidoUnit*qtd*100)/100,multiplosVB:mult};}
function calcularDescontosObrigatorios(base,quotaPercent=0,op={}){const b=Math.max(0,Number(base)||0),cent=v=>Math.round(v*100)/100,pensaoBase=op.pensaoAuto===false?0:cent(b*.105),pensaoHistorica=op.pensaoAuto===false||!op.optou15?0:cent(b*.015),fusex=op.fusexNao?0:cent(b*.03),quota=op.fusexNao?0:cent(b*(Math.max(0,Number(quotaPercent)||0)/100));return{base:b,pensaoBase,pensaoHistorica,pensao:pensaoBase+pensaoHistorica,fusex,quota};}
function validarParametrosFerramenta(nome, valores={}){
 const regras={
  transporte:[['ida','Tarifa de ida',0],['volta','Tarifa de volta',0],['dias','Dias de deslocamento',0,22,true]],
  alimentacao:[['etapa','Valor da etapa comum',0.01],['n24','Quantidade de serviços de 24 horas',0,10,true],['n8','Quantidade de serviços/expedientes',0,10,true],['n1','Quantidade de outras situações',0,30,true]],
  diarias:[['diasIntegrais','Dias com diária integral',0,366,true],['meiasDiarias','Dias com meia diária',0,366,true],['acr','Localidades com acréscimo',0,100,true],['acrv','Valor do acréscimo',0]],
  gr:[['dcmd','Dias no cargo',0,30,true],['dev','Dias de atividade eventual',0,366,true]],
  pensao:[['base','Base de cálculo',0],['perc','Percentual',0,100]]
 };
 const campos=nome==='pensao'&&valores.tipo==='fixo'?[]:regras[nome];if(!campos)return '';
 for(const [id,label,min=0,max=Infinity,inteiro=false,opcional=false] of campos){
  const raw=valores[id];if(opcional&&(raw===''||raw==null))continue;
  if(raw==null||String(raw).trim()==='')return `Informe ${label.toLocaleLowerCase('pt-BR')}.`;
  const texto=String(raw).trim();if(!/^-?(?:\d+|\d*[.,]\d+)$/.test(texto))return `${label}: informe um número válido.`;
  const n=Number(texto.replace(',','.'));if(!Number.isFinite(n))return `${label}: informe um número válido.`;
  if(inteiro&&!Number.isInteger(n))return `${label}: informe um número inteiro.`;
  if(n<min)return `${label}: o valor mínimo é ${min}.`;
  if(n>max)return `${label}: o valor máximo é ${max}.`;
 }
 if(nome==='pensao'){const tipo=valores.tipo||'percentual';if(tipo==='fixo'){const raw=valores.valorFixo;if(raw==null||String(raw).trim()==='')return 'Informe o valor mensal fixado.';if(!/^-?(?:\d+|\d*[.,]\d+)$/.test(String(raw).trim()))return 'Valor mensal fixado: informe um número válido.';if(Number(String(raw).replace(',','.'))<0)return 'Valor mensal fixado: o valor mínimo é 0.';}else{const raw=valores.base;if(raw==null||String(raw).trim()==='')return 'Informe a base de cálculo definida no título judicial.';}}
 if(nome==='alimentacao'){const n24=Number(String(valores.n24).replace(',','.')),n8=Number(String(valores.n8).replace(',','.'));if(n24+n8>10)return 'A soma dos serviços de 24 horas e dos serviços/expedientes acima de 8 horas não pode ultrapassar 10 dias no mês (art. 71, § 1º, do Decreto nº 4.307/2002).';}
 if(nome==='diarias'){const integrais=Number(String(valores.diasIntegrais).replace(',','.')),meias=Number(String(valores.meiasDiarias).replace(',','.'));if(integrais+meias>366)return 'A soma de dias integrais e meias diárias não pode ultrapassar 366. Confira o período informado.';}
 if(nome==='gr'){const dias=Number(String(valores.dev).replace(',','.'));if(dias>0&&!valores.tipoEvento)return 'Selecione a hipótese da atividade eventual informada.';if(dias===0&&valores.tipoEvento)return 'Informe ao menos 1 dia para a hipótese eventual selecionada.';}
 return '';
}
const valoresFormulario=ids=>Object.fromEntries(ids.map(id=>[id,$(id)?.value]));
const P=id=>D.POSTOS.find(p=>p.id===$(id).value);
function adicionarMesesClamped(data,meses){const y=data.getUTCFullYear(),m=data.getUTCMonth(),d=data.getUTCDate(),alvo=new Date(Date.UTC(y,m+meses,1)),ultimo=new Date(Date.UTC(alvo.getUTCFullYear(),alvo.getUTCMonth()+1,0)).getUTCDate();return new Date(Date.UTC(alvo.getUTCFullYear(),alvo.getUTCMonth(),Math.min(d,ultimo)));}
function calcularFaixaComissao(inicio,fim){const parse=v=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(String(v||'')))return null;const [a,m,d]=v.split('-').map(Number),dt=new Date(Date.UTC(a,m-1,d));return dt.getUTCFullYear()===a&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d?dt:null;};const di=parse(inicio),df=parse(fim);if(!di||!df||df<=di)return{erro:'Informe datas válidas e término posterior ao início.'};const dias=Math.round((df-di)/86400000),limite3=adicionarMesesClamped(di,3),limite12=adicionarMesesClamped(di,12);let faixa=null;if(df>new Date(di.getTime()+15*86400000)&&df<=limite3)faixa='c';else if(df>limite3&&df<=limite12)faixa='b';return{dias,faixa,inicio,fim,limite3:limite3.toISOString().slice(0,10),limite12:limite12.toISOString().slice(0,10)};}
function calcularDiasLocalidadeEspecial(apresentacao,partida){
 const inicio=new Date(apresentacao).getTime(),fim=new Date(partida).getTime();
 if(!Number.isFinite(inicio)||!Number.isFinite(fim))return {erro:'Informe data e hora válidas de apresentação e partida.'};
 const duracao=fim-inicio;if(duracao<=0)return {erro:'A partida deve ocorrer depois da apresentação.'};
 const dia=24*60*60*1000,limiar=8*60*60*1000,completos=Math.floor(duracao/dia),resto=duracao%dia;
 return {dias:completos+(resto>=limiar?1:0),horas:duracao/3600000,periodosCompletos:completos,fracaoComputada:resto>=limiar,restoHoras:resto/3600000};
}
function comp(p,o){const s=p.soldo,d=(o.dispPercent!=null&&Number.isFinite(Number(o.dispPercent)))?Number(o.dispPercent):p.disp,am=p.id==='sd_rec'?0:s*D.CIRC[p.circ]/100,hab=p.id==='sd_rec'?0:s*o.hab/100,ats=s*o.ats/100,dp=s*d/100,dd=Math.max(ats,dp),coPosto=D.POSTOS.find(x=>x.id===o.coPosto)||p,co=coPosto.soldo*o.co/100,pm=s*o.pm/100,gle=s*o.gle/100,gr=s*o.gr/100;
 return{p,s,am,hab,ats,dp,dd,co,coPosto,pm,gle,gr,disp:d,atsMaior:ats>=dp,base:s+am+hab+dd+co+pm+gle,total:s+am+hab+dd+co+pm+gle+gr}}
const prm=()=>({hab:N('hab'),ats:N('ats'),dispPercent:$('acdm-percentual')?.value==='auto'?null:Number($('acdm-percentual')?.value),co:N('co'),coPosto:$('co-posto')?.value||$('posto')?.value,pm:N('pm'),gle:N('gle'),gr:document.querySelector('.mov-calc')&&C('cmd')?10:0});
function perfil(){const p=P('posto');if(!p)return{p:null};return comp(p,prm())}
// Art. 21, I, das IG FuSEx (Portaria C Ex nº 1.742/2022): soldados do Efetivo Variável não são contribuintes. O perfil sd_rec identifica expressamente Soldado/Recruta não engajado.
function isentoFusexPorEnquadramento(p){return p?.id==='sd_rec'}
const linhasRem=f=>[['Soldo',f.s,null,true],['Adicional militar',f.am,f.p?.id==='sd_rec'?'Não devido durante o serviço militar inicial':`${D.CIRC[f.p.circ]}% do soldo`,true],['Adicional de habilitação',f.hab,null,true],[f.atsMaior?'Adicional de tempo de serviço':'Adicional de disponibilidade',f.dd,null,true],[`Compensação orgânica (${f.co}% sobre ${f.coPosto.nome})`,f.co],['Adicional de permanência',f.pm],['Gratificação de localidade especial',f.gle],['Gratificação de representação (mensal)',f.gr]];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function normalizarLancamentos(items){return (Array.isArray(items)?items:[]).map(r=>({nome:String(r.nome||'').trim(),valor:Math.max(0,Number(String(r.valor??0).replace(',','.'))||0),irTributavel:!!r.irTributavel,baseContribuicao:!!r.baseContribuicao,irDedutivel:!!r.irDedutivel,margemPermanente:!!r.margemPermanente})).filter(r=>r.nome&&r.valor>0)}
function somarLancamentos(items){return normalizarLancamentos(items).reduce((s,r)=>s+r.valor,0)}
function calcularMargemConsignavel(op={}){const rendimentos=Math.max(0,Number(op.rendimentosPermanentes)||0),soldo=Math.max(0,Number(op.soldo)||0),obrigatorios=Math.max(0,Number(op.descontosObrigatorios)||0),autorizados=Math.max(0,Number(op.descontosAutorizados)||0),limite=rendimentos*.70,reserva=soldo*.10,disponivel=limite-reserva-obrigatorios-autorizados;return{rendimentosPermanentes:rendimentos,limite,reserva,descontosObrigatorios:obrigatorios,descontosAutorizados:autorizados,disponivel:Math.round(disponivel*100)/100};}
function calcularTotaisSimulacao(op={}){const receitasBase=Math.max(0,Number(op.remuneracao)||0)+Math.max(0,Number(op.preEscolar)||0)+Math.max(0,Number(op.salarioFamilia)||0)+Math.max(0,Number(op.ferias)||0)+Math.max(0,Number(op.natalino)||0)+somarLancamentos(op.receitasExtras||[]);const descontosBase=(Array.isArray(op.descontosAutomaticos)?op.descontosAutomaticos.reduce((s,v)=>s+Math.max(0,Number(v)||0),0):0)+Math.max(0,Number(op.adiantamentoNatal)||0)+somarLancamentos(op.descontosExtras||[]);return{totalReceitas:Math.round(receitasBase*100)/100,totalDescontos:Math.round(descontosBase*100)/100,liquido:Math.round((receitasBase-descontosBase)*100)/100};}
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
  {id:'fusex-quota',nome:'Quota complementar FuSEx',desc:'Informe manualmente 0,4% ou 0,5% conforme seu enquadramento e cadastro. O simulador considera correta a opção selecionada.',param:'fusex-quota'},
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
const POSTO_LEGADO={'cabo_e':'cabo','cabo_n':'cabo'};
function postoCanonico(id,qe=false){const value=String(id||'');if(POSTO_LEGADO[value])return POSTO_LEGADO[value];if(qe&&value==='sgt2')return'sgt2_qe';if(qe&&value==='sgt3')return'sgt3_qe';return value;}
document.querySelectorAll('select#posto,select#co-posto').forEach(select=>{const selecionado=select.value,placeholder=select.options[0]?.value===''?select.options[0].outerHTML:'';select.innerHTML=placeholder+POSTO_OPTIONS;const perfilSalvo=window.MilicoAudazPerfil?.get?.()||{},canonico=postoCanonico(select.id==='posto'&&perfilSalvo.posto?perfilSalvo.posto:selecionado,!!perfilSalvo.qe);if([...select.options].some(option=>option.value===canonico))select.value=canonico;});
const PARAM_CONFIG={
 ats:{box:'cc-receita-parametros',title:'Adicional de tempo de serviço',html:()=>`<label>Percentual de ATS reconhecido (%)<input type="number" min="0" max="100" step="0.01" data-param-value="ats" value="${Number($('ats')?.value||0)}"></label><small>Informe somente o percentual reconhecido e registrado. O cálculo compara ATS e disponibilidade, sem somar os dois.</small>`},
 co:{box:'cc-receita-parametros',title:'Compensação orgânica',html:()=>`<label>Percentual<select data-param-value="co">${Array.from({length:20},(_,i)=>i+1).map(v=>`<option value="${v}" ${Number($('co')?.value||0)===v?'selected':''}>${v}%</option>`).join('')}</select></label><label>Posto/graduação de referência<select data-param-value="co-posto">${POSTO_OPTIONS}</select></label><small>O percentual incide sobre o soldo do posto/graduação selecionado, que pode ser diferente do posto atual.</small>`},
 pm:{box:'cc-receita-parametros',title:'Adicional de permanência',html:()=>`<label>Percentual<select data-param-value="pm">${[5,10,15,20].map(v=>`<option value="${v}" ${Number($('pm')?.value||0)===v?'selected':''}>${v}%</option>`).join('')}</select></label><small>Selecione somente o percentual a que efetivamente faz jus.</small>`},
 gle:{box:'cc-receita-parametros',title:'Gratificação de localidade especial',html:()=>`<label>Categoria<select data-param-value="gle">${[[10,'Categoria B — 10%'],[20,'Categoria A — 20%']].map(([v,t])=>`<option value="${v}" ${Number($('gle')?.value||0)===v?'selected':''}>${t}</option>`).join('')}</select></label><small>Selecione a categoria reconhecida para a localidade de serviço.</small>`},
 'fusex-quota':{box:'cc-desconto-parametros',title:'Quota complementar FuSEx',html:()=>`<label>Enquadramento da quota complementar<select data-param-value="fusex-quota"><option value="0">Não se aplica</option><option value="0.4" ${$('fusex-quota')?.value==='0.4'?'selected':''}>0,4% — 1 direto</option><option value="0.5" ${$('fusex-quota')?.value==='0.5'?'selected':''}>0,5% — ampliada</option></select></label><small>Preencha manualmente conforme seu cadastro FuSEx; o simulador considera correto o enquadramento informado. 0,4%: um dependente direto além do cônjuge. 0,5%: mais de um dependente direto (exceto cônjuge) ou um ou mais dependentes indiretos. A contribuição básica de 3% é separada.</small>`},
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
 const valores=[['cc-live-receitas',receitas],['cc-live-descontos',descontos],['cc-live-liquido',liquido],['cc-live-margem',margem],['cc-total-receitas-bloco',receitas],['cc-total-descontos-bloco',descontos]];
 valores.forEach(([id,valor])=>{const el=$(id);if(el)el.textContent=R(Number.isFinite(Number(valor))?Number(valor):0);});
}
function atualizarDescontosPreview(){
 const areaR=$('cc-preview-receitas'),areaD=$('cc-preview-descontos');
 if(!$('pensao-auto-valor')||!$('fusex-auto-valor'))return;
 if(!$('posto')?.value){
  if(areaR)areaR.innerHTML='<div class="cc-placeholder">Selecione seu posto ou graduação para visualizar as receitas.</div>';
  if(areaD)areaD.innerHTML='<div class="cc-placeholder">Os descontos estimados serão exibidos após o preenchimento dos dados principais.</div>';
  atualizarResumoTopo(0,0,0,0);
  const resultado=$('res');if(resultado){resultado.hidden=true;resultado.innerHTML='';resultado.classList.remove('res-ready','res-contracheque');}
  return;
 }
 try{
  const f=perfil();if(!f.p)throw new Error('Selecione o posto ou graduação.');
  const extras=readRows('receitas-extras'),extrasDesc=readRows('descontos-extras');
  const quantidadeSalarioFamilia=Math.max(0,Math.trunc(N('dep-salario-familia'))),creditoSalarioFamilia=Math.round(quantidadeSalarioFamilia*0.16*100)/100;
  const base=f.base+extras.filter(r=>r.baseContribuicao).reduce((s,r)=>s+r.valor,0);
  const fusexIsento=C('fusex-nao')||isentoFusexPorEnquadramento(f.p);
  const rawQuota=$('fusex-quota')?.value||'0',quotaPercent=fusexIsento?0:(parseFloat(rawQuota)||0);
  const d=calcularDescontosObrigatorios(base,quotaPercent,{pensaoAuto:C('pensao-auto'),optou15:C('pensao-15'),fusexNao:fusexIsento});
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
  const quantidadePreEscolar=Math.max(0,Math.trunc(N('dep-pre-escolar'))),dependentesInformados=['dep-total','dep-fusex','dep-ir','dep-salario-familia','dep-pre-escolar'].some(id=>N(id)>0);
  const receitaRows=[money('Soldo',f.s,'Tabela vigente'),money('Adicional militar',f.am,f.p.id==='sd_rec'?'Não devido durante o serviço militar inicial':`${D.CIRC[f.p.circ]}% do soldo de ${f.p.nome}`),money('Adicional de habilitação',f.hab,`${f.p.id==='sd_rec'?0:N('hab')}% do soldo`),money(f.atsMaior?'Adicional de tempo de serviço':'Adicional de disponibilidade',f.dd,`${f.atsMaior?f.ats:f.disp}% do soldo`),...(f.co?[money('Compensação orgânica',f.co,`${f.co}% sobre ${f.coPosto.nome}`)]:[]),...(f.pm?[money('Adicional de permanência',f.pm,`${N('pm')}% do soldo`)]:[]),...(f.gle?[money('Gratificação de localidade especial',f.gle)]:[]),...(dependentesInformados?[money('Salário-família',creditoSalarioFamilia,`${quantidadeSalarioFamilia} dependente(s) informado(s) manualmente × R$ 0,16`),money('Assistência pré-escolar',calcularAssistenciaPreEscolar(quantidadePreEscolar,base,1927,526.64).total,`${quantidadePreEscolar} dependente(s)`)]:[]),...(feriasAtivo?[money('Adicional de férias (1/3)',feriasValor,'Decreto nº 4.307/2002, art. 80')]:[]),...(natalinoAtivo?[money(parcelaNatal===1?'Adicional natalino — 1ª parcela':'Adicional natalino — 2ª parcela (13º integral)',natalinoCredito,parcelaNatal===1?'50% do valor proporcional; sem IR na antecipação':'Valor integral do 13º antes do abatimento da 1ª parcela')]:[]),...extras.map(r=>money(esc(r.nome),r.valor,r.irTributavel?'Tributável no IR mensal':'Incidência de IR não marcada'))];
  const descontoRows=[money('Pensão militar',d.pensao,`${C('pensao-auto')?(C('pensao-15')?'12% total (10,5% + 1,5%)':'10,5% da base'):'Desativada'}`),money('FuSEx',d.fusex,fusexIsento?'Isento — Cabo/Soldado do Efetivo Variável':'3% da base'),...((dependentesInformados||quotaPercent>0)?[money('FuSEx — dependentes',d.quota,`${quotaPercent}% da base`)]:[]),money('Imposto de Renda mensal',ir.imposto,`Alíquota efetiva ${ir.aliquotaEfetiva.toFixed(2).replace('.',',')}%`),...(feriasAtivo?[money('IR sobre férias',irFerias.imposto,'Apuração separada sobre remuneração de férias + 1/3')]:[]),...(natalinoAtivo&&parcelaNatal===2?[money('Adiantamento da 1ª parcela do 13º',adiantamentoNatal,'Abatimento da antecipação já recebida'),money('IR sobre 13º',irNatalino.imposto,'Tributação exclusiva sobre o valor integral')]:[]),...extrasDesc.map(r=>money(esc(r.nome),r.valor,r.irDedutivel?'Dedutível no IR (marcação do usuário)':''))];
  if(areaR)areaR.innerHTML=receitaRows.join('');if(areaD)areaD.innerHTML=descontoRows.join('');
  if($('ferias-base'))$('ferias-base').value=feriasBase.toFixed(2);if($('ferias-valor'))$('ferias-valor').value=feriasValor.toFixed(2);if($('ferias-summary-value'))$('ferias-summary-value').textContent=R(feriasValor);
  if($('natalino-valor'))$('natalino-valor').value=natalino.total.toFixed(2);if($('natalino-summary-value'))$('natalino-summary-value').textContent=R(natalinoCredito);
  const natBaseLabel=$('natalino-base')?.closest('label');if(natBaseLabel){const t=natBaseLabel.firstChild;if(t&&t.nodeType===3)t.textContent=parcelaNatal===1?'Remuneração do mês anterior à 1ª parcela (R$)':'Remuneração-base de dezembro (R$)';}
  if($('natalino-base')&&!$('natalino-base').dataset.userEdited)$('natalino-base').value=(f.total||0).toFixed(2);
  if($('natalino-adiantamento')&&!$('natalino-adiantamento').dataset.userEdited)$('natalino-adiantamento').value=natalino.primeira.toFixed(2);
  $('pensao-auto-valor').value=R(d.pensao);$('fusex-auto-valor').value=R(d.fusex);$('fusex-quota-valor').value=R(d.quota);
  atualizarSubtotaisExtras();
  // Atualiza o resumo assim que o posto é escolhido, mesmo antes da situação funcional.
  if(!$('situacao')?.value){
   const totaisPreview=calcularTotaisSimulacao({remuneracao:f.total,preEscolar:quantidadePreEscolar?calcularAssistenciaPreEscolar(quantidadePreEscolar,base,1927,526.64).total:0,salarioFamilia:quantidadeSalarioFamilia?creditoSalarioFamilia:0,ferias:feriasAtivo?feriasValor:0,natalino:natalinoAtivo?natalinoCredito:0,receitasExtras:extras,descontosAutomaticos:[d.pensao,d.fusex,...(dependentesInformados||quotaPercent>0?[d.quota]:[]),ir.imposto,...(feriasAtivo?[irFerias.imposto]:[]),...(natalinoAtivo&&parcelaNatal===2?[irNatalino.imposto]:[])],adiantamentoNatal,descontosExtras:extrasDesc});
   atualizarResumoTopo(totaisPreview.totalReceitas,totaisPreview.totalDescontos,totaisPreview.liquido,0);
   const resultado=$('res');if(resultado){resultado.hidden=true;resultado.innerHTML='';resultado.classList.remove('res-ready','res-contracheque');}
  }else if(typeof FN!=='undefined'&&FN.contracheque)FN.contracheque();
 }catch(e){if(areaR)areaR.innerHTML='<div class="cc-placeholder">Informe os dados principais para calcular.</div>';atualizarResumoTopo(0,0,0);}
}

function itensMovimentacaoSelecionados(){
 const nomes={
  'empregado-domestico':'Empregado doméstico',
  automovel:'Transporte de automóvel',
  motocicleta:'Transporte de motocicleta',
  bagagem:'Transporte de bagagem',
  passagens:'Passagens',
 };
 return [...document.querySelectorAll('input[name="mov-item"]:checked')].map(el=>nomes[el.value]||el.value);
}
function renderItensMovimentacao(){
 const itens=itensMovimentacaoSelecionados();
 if(!itens.length)return '';
 return `<section class="result-block"><h3>Itens incluídos nesta movimentação</h3><ul>${itens.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p class="note">Somente os itens marcados são considerados nos cálculos.</p></section>`;
}
const TABELA_TARIFA_BAGAGEM=[
 [50,29.64],[100,32.50],[200,38.48],[400,51.47],[600,63.77],[800,76.67],[1000,88.61],[1200,100.68],[1400,113.04],[1600,125.48],[1800,138.06],[2000,150.84],[2200,163.80],[2400,176.93],[2600,189.22],[2800,201.50],[3000,214.14],[3200,226.46],[3400,238.82],[3600,251.34],[3800,263.88],[4000,276.17],[4200,288.91],[4400,301.52],[4600,314.47],[4800,327.12],[5000,339.15],[Infinity,352.61]
];
const CUBAGEM_MOV={gen_ex:60,gen_div:60,gen_bda:60,cel:55,tc:55,maj:55,cap_qao:50,cap:50,ten1_qao:50,ten1:50,ten2_qao:50,ten2:50,asp:45,subten:50,sgt1:50,sgt2_qe:45,sgt2:45,sgt3_qe:45,sgt3:45,cabo:35,sd_esp:35,sd_eng:35,sd_rec:35};
function calcularTransporteBagagemMov(distanciaKm,postoId,itens){
 const km=Number(distanciaKm);if(!Number.isFinite(km)||km<=0)return {erro:'Informe a distância rodoviária de ida para estimar a bagagem.'};
 const tarifa=TABELA_TARIFA_BAGAGEM.find(([limite])=>km<=limite)?.[1];
 const cubagemMoveis=itens.includes('bagagem')?(CUBAGEM_MOV[postoId]||0):0;
 const cubagemAutomovel=itens.includes('automovel')?12:0;
 const cubagemMotocicleta=itens.includes('motocicleta')?3:0;
 const totalM3=cubagemMoveis+cubagemAutomovel+cubagemMotocicleta;
 const valor=Math.round(totalM3*tarifa*100)/100;
 return {km,tarifa,cubagemMoveis,cubagemAutomovel,cubagemMotocicleta,totalM3,valor,postoId};
}
function atualizarResumoItensMov(){
 const status=$('mov-itens-status');if(!status)return;
 const itens=itensMovimentacaoSelecionados();
 status.textContent=itens.length?`${itens.length} item(ns) selecionado(s): ${itens.join(', ')}.`:'Nenhum item adicional selecionado.';
}
// Os campos de dependentes são informados uma única vez e também alimentam
// a condição de dependente usada no cálculo da ajuda de custo.
function totalDependentesPerfilMov(){
 const perfil=window.MilicoAudazPerfil?.get?.();
 return Math.max(0,Math.trunc(Number(perfil?.['dep-total'])||0));
}
function faixasDependentesMov(){
 const faixas=[['adultos','Adultos'],['menores2','Crianças menores de 2 anos'],['maiores2','Crianças maiores de 2 anos']]
  .map(([id,nome])=>({nome,qtd:Math.max(0,Math.trunc(Number($('mov-dependentes-'+id)?.value)||0))}))
  .filter(item=>item.qtd>0);
 if(faixas.length)return faixas;
 const total=totalDependentesPerfilMov();
 return total?[{nome:'Dependentes do contracheque',qtd:total}]:[];
}
function sincronizarDependentesMov(){
 const total=['mov-dependentes-adultos','mov-dependentes-menores2','mov-dependentes-maiores2']
  .reduce((s,id)=>s+Math.max(0,Math.trunc(Number($(id)?.value)||0)),0);
 const dep=$('dep');if(dep)dep.checked=total>0||totalDependentesPerfilMov()>0;
}
['mov-dependentes-adultos','mov-dependentes-menores2','mov-dependentes-maiores2'].forEach(id=>{
 $(id)?.addEventListener('input',sincronizarDependentesMov);
 $(id)?.addEventListener('change',sincronizarDependentesMov);
});
sincronizarDependentesMov();
const TARIFA_PASSAGEM_KM_PESSOA = 0.50;
function distanciaTotalDestinoMov(nomeDestino){
 const normalizar=s=>String(s||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/\s+/g,' ');
 const alvo=normalizar(nomeDestino);
 if(!alvo)return null;
 const row=[...document.querySelectorAll('#mov-destinos-lista .mov-destino')].find(el=>normalizar(el.querySelector('.mov-destino-nome')?.value)===alvo);
 if(!row)return null;
 const raw=Number(String(row.querySelector('.mov-destino-km-ida')?.value||'').replace(',','.'));
 const km=Number.isFinite(raw)?Math.round(raw):NaN;
 return Number.isFinite(km)&&km>0?km:null;
}
// Compatibilidade do núcleo público: mantém a função de cálculo disponível
// para integrações e testes legados. A interface atual calcula automaticamente
// as passagens dos dependentes em renderPassagensMov(), sem cadastro manual.
function calcularTransportePessoalMov(passageiros=[]){
 const itens=[];let quantidade=0,total=0;
 for(const p of (Array.isArray(passageiros)?passageiros:[])){
  const destino=String(p?.destino||'').trim(),tipo=String(p?.tipo||'').trim();
  const qtd=Math.max(0,Math.trunc(Number(p?.quantidade)||0));
  if(!destino&&!tipo)continue;
  if(!destino||!tipo)return {erro:'Informe destino e categoria para cada passageiro iniciado.',itens,quantidade,total};
  if(tipo==='domestico'&&!document.querySelector('input[name="mov-item"][value="empregado-domestico"]:checked'))continue;
  const km=Number(p?.km);
  if(!Number.isFinite(km)||km<=0)return {erro:`Informe a distância rodoviária de ida para ${destino}.`,itens,quantidade,total};
  if(qtd<1)return {erro:`Informe a quantidade de pessoas para ${destino}.`,itens,quantidade,total};
  const valor=Math.round(km*TARIFA_PASSAGEM_KM_PESSOA*qtd*100)/100;
  itens.push({destino,tipo,quantidade:qtd,km,tarifa:TARIFA_PASSAGEM_KM_PESSOA,valor});
  quantidade+=qtd;total+=valor;
 }
 return {itens,quantidade,total:Math.round(total*100)/100};
}
function renderPassagensMov(){
 const ativo=!!document.querySelector('input[name="mov-item"][value="passagens"]:checked');
 if(!ativo)return '';
 const destinos=[...document.querySelectorAll('#mov-destinos-lista .mov-destino')].map(row=>({nome:row.querySelector('.mov-destino-nome')?.value.trim()||'',km:distanciaTotalDestinoMov(row.querySelector('.mov-destino-nome')?.value||'')})).filter(x=>x.nome);
 const faixas=faixasDependentesMov();
 if(destinos.some(d=>!d.km))return '<section class="result-block mov-passagens-resumo"><h3>Passagens</h3><p class="warn">Informe a distância rodoviária de ida de cada destino na seção “Origem e destinos”.</p></section>';
 let total=0,html='<section class="result-block mov-passagens-resumo"><h3>Passagens do militar e dependentes</h3><div class="mov-financial-table-wrap"><table class="tbl mov-passagens-table"><thead><tr><th>Destino</th><th>Passageiro</th><th>Quantidade</th><th>Distância de ida</th><th>Valor estimado</th></tr></thead><tbody>';
 for(const d of destinos){const militar=Math.round(d.km*TARIFA_PASSAGEM_KM_PESSOA*100)/100;total+=militar;html+=`<tr><td>${esc(d.nome)}</td><td>Militar</td><td>1</td><td>${d.km.toLocaleString('pt-BR')} km</td><td>${R(militar)}</td></tr>`;for(const f of faixas){const valor=Math.round(d.km*TARIFA_PASSAGEM_KM_PESSOA*f.qtd*100)/100;total+=valor;html+=`<tr><td>${esc(d.nome)}</td><td>${f.nome}</td><td>${f.qtd}</td><td>${d.km.toLocaleString('pt-BR')} km</td><td>${R(valor)}</td></tr>`;}}
 return html+`</tbody></table></div><p class="big">Total estimado de passagens: ${R(total)}</p><p class="note">Cálculo: distância somente de ida × R$ 0,50 × quantidade de pessoas. O militar (1 pessoa) é incluído automaticamente em cada cenário de destino. Parâmetro estimativo, não tarifa oficial nem autorização de transporte.</p></section>`;
}
function renderMovDestinos(ajuda){
 const itens=[...document.querySelectorAll('input[name="mov-item"]:checked')].map(el=>el.value),postoId=$('posto')?.value||'';
 const linhas=[...document.querySelectorAll('#mov-destinos-lista .mov-destino')].map(el=>({nome:el.querySelector('.mov-destino-nome')?.value?.trim()||'',kmIda:Math.round(Number(String(el.querySelector('.mov-destino-km-ida')?.value||'').replace(',','.')))})).filter(x=>x.nome);
 if(!linhas.length)return '';const chave=s=>String(s||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
 const pass={itens:[],total:0};if(itens.includes('passagens')){for(const d of linhas){const km=distanciaTotalDestinoMov(d.nome);if(km)pass.itens.push({destino:d.nome,tipo:'Militar',quantidade:1,km,tarifa:TARIFA_PASSAGEM_KM_PESSOA,valor:Math.round(km*TARIFA_PASSAGEM_KM_PESSOA*100)/100});for(const f of faixasDependentesMov()){if(km)pass.itens.push({destino:d.nome,tipo:f.nome,quantidade:f.qtd,km,tarifa:TARIFA_PASSAGEM_KM_PESSOA,valor:Math.round(km*TARIFA_PASSAGEM_KM_PESSOA*f.qtd*100)/100});}}pass.total=pass.itens.reduce((a,x)=>a+x.valor,0);}
 let html='<section class="result-block mov-demonstrativo"><h3>Demonstrativo financeiro da movimentação</h3><div class="mov-financial-table-wrap"><table class="tbl mov-financial-table"><thead><tr><th>Destino</th><th>Ajuda de custo</th><th>Bagagem</th><th>Carro</th><th>Moto</th><th>Empregado</th><th>Passagens</th><th>Total estimado</th></tr></thead><tbody>';
 for(const d of linhas){const b=(itens.some(x=>['bagagem','automovel','motocicleta'].includes(x)))?calcularTransporteBagagemMov(d.kmIda,postoId,itens):{valor:0,cubagemMoveis:0,cubagemAutomovel:0,cubagemMotocicleta:0,tarifa:0};const tarifa=b.tarifa||0,bag=Math.round((b.cubagemMoveis||0)*tarifa*100)/100,carro=Math.round((b.cubagemAutomovel||0)*tarifa*100)/100,moto=Math.round((b.cubagemMotocicleta||0)*tarifa*100)/100;const pv=pass.erro?0:pass.itens.filter(x=>chave(x.destino)===chave(d.nome)).reduce((a,x)=>a+x.valor,0);const total=ajuda+bag+carro+moto+pv;const empregado=itens.includes('empregado-domestico')?'A apurar':'—';html+=`<tr><td>${esc(d.nome)}</td><td>${R(ajuda)}</td><td>${itens.includes('bagagem')?(b.erro?'Pendente':R(bag)):'—'}</td><td>${itens.includes('automovel')?(b.erro?'Pendente':R(carro)):'—'}</td><td>${itens.includes('motocicleta')?(b.erro?'Pendente':R(moto)):'—'}</td><td>${empregado}</td><td>${itens.includes('passagens')?R(pv):'—'}</td><td><strong>${R(total)}</strong></td></tr>`;}
 html+='</tbody></table></div><p class="note">Cada destino é um cenário separado. Não some destinos alternativos. Valores de bagagem, carro e moto dependem da distância de ida e da tabela aplicada. Empregado doméstico aparece como “A apurar” porque não há tarifa individual informada para calcular essa parcela sem inventar um valor.</p>';
 if(pass.erro)html+=`<p class="warn">${esc(pass.erro)}</p>`;html+='</section>';return html;
}

const FN={
contracheque(){
 const situacao=$('situacao')?.value||'';
 if(!situacao){atualizarResumoTopo(0,0,0,0);return show('<div class="warn">Selecione sua situação funcional para iniciar a simulação.</div>',false);}
 if(situacao==='reserva'||situacao==='reformado'){atualizarResumoTopo(0,0,0);const nome=situacao==='reserva'?'reserva remunerada':'reformado';return show(`<h3>Simulação de inatividade em preparação</h3><p>Você selecionou <strong>${nome}</strong>. O motor atual atende à remuneração da ativa; não será aplicado a proventos para evitar resultados incorretos.</p><div class="warn">A simulação de reserva e reforma será desenvolvida em etapa própria.</div>`,false);}
 const f=perfil();if(!f.p){atualizarResumoTopo(0,0,0);return show('<div class="warn">Selecione seu posto ou graduação para calcular o contracheque.</div>',false);}const quantidadePre=Math.max(0,Math.trunc(N('dep-pre-escolar'))),valorPreUnit=526.64,vbPre=D.POSTOS.find(p=>p.id==='sd_eng')?.soldo||1927;
 const receitasExtras=readRows('receitas-extras'),descontosExtras=readRows('descontos-extras');
 const lancamentoInvalido=[...document.querySelectorAll('.calc-row')].some(row=>{const valor=Number(String(row.querySelector('[data-row-value]')?.value||'0').replace(',','.'))||0;const nome=row.querySelector('[data-row-name]')?.value.trim()||'';return valor>0&&!nome;});
 if(lancamentoInvalido){atualizarResumoTopo(0,0,0);return show('<div class="warn">Preencha a descrição de cada receita ou desconto que tenha valor maior que zero.</div>',false);}
 atualizarSubtotaisExtras();
 const quantidadeSalarioFamilia=Math.max(0,Math.trunc(N('dep-salario-familia'))),creditoSalarioFamilia=Math.round(quantidadeSalarioFamilia*0.16*100)/100,dependentesInformados=['dep-total','dep-fusex','dep-ir','dep-salario-familia','dep-pre-escolar'].some(id=>N(id)>0);
 const fusexIsento=C('fusex-nao')||isentoFusexPorEnquadramento(f.p);
 const base=f.base+receitasExtras.filter(r=>r.baseContribuicao).reduce((s,r)=>s+r.valor,0),preEscolar=calcularAssistenciaPreEscolar(quantidadePre,base,vbPre,valorPreUnit),creditoPre=preEscolar.total,quotaPercent=fusexIsento?0:parseFloat(String($('fusex-quota')?.value||'0').replace(',','.'))||0;
 const descObrigatorios=calcularDescontosObrigatorios(base,quotaPercent,{pensaoAuto:C('pensao-auto'),optou15:C('pensao-15'),fusexNao:fusexIsento});
 const fusex=descObrigatorios.fusex,quota=descObrigatorios.quota,pensao=descObrigatorios.pensao;
 if($('pensao-auto-valor'))$('pensao-auto-valor').value=R(pensao);
 if($('fusex-auto-valor'))$('fusex-auto-valor').value=R(fusex);
 if($('fusex-quota-valor'))$('fusex-quota-valor').value=R(quota);
 const pensaoAlimenticia=descontosExtras.filter(r=>r.irDedutivel).reduce((s,r)=>s+r.valor,0),feriasAtivo=C('ferias-ativo')&&!$('cc-evento-ferias')?.hidden,feriasBase=feriasAtivo?f.total:0,ferias=feriasAtivo?calcularAdicionalFerias(feriasBase):0,natalinoAtivo=C('natalino-ativo')&&!$('cc-evento-natalino')?.hidden,natalinoCalc=calcularAdicionalNatalino(natalinoAtivo?(N('natalino-base')||f.total):0,N('natalino-meses')||12),natalinoParcela=Number($('natalino-parcela')?.value||1),natalino=natalinoAtivo?(natalinoParcela===1?natalinoCalc.primeira:natalinoCalc.total):0,adiantamentoNatal=natalinoAtivo&&natalinoParcela===2?Math.min(natalinoCalc.total,N('natalino-adiantamento')||natalinoCalc.primeira):0;
 const receitasTributaveis=receitasExtras.filter(r=>r.irTributavel).reduce((s,r)=>s+r.valor,0);
 const totalRemuneracao=f.total;
 const rendimentoMensalTributavel=(feriasAtivo?0:totalRemuneracao)+receitasTributaveis;
 const depIR=Math.max(0,Math.trunc(N('dep-ir')));
 const irMensal=calcularIRRF(rendimentoMensalTributavel,{dependentes:depIR,pensao,fusex:fusexIsento?0:fusex,quota:fusexIsento?0:quota,alimenticia:pensaoAlimenticia});
 // Eventos de férias e 13º são apurados em separado da remuneração mensal, sem duplicar os créditos no demonstrativo.
 const remuneracaoFeriasEvento=feriasAtivo?f.total:0;
  const irFerias=feriasAtivo?calcularIRRF(remuneracaoFeriasEvento+ferias,{dependentes:depIR,pensao,fusex:fusexIsento?0:fusex,quota:fusexIsento?0:quota,alimenticia:pensaoAlimenticia}):calcularIRRF(0);
 const irNatalino=natalinoAtivo&&natalinoParcela===2?calcularIRRF(natalinoCalc.total,{modo:'simplificado'}):calcularIRRF(0,{modo:'simplificado'});
 const descontosAuto=[['Pensão militar (10,5%)',descObrigatorios.pensaoBase,null,true],...(descObrigatorios.pensaoHistorica?[['Contribuição adicional histórica (1,5%)',descObrigatorios.pensaoHistorica]]:[]),['FuSEx padrão (3%)'+(fusexIsento?' — isento por enquadramento EV':''),fusex,null,true],...((dependentesInformados||quotaPercent>0)?[['FuSEx — dependentes ('+(quotaPercent*1).toLocaleString('pt-BR')+'%)',quota,null,true]]:[]),['Imposto de Renda mensal',irMensal.imposto,null,true],...(feriasAtivo?[['IR sobre férias',irFerias.imposto,null,true]]:[]),...(natalinoAtivo&&natalinoParcela===2?[['IR sobre adicional natalino / 13º',irNatalino.imposto,null,true]]:[])];
 const outrosDescontos=[['Adiantamento da 1ª parcela do 13º',adiantamentoNatal],...descontosExtras.map(r=>[esc(r.nome),r.valor])];
 const totais=calcularTotaisSimulacao({remuneracao:totalRemuneracao,preEscolar:creditoPre,salarioFamilia:creditoSalarioFamilia,ferias,natalino,receitasExtras,descontosAutomaticos:descontosAuto.map(r=>r[1]),adiantamentoNatal,descontosExtras});
 const totalCreditos=totais.totalReceitas,totalDescontos=totais.totalDescontos,liquido=totais.liquido;
 const extrasPermanentes=receitasExtras.filter(r=>r.margemPermanente).reduce((s,r)=>s+r.valor,0);
 // CPEx: rendimentos permanentes x 70%, menos reserva de 10% do soldo, descontos obrigatórios e descontos autorizados. GLE, representação/PTTC e direitos remuneratórios/eventuais não compõem a base.
 const margemBase=Math.max(0,f.total-f.gle+extrasPermanentes), descontosObrigatoriosMargem=descObrigatorios.pensao+descObrigatorios.fusex+descObrigatorios.quota+irMensal.imposto, descontosAutorizadosMargem=descontosExtras.reduce((s,r)=>s+r.valor,0), margemCalc=calcularMargemConsignavel({rendimentosPermanentes:margemBase,soldo:f.s,descontosObrigatorios:descontosObrigatoriosMargem,descontosAutorizados:descontosAutorizadosMargem}), margem=margemCalc.disponivel, reserva=margemCalc.reserva;
 atualizarResumoTopo(totalCreditos,totalDescontos,liquido,margem);
 const rowsReceitas=[...linhasRem(f),...(dependentesInformados?[['Salário-família ('+quantidadeSalarioFamilia+' dependente(s) × R$ 0,16)',creditoSalarioFamilia,null,true],['Assistência pré-escolar ('+quantidadePre+' dependente(s))',creditoPre,null,true]]:[]),...(feriasAtivo?[['Adicional de férias (1/3)',ferias]]:[]),...(natalinoAtivo?[[natalinoParcela===1?'Adicional natalino — 1ª parcela':'Adicional natalino — 2ª parcela (13º integral)',natalino]]:[]),...receitasExtras.map(r=>[esc(r.nome)+(r.irTributavel?' · tributável IR':' · sem incidência IR marcada'),r.valor])];
 let h=`<button type="button" class="btn btn-secundario btn-pdf cc-pdf-button" id="imprimir-contracheque">Baixar simulação em PDF</button><section class="cc-report cc-margin-highlight"><h3>Margem consignável disponível</h3><strong>${R(margem)}</strong><small>Rendimentos permanentes × 70% − reserva de 10% do soldo − descontos obrigatórios − descontos autorizados. Pode ser negativa, conforme orientação do CPEx.</small></section>
 <section class="cc-report"><h3>Dados da simulação</h3>${tbl([['Situação funcional',0,situacao==='ativa'?'Ativa — militar de carreira/temporário':situacao==='aluno'?'Aluno de formação militar':situacao==='reserva'?'Reserva remunerada':'Reformado'],['Posto ou graduação',0,f.p.nome],['Mês de referência',0,($('mes-ref')?.value||'Não informado')],['Base de contribuição PM/FuSEx',base],['Posto de referência da compensação orgânica',0,f.coPosto.nome]])}
 <div class="cc-report-receitas"><h3>Receitas</h3>${tbl(rowsReceitas,['Total de receitas',totalCreditos])}</div>
 <div class="cc-report-descontos"><h3>Descontos</h3>${tbl([...descontosAuto,...outrosDescontos],['Total de descontos',totalDescontos])}</div>
 <h3>Imposto de Renda mensal detalhado</h3>${tbl([['Método aplicado',0,irMensal.metodo],['Rendimentos tributáveis',irMensal.bruto],['Deduções legais disponíveis',irMensal.legais],['Desconto simplificado de referência',irMensal.simplificado],['Dedução aplicada',irMensal.deducao],['Dedução por dependentes',depIR*IR2026.dependente],['Base de cálculo',irMensal.base],['Alíquota da faixa',0,(irMensal.aliquota*100).toFixed(1)+'%'],['Parcela a deduzir',irMensal.parcela],['Imposto antes da redução',irMensal.impostoBase],['Redução mensal Lei 15.270/2025',irMensal.reducao]],['Imposto mensal estimado',irMensal.imposto])}
 <h3>Imposto sobre férias — apuração separada</h3>${tbl([['Remuneração de férias considerada automaticamente',remuneracaoFeriasEvento],['Adicional de 1/3',ferias],['Rendimentos tributáveis de férias (remuneração + 1/3)',irFerias.bruto],['Método de dedução',0,irFerias.metodo],['Deduções legais disponíveis',irFerias.legais],['Dedução aplicada',irFerias.deducao],['Base de cálculo',irFerias.base],['Alíquota da faixa',0,(irFerias.aliquota*100).toFixed(1)+'%']],['IR sobre férias',irFerias.imposto])}
 <h3>Imposto sobre adicional natalino — tributação exclusiva</h3>${tbl([['Parcela selecionada',0,natalinoParcela===1?'1ª parcela — antecipação sem IR':'2ª parcela — quitação'],['Meses computados',0,natalinoCalc.meses],['Valor integral proporcional do 13º',natalinoCalc.total],['Adiantamento da 1ª parcela já recebido',adiantamentoNatal],['Rendimentos tributáveis do 13º',irNatalino.bruto],['Desconto simplificado aplicado',irNatalino.deducao],['Dedução de pensão alimentícia judicial informada',0,pensaoAlimenticia?'A pensão informada entra na apuração mensal; confirme a parcela correspondente ao 13º':'Não informada'],['Base de cálculo',irNatalino.base],['Alíquota da faixa',0,(irNatalino.aliquota*100).toFixed(1)+'%']],['IR sobre adicional natalino',irNatalino.imposto])}
 <h3>Margem consignável estimada</h3>${tbl([['Base de cálculo da margem (remuneração mensal)',margemBase],['Percentual de referência',0,'70% da base de cálculo'],['Limite de margem (base × 70%)',margemBase*.70],['Descontos obrigatórios considerados',descontosObrigatoriosMargem],['Descontos autorizados considerados',descontosAutorizadosMargem],['Reserva de 10% do soldo',reserva]],['Margem disponível estimada',margem])}
 </section><div class="warn">Estimativa para conferência. O IR mensal compara deduções legais informadas (pensão militar, FuSEx, quota complementar, dependentes e pensão alimentícia) com o desconto simplificado e aplica a redução de 2026. Férias e 13º são apurados em separado. Férias: adicional de 1/3 conforme art. 80 do Decreto 4.307/2002, com IR estimado separadamente sobre remuneração + terço, comparando deduções legais informadas e desconto simplificado. 13º: 1ª parcela sem IR; na 2ª, o IR incide sobre o valor integral, inclusive antecipação, e a 1ª parcela é abatida como adiantamento. As receitas manuais só entram no IR mensal quando marcadas como tributáveis e na base PM/FuSEx quando marcada a incidência. Descontos manuais são somados uma única vez; a pensão alimentícia só é dedutível no IR quando marcada e amparada por decisão/acordo judicial. Quando férias estão ativas, a remuneração-base e o terço são apurados em separado do IR mensal, sem duplicar o crédito da remuneração. Confira incidências e valores com o CPEx.</div>`;
 if(situacao==='aluno')h+='<div class="warn">Atenção: a situação de aluno exige validação individual de elegibilidade. Esta versão não implementa as regras específicas desse vínculo.</div>';
 show(h,false);const printBtn=$('imprimir-contracheque');if(printBtn)printBtn.addEventListener('click',()=>window.print());
},

transporte(){const erro=validarParametrosFerramenta('transporte',valoresFormulario(['ida','volta','dias']));if(erro)return show(erro);const p=P('posto'),soldo=p.soldo,c=calcularAuxilioTransporte(N('ida'),N('volta'),N('dias'),soldo),aux=c.estimativa;
 let h=`<div>Valor mensal estimado</div><div class="big">${R(aux)}</div>`+tbl([['Custo diário total informado (ida + volta)',c.despesaDiaria],['Dias considerados na simulação',0,String(c.dias)],['Despesa mensal estimada',c.despesaMensal],['Soldo utilizado',c.soldo],['Cota-parte de 6% do soldo proporcional a 22 dias',c.cotaParte],['Diferença estimada',aux]]);
 if(c.despesaMensal<=c.cotaParte)h+='<div class="warn">Pelos valores informados, a despesa considerada não supera a cota-parte estimada. O resultado financeiro da simulação é R$ 0,00. Isso não substitui a análise administrativa das condições e do percurso declarados.</div>';h+='<div class="note">Informe o custo diário total de ida e volta considerando o percurso de menor custo em transporte coletivo disponível. Reduza os dias considerados quando houver utilização de transporte custeado pela União, conforme art. 5º, § 1º, do Decreto nº 12.117/2024. A ferramenta não verifica o percurso nem decide a concessão.</div>';show(h)},
diarias(){const ids=['diasIntegrais','meiasDiarias','acr','acrv'];const erro=validarParametrosFerramenta('diarias',valoresFormulario(ids));if(erro)return show(erro);const idx=+$('circ').value,dest=+$('dest').value,r=D.DIAR[idx],v=r?.[1+dest];if(!r||!Number.isInteger(dest)||dest<0||dest>2)return show('Selecione um círculo e um destino válidos.');
 const c=calcularDiarias({valor:v,diasIntegrais:N('diasIntegrais'),meiasDiarias:N('meiasDiarias'),localidades:N('acr'),valorAcrescimo:N('acrv'),afastamentoInferiorOitoHoras:C('lt8'),coberturaIntegral:C('coberturaTotal'),veiculoOficial:C('veiculoOficial'),mudancaSede:C('mudancaSede')});
 let h=`<div>Total estimado</div><div class="big">${R(c.total)}</div>`+tbl([['Valor de referência por diária',c.valorDiaria],['Dias com diária integral',0,String(c.diasIntegrais)],['Valor das diárias integrais',c.valorIntegral],['Dias com meia diária (inclui retorno)',0,String(c.meiasDiarias)],['Valor das meias diárias',c.valorMeia],['Acréscimo de embarque/desembarque',c.acrescimo],['Diárias após condições informadas',c.diarias],['Total estimado',c.total]]);
 if(c.motivos.length)h+=`<div class="warn">${c.motivos.map(esc).join('<br>')}</div>`;
 h+='<div class="note">Critério de preenchimento: diária integral para dia com pernoite fora da sede e sem alojamento/pousada gratuita; meia diária para dia sem pernoite, com alojamento/pousada gratuita e no dia do retorno (art. 18, I e II). Se a alimentação for fornecida por OM nas hipóteses do art. 18, § 1º, poderá haver indenização pelo valor da etapa da localidade; esse valor não está calculado aqui. O acréscimo do Anexo IV é por localidade de destino e não é devido quando houver uso de veículo oficial nos trajetos descritos no art. 20, § 2º.</div>';
 h+='<div class="warn">Limitações: a ferramenta não confere datas, afastamento superior a três meses, restituição por retorno antecipado, acompanhamento de autoridade superior ou comparação com eventual ajuda de custo. O art. 19 também veda diárias quando alimentação, pousada e locomoção urbana são todas garantidas; não há diária em afastamento inferior a oito horas, nem em movimentação com mudança de sede e desligamento da OM. Confira o processo e os atos da OM.</div>';show(h)},
gr(){const tipo=$('tipo-evento')?.value||'',vals={...valoresFormulario(['dcmd','dev']),tipoEvento:tipo};const erro=validarParametrosFerramenta('gr',vals);if(erro)return show(erro);const p=P('posto'),c=calcularGratificacaoRepresentacao({soldo:p.soldo,oficialGeneral:p.circ==='OG',comando:C('cmd'),diasComando:N('dcmd'),diasEventuais:N('dev'),tipoEvento:tipo,recebeDiarias:C('diarias-periodo')});
 let h=`<div>Gratificação estimada</div><div class="big">${R(c.total)}</div>`+tbl([['Oficial-general — 10% mensal',c.mensalOG],['Comando, direção ou chefia — 10% proporcional (critério técnico de 30 dias)',c.comandoMensal],['Atividade eventual — 2% por dia',c.eventoBruto],['Atividade eventual considerada após conflito com diárias',c.evento]],['Total estimado',c.total]);
 if(c.recebeDiarias&&c.eventoBruto>0)h+='<div class="warn">O valor eventual foi excluído porque você informou diárias no mesmo período. O art. 8º, II e parágrafo único, do Decreto nº 11.002/2022 determina que a gratificação eventual não seja paga cumulativamente com diárias e que, nessa hipótese, sejam mantidas as diárias.</div>';
 h+='<div class="note">A hipótese eventual selecionada é: '+esc(tipo||'não informada')+'. As hipóteses de viagem de representação, viagem de instrução, emprego operacional e estar às ordens de autoridade estrangeira são inacumuláveis entre si (art. 4º, § 4º). Cada período igual ou superior a 8 horas e inferior a 24 horas conta como um dia. A parcela eventual corresponde a 2% do soldo por dia. O campo de dias é informado pelo usuário; a ferramenta não apura horários nem valida o enquadramento material da missão.</div><div class="warn">A parcela eventual depende de autorização formal da autoridade competente e de publicação em boletim interno. No Exército, o PGE/PBIM isoladamente não é suficiente (EB10-N-08.003, arts. 4º e 5º). A proporcionalização da parcela de comando foi estimada sobre 30 dias; confirme o critério aplicado pelo CPEx no mês de referência. A ferramenta não substitui a autorização nem decide o direito ao pagamento.</div>';show(h)},
alimentacao(){const erro=validarParametrosFerramenta('alimentacao',valoresFormulario(['etapa','n24','n8','n1']));if(erro)return show(erro);const c=calcularAuxilioAlimentacao(N('etapa'),N('n24'),N('n8'),N('n1'));
 show(`<div>Total estimado</div><div class="big">${R(c.total)}</div>`+tbl([[`Serviço de 24 h (${c.servicos24} × 10 etapas)`,c.valor24],[`Expediente acima de 8 h e abaixo de 24 h (${c.servicos8a24} × 5 etapas)`,c.valor8a24],[`Outras situações informadas (${c.outrasSituacoes} × 1 etapa)`,c.valorOutras]],['Total',c.total])+'<div class="warn">Etapa comum: Portaria Normativa nº 19/MD, com valor atualizado pela Portaria GM-MD nº 2.774/2025 (R$ 13,50). Pelo art. 71, § 1º, do Decreto nº 4.307/2002, as hipóteses do art. 67, isoladas ou alternadas, têm limite conjunto de 10 dias por mês. O cálculo não verifica arranchamento, efetivo trabalho, enquadramento individual nem coincidência de datas. Não some situações diferentes no mesmo dia; o art. 75 prevê prevalência da hipótese mais benéfica, ressalvada a situação do art. 70. A categoria “outras situações” é uma estimativa simplificada e deve ser conferida com a OM.</div>')},
ajuda(m){const f=perfil(),dep=C('dep')||totalDependentesPerfilMov()>0||faixasDependentesMov().length>0,sit=$('sit').value,natureza=$('natureza-mov')?.value||'nao-informada';let mult,txt,rem=f.total,duracao=null;
 if(sit==='f'){const ref=D.POSTOS.find(x=>x.id===f.p.ref),o=prm();o.gle=0;o.gr=0;rem=comp(ref,o).total;mult=8;txt='8 × remuneração calculada com o soldo de referência do círculo (Anexo V, situação f; com ou sem dependente)'}
 else if(sit==='b'||sit==='c'){const ini=$('comissao-inicio')?.value||'',fim=$('comissao-fim')?.value||'';if(!ini||!fim)return show('Informe as datas de início e término da comissão, curso ou estágio.');const faixa=calcularFaixaComissao(ini,fim);if(faixa.erro)return show(faixa.erro);duracao={dias:faixa.dias,inicio:ini,fim};if(faixa.faixa!==sit)return show(sit==='c'?'As datas informadas não correspondem à faixa superior a 15 dias e até 3 meses. Confira as datas ou selecione a hipótese correta.':'As datas informadas não correspondem à faixa superior a 3 e até 12 meses. Confira as datas ou selecione a hipótese correta.');mult=sit==='b'?3:2;txt=sit==='b'?'2 × remuneração na ida + 1 × na volta (comissão superior a 3 e até 12 meses, sem desligamento)':'1 × remuneração na ida + 1 × na volta (comissão superior a 15 dias e até 3 meses, sem desligamento)';}
 else{const t={a:[2,'2 × remuneração (movimentação com desligamento da OM)'],d:[4,'4 × remuneração (Localidade Especial Categoria A, com desligamento)']}[sit];mult=t[0];txt=t[1];if(!dep){mult/=2;txt+=', pela metade (sem dependente)'}}
 const totalCalculado=Math.round(rem*mult*100)/100;const impedidaPorInteresseProprio=natureza==='proprio';const tot=impedidaPorInteresseProprio?0:totalCalculado;let h=impedidaPorInteresseProprio?`<div>Ajuda de custo</div><div class="big">Não incluída</div>`:`<div>Ajuda de custo estimada</div><div class="big">${R(tot)}</div>`;h+=tbl([['Remuneração considerada',rem],...(duracao?[['Período informado',0,`${duracao.inicio} a ${duracao.fim} (${duracao.dias} dias)`]]:[]),['Regra/fator de referência',0,txt],['Fator de referência',0,mult+' ×']],['Valor considerado no demonstrativo',tot]);
 const inicio=$('gle-apresentacao')?.value||'',fim=$('gle-partida')?.value||'',categoria=$('gle-categoria')?.value||'',atividade=$('gle-atividade')?.value||'',localidade=$('gle-localidade')?.value||'';
 if(inicio||fim||categoria||atividade||localidade){
   if(!inicio||!fim)h+='<div class="warn">Para apurar os dias de localidade especial, informe as duas datas e horários: apresentação e partida.</div>';
   else{const ap=calcularDiasLocalidadeEspecial(inicio,fim);if(ap.erro)h+=`<div class="warn">${esc(ap.erro)}</div>`;else{const cat=categoria?`Categoria ${categoria}`:'Categoria não informada';const tipo=atividade?atividade.charAt(0).toUpperCase()+atividade.slice(1):'Atividade não informada';h+=`<section class="result-block"><h3>Apuração do período em localidade especial</h3><div class="big">${ap.dias} dia(s) computado(s)</div>`+tbl([['Localidade/guarnição informada',0,localidade||'Não informada'],['Categoria informada',0,cat],['Atividade informada',0,tipo],['Tempo decorrido',0,`${ap.horas.toLocaleString('pt-BR',{maximumFractionDigits:2})} horas`],['Períodos completos de 24 horas',ap.periodosCompletos],['Período residual computado (≥ 8 h e < 24 h)',0,ap.fracaoComputada?'Sim':'Não']],['Dias computados',ap.dias])+`<div class="note">Critério do art. 2º-A, §§ 1º e 5º, da Portaria GM-MD nº 379/2022, incluído pela Portaria GM-MD nº 4.965/2025: período entre apresentação e partida; cada período igual ou superior a oito horas e inferior a vinte e quatro horas é computado como um dia. A classificação da localidade deve ser confirmada na relação normativa vigente.</div><div class="note">A Portaria nº 4.965/2025 prevê possibilidade de pagamento cumulativo com Gratificação de Representação referente à mesma atividade e com diárias e ajuda de custo, conforme o planejamento da comissão, operação, exercício ou destaque. Esta tela não calcula o valor da GLE nem confirma o direito.</div></section>`;}}
 }
 show(renderMovDestinos(tot)+`<details class="mov-calculation-details"><summary>Ver composição da ajuda de custo e outros detalhes</summary>${h}</details>`+renderItensMovimentacao()+renderPassagensMov())},
imc(){const p=N('peso'),a=N('altura')/100;if(!p||!a)return show('Informe peso e altura.');const v=p/(a*a);show(`<div class="big">IMC ${v.toFixed(1)}</div>`+(v<18.5?'Abaixo do peso':v<25?'Peso normal':v<30?'Sobrepeso':v<35?'Obesidade grau I':v<40?'Obesidade grau II':'Obesidade grau III'))},
juros(){const i=N('ini'),m=N('apt'),t=N('taxa')/100,n=Math.round(N('meses')),mt=$('per').value==='a'?Math.pow(1+t,1/12)-1:t;let s=i,tot=i,rows='';
 for(let k=1;k<=n;k++){const r=s*mt;s+=r+m;tot+=m;if(k<=360)rows+=`<tr><td>${k}</td><td>${R(tot)}</td><td>${R(r)}</td><td>${R(s)}</td></tr>`}
 show(`<div>Saldo final</div><div class="big">${R(s)}</div>Aportado: ${R(tot)} · Rendimento: ${R(s-tot)}<div style="overflow-x:auto"><table class="tbl"><tr><th>Mês</th><th>Aportado</th><th>Rend.</th><th>Saldo</th></tr>${rows}</table></div>`)},
pensao(){const tipo=$('tipo-pensao')?.value||'percentual',dados={...valoresFormulario(['base','perc']),tipo,valorFixo:$('valor-fixo')?.value||''};const erro=validarParametrosFerramenta('pensao',dados);if(erro)return show(erro);let valor,linhas;if(tipo==='fixo'){valor=Math.round(N('valor-fixo')*100)/100;linhas=[['Forma de fixação',0,'Valor mensal fixo'],['Valor mensal definido no título judicial',valor]];}else{const b=N('base'),p=N('perc');valor=Math.round(b*p)/100;linhas=[['Forma de fixação',0,'Percentual sobre base informada'],['Base informada',b],['Percentual aplicado',0,p.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%']];}show(`<div>Valor mensal simulado</div><div class="big">${R(valor)}</div>${tbl(linhas,['Valor mensal simulado',valor])}<div class="note">A base e as incidências devem corresponder exatamente à decisão judicial ou ao acordo homologado. Esta simulação não determina quais rubricas integram a base.</div>`)}};
const destinosMov=$('mov-destinos-lista'),addDestinoMov=$('mov-adicionar-destino');
const grupoPassagensMov=$('mov-passagens-grupo');
function atualizarGrupoPassagensMov(){if(grupoPassagensMov)grupoPassagensMov.hidden=!document.querySelector('input[name="mov-item"][value="passagens"]:checked');}
document.querySelectorAll('input[name=\"mov-item\"]').forEach(el=>el.addEventListener('change',()=>{atualizarResumoItensMov();atualizarGrupoPassagensMov();}));atualizarGrupoPassagensMov();
$('mov-limpar')?.addEventListener('click',()=>{const form=document.querySelector('form.mov-calc');if(form)form.reset();atualizarResumoItensMov();atualizarGrupoPassagensMov();if(destinosMov){const rows=[...destinosMov.querySelectorAll('.mov-destino')];rows.slice(1).forEach(row=>row.remove());}const res=$('res');if(res){res.hidden=true;res.innerHTML='';res.classList.remove('res-ready');}atualizarBotoesDestinoMov();});
$('mov-pdf')?.addEventListener('click',()=>{if(!$('res')||$('res').hidden){show('Preencha os dados e clique em Calcular antes de gerar o relatório.');return;}window.print();});
function atualizarBotoesDestinoMov(){if(!destinosMov)return;const rows=[...destinosMov.querySelectorAll('.mov-destino')];rows.forEach(row=>{const b=row.querySelector('.mov-remover');if(b)b.hidden=rows.length===1;});}
if(destinosMov&&addDestinoMov){addDestinoMov.addEventListener('click',()=>{const row=destinosMov.querySelector('.mov-destino')?.cloneNode(true);if(!row)return;row.querySelectorAll('input').forEach(i=>i.value='');const b=row.querySelector('.mov-remover');if(b)b.hidden=false;destinosMov.appendChild(row);atualizarBotoesDestinoMov();row.querySelector('input')?.focus();});destinosMov.addEventListener('click',e=>{const b=e.target.closest('.mov-remover');if(b&&destinosMov.querySelectorAll('.mov-destino').length>1){b.closest('.mov-destino').remove();atualizarBotoesDestinoMov();}});atualizarBotoesDestinoMov();}
const situacaoMov=$('sit'),grupoComissao=$('comissao-periodo');if(situacaoMov&&grupoComissao){const atualizarComissao=()=>{grupoComissao.hidden=!['b','c'].includes(situacaoMov.value);};situacaoMov.addEventListener('change',atualizarComissao);atualizarComissao();}
const tipoPensao=$('tipo-pensao');if(tipoPensao){const atualizarModoPensao=()=>{const fixo=tipoPensao.value==='fixo';$('grupo-base').hidden=fixo;$('grupo-perc').hidden=fixo;$('grupo-fixo').hidden=!fixo;};tipoPensao.addEventListener('change',atualizarModoPensao);atualizarModoPensao();}
function validarMovimentacaoAntesCalcular(form){
 const pendencias=[];const origem=$('mov-origem')?.value.trim();
 if(!origem)pendencias.push('Selecione ou informe a guarnição de origem.');
 const destinos=[...document.querySelectorAll('#mov-destinos-lista .mov-destino')];
 const preenchidos=destinos.filter(row=>row.querySelector('.mov-destino-nome')?.value.trim());
 if(!preenchidos.length)pendencias.push('Adicione pelo menos uma guarnição de destino.');
 const itens=[...document.querySelectorAll('input[name="mov-item"]:checked')].map(el=>el.value);
 if(itens.some(x=>['bagagem','automovel','motocicleta'].includes(x)))preenchidos.forEach((row,i)=>{const km=Number(String(row.querySelector('.mov-destino-km-ida')?.value||'').replace(',','.'));if(!(km>0))pendencias.push(`Estimativa automática ainda indisponível para ${row.querySelector('.mov-destino-nome').value.trim()}. Aguarde ou selecione novamente as guarnições de origem e destino.`)});
 if(itens.includes('passagens')){preenchidos.forEach(row=>{const destino=row.querySelector('.mov-destino-nome')?.value.trim();if(destino&&!distanciaTotalDestinoMov(destino))pendencias.push(`Estimativa automática ainda indisponível para ${destino}. Aguarde ou selecione novamente as guarnições de origem e destino para calcular as passagens.`);});}
 const box=form.querySelector('.mov-validation-help')||(()=>{const el=document.createElement('div');el.className='mov-validation-help';el.setAttribute('role','alert');el.setAttribute('aria-live','assertive');const btn=form.querySelector('button[type="submit"]');btn?.insertAdjacentElement('afterend',el);return el})();
 if(pendencias.length){box.innerHTML='<strong>Para calcular, falta:</strong><ul>'+pendencias.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'center'});return false;}
 box.hidden=true;box.textContent='';return true;
}
document.querySelectorAll('form[data-fn]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(f.classList.contains('mov-calc')&&!validarMovimentacaoAntesCalcular(f))return;FN[f.dataset.fn](f.dataset.modo)}));
const hs=$('habsel');if(hs){hs.addEventListener('change',()=>{$('hab').value=hs.value;atualizarDescontosPreview();});const savedHab=N('hab');if([...hs.options].some(o=>Number(o.value)===savedHab))hs.value=String(savedHab);const habilitacaoAjuda=hs.closest('label')?.querySelector('small');const atualizarHabilitacao=()=>{const recruta=$('posto')?.value==='sd_rec';hs.disabled=recruta;if(recruta){hs.value='0';$('hab').value='0';}if(habilitacaoAjuda)habilitacaoAjuda.textContent=recruta?'Não aplicável ao soldado do efetivo variável; depende dos cursos reconhecidos após o engajamento.':'Se acumular cursos, ajuste o percentual total nas opções avançadas.';};$('posto')?.addEventListener('change',()=>{atualizarHabilitacao();atualizarDescontosPreview();});atualizarHabilitacao();}
// A prévia da etapa 2 precisa acompanhar todo o preenchimento, não apenas a troca do adicional de habilitação.
const CAMPOS_PREVIA = new Set([
 'situacao','posto','mes-ref','habsel','hab','ats','acdm-percentual','co','co-posto','pm','gle',
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
const perfilDeEventoValido=!!$('posto')?.value&&!!$('situacao')?.value;
if(perfilDeEventoValido&&C('ferias-ativo')&&$('cc-evento-ferias'))$('cc-evento-ferias').hidden=false;
if(perfilDeEventoValido&&C('natalino-ativo')&&$('cc-evento-natalino'))$('cc-evento-natalino').hidden=false;
restaurarParametrosSalvos();
Object.keys(PARAM_CONFIG).forEach(k=>{const card=document.querySelector(`[data-param-card="${k}"]`);atualizarResumoParametro(k,card);if(card)card.classList.remove('is-editing');});
['ferias','natalino'].forEach(k=>{const panel=$(`cc-evento-${k}`);if(panel&&!panel.hidden)panel.classList.remove('is-editing');});
atualizarDescontosPreview();
if (typeof window !== 'undefined') {
 window.MilicoAudazCore = Object.freeze({ dados: D, comp, formatarMoeda: R, adicionarLinha: addRow, normalizarLancamentos, somarLancamentos, calcularIRRF, calcularDescontosObrigatorios, calcularAssistenciaPreEscolar, calcularAdicionalFerias, calcularAdicionalNatalino, lerLancamentos: readRows, calcularTotaisSimulacao, calcularMargemConsignavel, validarParametrosFerramenta, calcularAuxilioTransporte, calcularAuxilioAlimentacao, calcularDiarias, calcularGratificacaoRepresentacao, calcularPensaoAlimenticia, calcularDiasLocalidadeEspecial, calcularFaixaComissao, calcularTransporteBagagemMov, calcularTransportePessoalMov });
 window.MilicoAudazPerfil?.refresh?.();
}
// ----- home: busca, filtros e favoritos -----
const tiles=[...document.querySelectorAll('.tile')];
if(tiles.length){let cat='all',q='',favs=[];try{favs=JSON.parse(localStorage.getItem('milico-fav')||'[]')}catch(e){}
 const box=$('favs'),sb=$('busca');
 const normalizarBusca=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const apply=()=>{let n=0;tiles.forEach(t=>{const texto=normalizarBusca((t.dataset.q||'')+' '+(t.textContent||''));const ok=(cat==='all'||t.dataset.cat===cat)&&(!q||texto.includes(q));t.hidden=!ok;if(ok)n++});const nr=$('nores');if(nr){nr.hidden=n>0;nr.textContent=q||cat!=='all'?'Nenhuma ferramenta encontrada com esses filtros. Tente outro termo ou selecione “Todas”.':'Nenhuma ferramenta disponível no momento.'}};
 const paint=()=>{tiles.forEach(t=>{const b=t.querySelector('.fav');if(b)b.setAttribute('aria-pressed',favs.includes(t.dataset.id))});
  if(box){box.innerHTML='';favs.forEach(id=>{const t=document.querySelector('.tile[data-id="'+id+'"]');if(t){const c=t.cloneNode(true);c.hidden=false;box.appendChild(c)}});const fs=$('favsec');if(fs)fs.hidden=!box.children.length}};
 document.addEventListener('click',e=>{const b=e.target.closest('.fav');if(!b)return;const id=b.dataset.id;favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];try{localStorage.setItem('milico-fav',JSON.stringify(favs))}catch(x){}paint()});
 document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{cat=c.dataset.cat;document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));apply()}));
 if(sb)sb.addEventListener('input',()=>{q=normalizarBusca(sb.value);apply()});paint();apply()}
})();
