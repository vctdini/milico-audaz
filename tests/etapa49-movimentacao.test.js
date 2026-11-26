'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

test('Etapa 49: atalhos da movimentação apontam para seções existentes', () => {
  for (const id of ['mov-dados-basicos', 'comparacao-destinos', 'mov-itens', 'mov-passagens-grupo']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
    assert.match(html, new RegExp(`href=["']#${id}["']`));
  }
});

test('Etapa 49: navegação e formulário possuem tratamento responsivo e foco visível', () => {
  assert.match(css, /\.mov-calc \.mov-atalhos/);
  assert.match(css, /@media\(max-width:600px\).*?mov-atalhos/s);
  assert.match(css, /:focus-visible/);
});

test('Etapa 49: acumulador de passagens por destino é inicializado localmente', () => {
  assert.match(js, /let passagensAlocadas\s*=\s*0\s*;/);
  assert.match(js, /passagensAlocadas\s*\+=\s*passVal/);
});
