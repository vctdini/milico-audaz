const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mov = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const dist = fs.readFileSync(path.join(root, 'js/movimentacao-distancias.js'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('movimentação solicita apenas a distância rodoviária de ida', () => {
  assert.match(mov, /class="mov-destino-km-ida"/);
  assert.doesNotMatch(mov, /Distância total \(ida e volta\)/i);
  assert.doesNotMatch(mov, /class="mov-destino-km"/);
  assert.match(dist, /Estimativa de ida:/);
  assert.doesNotMatch(dist, /kmTotal|ida e volta/);
});

test('dependentes são informados uma única vez e reaproveitados nas passagens', () => {
  assert.equal((mov.match(/id="mov-dependentes-adultos"/g) || []).length, 1);
  assert.equal((mov.match(/id="mov-dependentes-menores2"/g) || []).length, 1);
  assert.equal((mov.match(/id="mov-dependentes-maiores2"/g) || []).length, 1);
  assert.match(mov, /quantidades de dependentes já informadas/);
  assert.match(app, /sincronizarDependentesMov/);
});

test('cache offline foi versionado para a estrutura atualizada', () => {
  assert.match(sw, /etapa77-tema-global/);
});
