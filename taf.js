// Lógica do TAF conforme Portaria EME/C Ex nº 850/2022. Dados em taf-dados.js.
const ORDEM=['I','R','B','MB','E'], NOMES={I:'Insuficiente',R:'Regular',B:'Bom',MB:'Muito Bom',E:'Excelente'};
const MIN_SUF={PBD:'R',PAD:'B',PED:'MB'};
const $=id=>document.getElementById(id);
const faixa=(rows,idade)=>rows.find(r=>idade>=r.idade[0]&&idade<=r.idade[1]);
function conceito(r,v){if(v<=r.I)return'I';for(const k of['R','B','MB'])if(v>=r[k][0]&&v<=r[k][1])return k;return v>=r.E?'E':'I'}
function mm(s){const m=String(s).trim().match(/^(\d{1,2}):(\d{2})$/);return m?(+m[1])*60+(+m[2]):null}
function avaliar(rows,idade,valor,padrao,conceitua){
  const r=faixa(rows,idade); if(!r)return{erro:'Sem faixa para esta idade'};
  if(r.sufic!==undefined){return{conceito:null,suf:valor>=r.sufic,meta:r.sufic+(r.unidade||''),so:'suficiência'}}
  const c=conceito(r,valor), min=r[MIN_SUF[padrao]][0];
  return{conceito:conceitua?c:null,suf:valor>=min,meta:min,so:conceitua?'':'suficiência'}}
function calcular(){
  const sexo=$('sexo').value,lin=$('linha').value,idade=Math.round(+$('idade').value),pad=$('padrao').value,
        dados=TAF_DADOS[sexo+'_'+lin],itens=[];
  if(!(idade>=18&&idade<=65))return saida('Informe uma idade entre 18 e 65 anos.');
  const conc=idade<50;
  const prov=[['corrida','Corrida de 12 min (m)','corrida',conc],['flexao','Flexão de braços (rep)','flexao',conc],['abdominal','Abdominal supra (rep)','abdominal',conc]];
  if(lin==='LEMB'){prov.push(['barra','Barra fixa'+(sexo==='F'&&idade>=40?' (sustentação, s)':' (rep)'),'barra',idade<40])}
  for(const [id,nome,key,c] of prov){
    const el=$('v_'+id); if(!el||el.value==='')continue;
    const res=avaliar(dados[key],idade,+el.value,pad,c); itens.push({nome,...res,valor:el.value})}
  if(lin==='LEMB'&&$('ppm_exige').checked&&$('v_ppm').value!==''&&pad!=='PBD'){
    const r=faixa(dados.ppm,idade),t=mm($('v_ppm').value);
    if(!r)itens.push({nome:'Pista de obstáculos',erro:'A tabela do PPM vai até 41 anos'});
    else if(t===null)itens.push({nome:'Pista de obstáculos',erro:'Use o formato mm:ss'});
    else itens.push({nome:'Pista de obstáculos (PPM)',conceito:null,suf:t<=r[pad],meta:'até '+String(Math.floor(r[pad]/60)).padStart(2,'0')+':'+String(r[pad]%60).padStart(2,'0'),so:'suficiência',valor:$('v_ppm').value})}
  if(!itens.length)return saida('Preencha ao menos uma prova.');
  const erros=itens.filter(i=>i.erro);
  const ok=itens.filter(i=>!i.erro);
  const conceitos=ok.map(i=>i.conceito).filter(Boolean);
  const global=conceitos.length?ORDEM[Math.min(...conceitos.map(c=>ORDEM.indexOf(c)))]:null;
  const suf=ok.every(i=>i.suf);
  let h='<table><tr><th>Prova</th><th>Resultado</th><th>Mínimo ('+pad+')</th><th>Conceito</th><th>Suficiência</th></tr>';
  for(const i of itens)h+=i.erro?`<tr><td>${i.nome}</td><td colspan="4">${i.erro}</td></tr>`:`<tr><td>${i.nome}</td><td>${i.valor}</td><td>${i.meta}</td><td>${i.conceito?NOMES[i.conceito]:'—'}</td><td>${i.suf?'Suficiente':'Não suficiente'}</td></tr>`;
  h+='</table><p><b>Suficiência global ('+pad+'): '+(suf?'Suficiente':'Não suficiente')+'</b>'+(global?'<br><b>Conceito global (menor conceito): '+NOMES[global]+'</b>':'')+'</p>';
  if(!conc)h+='<p>A partir de 50 anos a avaliação é só de suficiência (item 3.2.4 da Portaria).</p>';
  saida(h)}
function saida(h){const r=$('res');r.hidden=false;r.innerHTML=h}
function ajustaCampos(){const l=$('linha').value==='LEMB';document.querySelectorAll('.so-lemb').forEach(e=>e.hidden=!l)}
document.addEventListener('DOMContentLoaded',()=>{ajustaCampos();$('linha').addEventListener('change',ajustaCampos);$('taf').addEventListener('submit',e=>{e.preventDefault();calcular()})});
