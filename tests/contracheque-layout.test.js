const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('layout do contracheque centraliza e amplia formulário, resumo e resultado', () => {
  assert.match(css, /body\.pagina-contracheque main\.page\s*\{[^}]*width:min\(100% - 2rem, 1360px\)/s);
  assert.match(css, /body\.pagina-contracheque form\.calc\.cc-form/);
  assert.match(css, /body\.pagina-contracheque \.res\.res-contracheque/);
});

test('rubricas e tabelas alinham valores à direita sem ultrapassar os cartões', () => {
  assert.match(css, /\.cc-preview-row>b\s*\{[^}]*text-align:right/s);
  assert.match(css, /\.cc-report \.tbl td:last-child\s*\{[^}]*text-align:right/s);
  assert.match(css, /\.cc-add-rubrica\s*\{[^}]*max-width:100%/s);
});

test('layout do contracheque mantém adaptação para telas menores', () => {
  assert.match(css, /@media\(max-width:760px\)[\s\S]*?\.cc-default-grid\{grid-template-columns:minmax\(0,1fr\)\}/);
});

test('cache do aplicativo identifica a etapa 56', () => {
  assert.match(sw, /milico-20261126-etapa60/);
});
