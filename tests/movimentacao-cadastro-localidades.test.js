'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const js=fs.readFileSync(path.join(root,'js/localidades-gle.js'),'utf8');
function load(){
 const options=[]; const handlers={};
 const input={value:'',addEventListener:(n,fn)=>handlers['input:'+n]=fn};
 const status={textContent:''}; const categoria={value:'',};
 const list={appendChild:o=>options.push(o)};
 const document={getElementById:id=>({'gle-localidade':input,'gle-localidades-list':list,'gle-localidade-status':status,'gle-categoria':categoria}[id]||null),createElement:()=>({value:''})};
 const window={}; vm.runInNewContext(js,{document,window});
 return {api:window.MilicoAudazLocalidadesGLE,input,status,categoria,options,handlers};
}
test('tela oferece busca de localidade e explica o limite da classificação por lista',()=>{
 assert.match(html,/id="gle-localidade"/); assert.match(html,/id="gle-localidades-list"/);
 assert.match(html,/A classificação também depende das linhas geográficas dos arts\. 3º e 4º/);
 assert.match(html,/js\/localidades-gle\.js/);
});
test('cadastro contém localidades das Tabelas I, II e III',()=>{
 const {api}=load();
 assert.ok(api.registros.some(r=>r.tabela==='I'&&r.categoria==='A'));
 assert.ok(api.registros.some(r=>r.tabela==='II'&&r.categoria==='B'));
 assert.ok(api.registros.some(r=>r.tabela==='III'&&r.categoria==='N'));
});
test('pesquisa normaliza acentos e identifica Vicente de Carvalho como categoria B',()=>{
 const {api}=load();
 const r=api.consultar('Vicente de Carvalho (Distrito de Guarujá)');
 assert.equal(r.length,1); assert.equal(r[0].categoria,'B');
 assert.equal(api.normalizar('São Roque'),api.normalizar('Sao Roque'));
});
test('Aquidauana é sinalizada como conflito entre tabelas, sem classificação automática',()=>{
 const {api}=load(); const r=api.consultar('Aquidauana');
 assert.ok(r.some(x=>x.categoria==='A'&&x.tabela==='I'));
 assert.ok(r.some(x=>x.categoria==='B'&&x.tabela==='II'));
 assert.equal(new Set(r.map(x=>x.categoria)).size,2);
});
test('localidade fora das tabelas não é presumida como não especial',()=>{
 const {api}=load(); assert.equal(api.consultar('Praia Grande').length,0);
});
