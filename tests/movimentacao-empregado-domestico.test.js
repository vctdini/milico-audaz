const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('movimentacao.html','utf8');
const app=fs.readFileSync('app.js','utf8');
test('empregado doméstico: opção é simples e sem formulário de comprovação',()=>{assert.match(html,/value="empregado-domestico"/);assert.doesNotMatch(html,/mov-domestico-grupo|mov-domestico-vinculo|mov-domestico-registro|mov-domestico-identidade/);});
test('empregado doméstico: a marcação é o único controle de inclusão no cálculo',()=>{assert.match(app,/row\.tipo==='domestico'&&!domesticoIncluido\)continue/);});
test('empregado doméstico: tarifa só entra quando a opção estiver marcada',()=>{assert.match(app,/const domesticoIncluido=!!document\.querySelector/);assert.match(html,/value="domestico">Empregado doméstico/);});
test('memória de cálculo lista somente os itens selecionados',()=>{assert.match(app,/Itens incluídos nesta movimentação/);assert.match(app,/Somente os itens marcados são considerados nos cálculos/);});
