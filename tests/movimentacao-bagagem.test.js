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
test('Anexo I: 2º sargento tem limite de 45 m³ para móveis e utensílios',()=>{const r=c.calcularTransporteBagagemMov(50,'sgt2',['bagagem']);assert.equal(r.cubagemMoveis,45);assert.equal(r.totalM3,45);});
test('Anexo I: automóvel e motocicleta acrescentam 12 m³ e 3 m³ quando selecionados',()=>{const r=c.calcularTransporteBagagemMov(50,'sgt2',['automovel','motocicleta']);assert.equal(r.cubagemAutomovel,12);assert.equal(r.cubagemMotocicleta,3);assert.equal(r.totalM3,15);});
test('Anexo II: aplica tarifa por faixa de distância e calcula valor em reais',()=>{const r=c.calcularTransporteBagagemMov(50,'sgt2',['bagagem']);assert.equal(r.tarifa,29.64);assert.equal(r.valor,1333.80);const prox=c.calcularTransporteBagagemMov(51,'sgt2',['bagagem']);assert.equal(prox.tarifa,32.50);assert.equal(prox.valor,1462.50);});
test('Anexo I: tabela de cubagem varia conforme posto ou graduação',()=>{assert.equal(c.calcularTransporteBagagemMov(100,'cel',['bagagem']).totalM3,55);assert.equal(c.calcularTransporteBagagemMov(100,'subten',['bagagem']).totalM3,50);assert.equal(c.calcularTransporteBagagemMov(100,'sd_rec',['bagagem']).totalM3,35);});
test('não calcula quando distância rodoviária de ida não foi informada',()=>{assert.match(c.calcularTransporteBagagemMov('', 'sgt2',['bagagem']).erro,/distância rodoviária/);assert.match(c.calcularTransporteBagagemMov(-10,'sgt2',['bagagem']).erro,/distância rodoviária/);});
test('nenhum item marcado não cria cubagem ou valor indenizatório',()=>{const r=c.calcularTransporteBagagemMov(500,'sgt2',[]);assert.equal(r.totalM3,0);assert.equal(r.valor,0);});
test('interface separa distância de ida para bagagem da distância total ida e volta',()=>{assert.match(html,/mov-destino-km-ida/);assert.match(html,/Distância rodoviária de ida/);assert.match(html,/Distância total \(ida e volta\)/);});
test('resultado mantém natureza declaratória e ressalva que estimativa não confirma concessão',()=>{assert.match(app,/As opções são declarações do usuário/);assert.match(app,/não confirma autorização/);});
