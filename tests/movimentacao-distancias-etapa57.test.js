const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'js/movimentacao-distancias.js'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('a página carrega o módulo de distância após o motor principal', () => {
  assert.match(html, /app\.js" defer><\/script><script src="js\/movimentacao-distancias\.js" defer>/);
});
test('a consulta automática usa geocodificação e rota rodoviária', () => {
  assert.match(js, /nominatim\.openstreetmap\.org/);
  assert.match(js, /router\.project-osrm\.org\/route\/v1\/driving/);
  assert.match(js, /Calcular distância automaticamente/);
});
test('o resultado automático separa ida e ida-e-volta e permite edição manual', () => {
  assert.match(js, /mov-destino-km-ida/);
  assert.match(js, /mov-destino-km/);
  assert.match(html, /class="mov-destino-km-ida" type="number"/);
  assert.match(html, /class="mov-destino-km" type="number"/);
});
test('os campos têm largura responsiva e quebram texto sem sobreposição', () => {
  assert.match(css, /grid-template-columns:minmax\(230px,2fr\)/);
  assert.match(css, /overflow-wrap:anywhere/);
  assert.match(css, /@media\(max-width:650px\)/);
});
test('service worker inclui o novo módulo e invalida o cache anterior', () => {
  assert.match(sw, /milico-20261126-etapa60/);
  assert.match(sw, /js\/movimentacao-distancias\.js/);
});
