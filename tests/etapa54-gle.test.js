const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

test('cadastro auxiliar contempla Jaguari/RS na Categoria B da Tabela II', () => {
  const source = fs.readFileSync(path.join(root, 'js/localidades-gle.js'), 'utf8');
  assert.match(source, /'Jaguari'/);
});

test('interface informa percentuais legais da GLE e a incidência sobre o soldo', () => {
  const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
  assert.match(html, /Categoria A = 20% e Categoria B = 10%/);
  assert.match(html, /incidentes sobre o soldo/);
});

test('motor remuneratório inclui a GLE informada na base usada pela ajuda de custo', () => {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(source, /base:s\+am\+hab\+dd\+co\+pm\+gle/);
  assert.match(source, /Remuneração considerada/);
  assert.match(source, /Gratificação de Localidade Especial informada/);
});

test('cadastro mantém alerta para localidades com classificação conflitante', () => {
  const source = fs.readFileSync(path.join(root, 'js/localidades-gle.js'), 'utf8');
  assert.match(source, /A localidade aparece em mais de uma tabela/);
});
