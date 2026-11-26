'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
function loadCore(){
  const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
  const window={};
  vm.runInNewContext(app,{document,window,console,Number,Math,Date});
  return window.MilicoAudazCore;
}
const core=loadCore();

test('conta intervalo residual de 8 horas como um dia',()=>{
  const r=core.calcularDiasLocalidadeEspecial('2026-01-01T08:00','2026-01-01T16:00');
  assert.equal(r.dias,1); assert.equal(r.fracaoComputada,true);
});
test('não conta período residual inferior a 8 horas',()=>{
  const r=core.calcularDiasLocalidadeEspecial('2026-01-01T08:00','2026-01-01T15:59');
  assert.equal(r.dias,0); assert.equal(r.fracaoComputada,false);
});
test('conta 24 horas completas como um dia',()=>{
  const r=core.calcularDiasLocalidadeEspecial('2026-01-01T08:00','2026-01-02T08:00');
  assert.equal(r.dias,1); assert.equal(r.periodosCompletos,1);
});
test('soma dias completos e período residual de pelo menos 8 horas',()=>{
  const r=core.calcularDiasLocalidadeEspecial('2026-01-01T08:00','2026-01-02T16:00');
  assert.equal(r.dias,2); assert.equal(r.periodosCompletos,1); assert.equal(r.fracaoComputada,true);
});
test('não arredonda período de 24 horas mais 7h59 para o dia seguinte',()=>{
  const r=core.calcularDiasLocalidadeEspecial('2026-01-01T08:00','2026-01-02T15:59');
  assert.equal(r.dias,1);
});
test('rejeita datas inválidas e partida anterior ou igual à apresentação',()=>{
  assert.match(core.calcularDiasLocalidadeEspecial('x','2026-01-02T08:00').erro,/válidas/);
  assert.match(core.calcularDiasLocalidadeEspecial('2026-01-02T08:00','2026-01-02T08:00').erro,/depois/);
  assert.match(core.calcularDiasLocalidadeEspecial('2026-01-02T08:00','2026-01-01T08:00').erro,/depois/);
});
test('formulário distingue categoria, tipo de atividade e período entre apresentação e partida',()=>{
  assert.match(html,/id="gle-categoria"/); assert.match(html,/id="gle-atividade"/);
  assert.match(html,/id="gle-apresentacao"/); assert.match(html,/id="gle-partida"/);
  assert.match(html,/Portaria GM-MD nº 4\.965\/2025/);
});
test('a interface não afirma que as portarias 379 e 4.965 fixam os percentuais da GLE',()=>{
  assert.match(html,/Tabela I do Anexo III da MP nº 2\.215-10\/2001/);
  assert.match(html,/Categoria A = 20% e Categoria B = 10%/);
});
