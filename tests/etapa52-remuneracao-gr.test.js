'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
function core(){const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};const window={};vm.runInNewContext(app,{document,window,console,Number,Math,Date});return window.MilicoAudazCore;}
const c=core();
test('GR mensal de comando integra o total remuneratório quando informada',()=>{
 const p=c.dados.POSTOS.find(x=>x.id==='sgt2');
 const comum={qe:false,smi:false,hab:0,ats:0,co:0,coPosto:'sgt2',pm:0,gle:0,gr:0};
 const sem=c.comp(p,comum),com=c.comp(p,{...comum,gr:10});
 assert.equal(com.gr,Math.round(p.soldo*.10*100)/100);
 assert.equal(Math.round((com.total-sem.total)*100)/100,Math.round(p.soldo*.10*100)/100);
});
test('GR não é adicionada automaticamente quando não informada',()=>{
 const p=c.dados.POSTOS.find(x=>x.id==='sgt2');
 const f=c.comp(p,{qe:false,smi:false,hab:0,ats:0,co:0,coPosto:'sgt2',pm:0,gle:0,gr:0});
 assert.equal(f.gr,0);
});
test('a interface identifica a GR como mensal e diferencia gratificações eventuais',()=>{
 assert.match(html,/Recebo Gratificação de Representação mensal/);
 assert.match(html,/Não marque por gratificações eventuais/);
});

test('a GR declarada é aplicada somente na calculadora de movimentação',()=>{
 assert.match(app,/gr:document\.querySelector\('\.mov-calc'\)&&C\('cmd'\)\?10:0/);
 assert.match(app,/function perfil\(\)\{const p=P\('posto'\),o=prm\(\);return comp\(p,o\)\}/);
});
