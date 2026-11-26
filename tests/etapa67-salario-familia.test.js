'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'..','contracheque.html'),'utf8');
const sw=fs.readFileSync(path.join(__dirname,'..','sw.js'),'utf8');
test('Etapa 67: quantidade de dependentes para salário-família gera crédito de R$ 0,16 por dependente',()=>{
 assert.match(app,/Math\.round\(quantidadeSalarioFamilia\*0\.16\*100\)\/100/);
 assert.match(app,/Salário-família.*R\$ 0,16/);
});
test('Etapa 67: salário-família integra total de receitas e demonstrativo',()=>{
 assert.match(app,/salarioFamilia:creditoSalarioFamilia/);
 assert.match(app,/\['Salário-família \('\+quantidadeSalarioFamilia/);
 assert.match(app,/Number\(op\.salarioFamilia\)/);
});
test('Etapa 67: usa o campo de dependentes já existente, sem duplicar cadastro',()=>{
 assert.match(html,/id="dep-salario-familia"/);
 assert.equal((html.match(/id="dep-salario-familia"/g)||[]).length,1);
});
test('Etapa 67: cache atualizado',()=>assert.match(sw,/etapa67/));
