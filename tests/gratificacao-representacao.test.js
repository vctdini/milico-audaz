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

test('gratificação mensal de oficial-general corresponde a 10% do soldo',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,oficialGeneral:true});
  assert.equal(r.mensalOG,1000); assert.equal(r.total,1000);
});
test('gratificação de comando é proporcional aos dias informados',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,comando:true,diasComando:15});
  assert.equal(r.comandoMensal,500);
});
test('atividade eventual corresponde a 2% do soldo por dia',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,diasEventuais:3,tipoEvento:'viagem-instrucao'});
  assert.equal(r.eventoBruto,600); assert.equal(r.total,600);
});
test('atividade eventual não é paga cumulativamente com diárias',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,diasEventuais:3,tipoEvento:'emprego-operacional',recebeDiarias:true});
  assert.equal(r.eventoBruto,600); assert.equal(r.evento,0); assert.equal(r.total,0);
});
test('parcela mensal de comando permanece quando a eventual é excluída por diárias',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:10000,comando:true,diasComando:30,diasEventuais:2,tipoEvento:'viagem-representacao',recebeDiarias:true});
  assert.equal(r.comandoMensal,1000); assert.equal(r.evento,0); assert.equal(r.total,1000);
});
test('valores negativos não geram gratificação',()=>{
  const r=core.calcularGratificacaoRepresentacao({soldo:-10000,comando:true,diasComando:-5,diasEventuais:-2});
  assert.equal(r.total,0);
});
test('dias de atividade eventual são limitados a inteiros não negativos na validação',()=>{
  assert.match(core.validarParametrosFerramenta('gr',{dcmd:'0',dev:'1.5',tipoEvento:'viagem-instrucao'}),/número inteiro/);
});
test('atividade eventual exige hipótese selecionada e hipótese selecionada exige dias',()=>{
  assert.match(core.validarParametrosFerramenta('gr',{dcmd:'0',dev:'1',tipoEvento:''}),/Selecione a hipótese/);
  assert.match(core.validarParametrosFerramenta('gr',{dcmd:'0',dev:'0',tipoEvento:'viagem-instrucao'}),/Informe ao menos 1 dia/);
});
test('formulário apresenta hipóteses legais, conflito com diárias e regra de 8h a menos de 24h',()=>{
  const html=fs.readFileSync(path.join(root,'gratificacao-representacao.html'),'utf8');
  for(const id of ['tipo-evento','dev','diarias-periodo']) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/inferior a 24 horas/);
  assert.match(html,/mutuamente exclusivas/);
});
test('relatório documenta autorização formal e divisor de 30 dias como pendência',()=>{
  const doc=fs.readFileSync(path.join(root,'docs','ETAPA34_AUDITORIA_GRATIFICACAO_REPRESENTACAO.md'),'utf8');
  assert.match(doc,/EB10-N-08\.003/);
  assert.match(doc,/confirmado com o CPEx/);
});
