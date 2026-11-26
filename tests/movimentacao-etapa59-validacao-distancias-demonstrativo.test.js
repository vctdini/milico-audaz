const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const dist = fs.readFileSync(path.join(root, 'js/movimentacao-distancias.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('campos de distância aceitam valores decimais para posterior arredondamento', () => {
  assert.match(html, /class="mov-destino-km" type="number"[^>]*step="any"/);
  assert.match(html, /class="mov-destino-km-ida" type="number"[^>]*step="any"/);
  assert.match(dist, /Math\.round\(value\)/);
});
test('distância automática arredonda o trecho e o total para quilômetros inteiros', () => {
  assert.match(dist, /Math\.round\(data\.routes\[0\]\.distance \/ 1000\)/);
  assert.match(dist, /Math\.round\(kmIda \* 2\)/);
});
test('motor normaliza distâncias decimais antes de aplicar os cálculos', () => {
  assert.match(app, /const km=Number\.isFinite\(raw\)\?Math\.round\(raw\):NaN/);
  assert.match(app, /kmIda:Number\.isFinite\(ida\)\?Math\.round\(ida\):NaN/);
});
test('calcular exibe lista específica de pendências para origem, destino, passageiros e distâncias', () => {
  assert.match(app, /validarMovimentacaoAntesCalcular/);
  assert.match(app, /Selecione ou informe a guarnição de origem/);
  assert.match(app, /Adicione pelo menos uma guarnição de destino/);
  assert.match(app, /selecione a categoria/);
  assert.match(app, /calcule ou informe a distância de ida e volta/);
});
test('demonstrativo financeiro usa contêiner rolável e valores sem quebra interna', () => {
  assert.match(app, /mov-financial-table-wrap/);
  assert.match(app, /mov-financial-table/);
  assert.match(css, /white-space:nowrap/);
  assert.match(css, /font-variant-numeric:tabular-nums/);
  assert.match(css, /overflow-x:auto/);
});
test('service worker invalida cache para distribuir a etapa 59', () => {
  assert.match(sw, /milico-20261126-etapa60/);
});
