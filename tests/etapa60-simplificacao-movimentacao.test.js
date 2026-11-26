const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ui = fs.readFileSync(path.join(root, 'js/movimentacao-ui.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('Etapa 60 remove o painel expansível de dados complementares', () => {
  assert.doesNotMatch(ui, /Dados complementares da movimentação/);
  assert.doesNotMatch(ui, /className = 'mov-advanced'/);
  assert.match(ui, /mov-dados-perfil-interno/);
});

test('Etapa 60 mantém Situação e Natureza como campos visíveis principais', () => {
  assert.match(html, /id="sit"/);
  assert.match(html, /id="natureza-mov"/);
  assert.match(ui, /querySelector\?\.\('#sit'\)/);
  assert.match(ui, /querySelector\?\.\('#natureza-mov'\)/);
});

test('Etapa 60 não exibe a opção de serviço militar inicial na tela de movimentação', () => {
  assert.match(ui, /mov-dados-perfil-interno/);
  assert.match(ui, /technical\.hidden = true/);
  assert.match(ui, /aria-hidden/);
});

test('Etapa 60 atualiza cache para entregar a nova interface', () => {
  assert.match(sw, /milico-20261126-etapa60/);
});
