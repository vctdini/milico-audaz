'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
function loadCore(){
  const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
  const window={};
  vm.runInNewContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),{document,window,console,Number,Math});
  return window.MilicoAudazCore;
}
const core=loadCore();
const money=v=>Math.round((v+Number.EPSILON)*100)/100;

test('as cinco calculadoras auditadas expõem motores de cálculo independentes',()=>{
  for(const name of ['calcularAuxilioTransporte','calcularAuxilioAlimentacao','calcularDiarias','calcularGratificacaoRepresentacao','calcularPensaoAlimenticia']) assert.equal(typeof core[name],'function',`${name} deve estar disponível`);
});

test('auxílio-transporte mantém resultado não negativo e memória coerente em cenário de tarifa zero',()=>{
  const r=core.calcularAuxilioTransporte(0,0,22,5209);
  assert.equal(r.despesaMensal,0);
  assert.equal(r.estimativa,0);
  assert.ok(Number.isFinite(r.cotaParte));
});

test('auxílio-alimentação soma parcelas arredondadas sem ultrapassar o limite combinado do art. 67',()=>{
  const r=core.calcularAuxilioAlimentacao(13.5,4,6,0);
  assert.equal(r.diasArt67,10);
  assert.equal(r.total,money(r.valor24+r.valor8a24+r.valorOutras));
});

test('diárias mantém soma integral + meia diária + acréscimo igual ao total apresentado',()=>{
  const r=core.calcularDiarias({valor:425,diasIntegrais:2,meiasDiarias:1,localidades:1,valorAcrescimo:95});
  assert.equal(r.total,money(r.valorIntegral+r.valorMeia+r.acrescimo));
  assert.ok(r.total>=0);
});

test('gratificação eventual e diárias não são somadas no mesmo período',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,diasEventuais:2,tipoEvento:'viagem-instrucao',recebeDiarias:true});
  assert.equal(r.eventoBruto,400);
  assert.equal(r.evento,0);
  assert.equal(r.total,0);
});

test('pensão alimentícia percentual e fixa entregam valores monetários em centavos',()=>{
  const percentual=core.calcularPensaoAlimenticia({tipo:'percentual',base:2500.55,percentual:12.5});
  const fixa=core.calcularPensaoAlimenticia({tipo:'fixo',valorFixo:'1234,567'});
  assert.equal(percentual.valor,money(2500.55*.125));
  assert.equal(fixa.valor,1234.57);
});

test('as validações da interface continuam rejeitando entradas negativas nas cinco ferramentas',()=>{
  const v=core.validarParametrosFerramenta;
  assert.match(v('transporte',{ida:'-1',volta:'1',dias:'22',soldoc:'5209'}),/mínimo/);
  assert.match(v('alimentacao',{etapa:'13,50',n24:'-1',n8:'0',n1:'0'}),/mínimo/);
  assert.match(v('diarias',{diasIntegrais:'-1',meiasDiarias:'0',acr:'0',acrv:'95'}),/mínimo/);
  assert.match(v('gr',{dcmd:'-1',dev:'0',tipoEvento:''}),/mínimo/);
  assert.match(v('pensao',{tipo:'percentual',base:'1000',perc:'-1'}),/mínimo/);
});
