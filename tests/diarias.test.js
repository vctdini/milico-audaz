'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'diarias.html'), 'utf8');
function loadCore(){
  const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
  const window={};
  vm.runInNewContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),{document,window,console,Number,Math});
  return window.MilicoAudazCore;
}
const core=loadCore();

test('tabela legal de diárias mantém os valores do Anexo III vigente desde 2025',()=>{
  assert.deepEqual(JSON.parse(JSON.stringify(core.dados.DIAR[4])),['Subtenentes, Sargentos, Aspirantes e Cadetes',425,380,335]);
});
test('simula dias integrais e meias diárias separadamente',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:2,meiasDiarias:1,localidades:1,valorAcrescimo:95});
  assert.equal(r.valorIntegral,850);
  assert.equal(r.valorMeia,212.5);
  assert.equal(r.diarias,1062.5);
  assert.equal(r.acrescimo,95);
  assert.equal(r.total,1157.5);
});
test('não concede diária em afastamento inferior a oito horas',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:1,meiasDiarias:0,localidades:1,valorAcrescimo:95,afastamentoInferiorOitoHoras:true});
  assert.equal(r.diarias,0);assert.equal(r.acrescimo,0);assert.equal(r.total,0);
});
test('não concede diária quando alimentação, pousada e locomoção urbana são garantidas',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:2,meiasDiarias:1,localidades:1,valorAcrescimo:95,coberturaIntegral:true});
  assert.equal(r.total,0);
});
test('não concede diária em movimentação com mudança de sede e desligamento',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:2,meiasDiarias:1,localidades:1,valorAcrescimo:95,mudancaSede:true});
  assert.equal(r.total,0);
});
test('uso de veículo oficial afasta somente o acréscimo de embarque/desembarque',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:1,meiasDiarias:1,localidades:2,valorAcrescimo:95,veiculoOficial:true});
  assert.equal(r.diarias,637.5);assert.equal(r.acrescimo,0);assert.equal(r.total,637.5);
});
test('valores negativos e dias fracionados são rejeitados pela validação da ferramenta',()=>{
  assert.match(core.validarParametrosFerramenta('diarias',{diasIntegrais:'-1',meiasDiarias:'0',acr:'0',acrv:'95'}),/mínimo/);
  assert.match(core.validarParametrosFerramenta('diarias',{diasIntegrais:'1.5',meiasDiarias:'0',acr:'0',acrv:'95'}),/inteiro/);
});
test('soma de dias integrais e meias diárias não pode ultrapassar o limite técnico de 366',()=>{
  assert.match(core.validarParametrosFerramenta('diarias',{diasIntegrais:'200',meiasDiarias:'167',acr:'0',acrv:'95'}),/366/);
});
test('formulário explica os critérios legais e não desconta auxílio-transporte automaticamente',()=>{
  assert.match(html,/id="diasIntegrais"/);assert.match(html,/id="meiasDiarias"/);
  assert.match(html,/id="coberturaTotal"/);assert.match(html,/id="veiculoOficial"/);
  assert.doesNotMatch(html,/Auxílio-transporte diário já recebido/);
  assert.match(html,/art\. 20, § 2º/);
});
test('resultado não repete a afirmação incorreta de vedação automática com gratificação de representação',()=>{
  const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
  assert.doesNotMatch(app,/Não acumula com gratificação de representação/);
});

test('não calcula acréscimo de embarque/desembarque sem diária devida na simulação',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:0,meiasDiarias:0,localidades:1,valorAcrescimo:95});
  assert.equal(r.diarias,0);assert.equal(r.acrescimo,0);assert.equal(r.total,0);
});
