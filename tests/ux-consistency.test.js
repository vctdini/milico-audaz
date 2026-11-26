'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const audited = ['auxilio-transporte.html','auxilio-alimentacao.html','diarias.html','gratificacao-representacao.html','pensao-alimenticia.html'];

test('as cinco ferramentas mantêm resultado anunciado por região aria-live', () => {
  for (const page of audited) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(html, /id="res" class="res" hidden aria-live="polite"/, `${page}: região de resultado acessível ausente`);
  }
});

test('as cinco ferramentas mantêm formulário calc com botão submit identificado', () => {
  for (const page of audited) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(html, /<form class="calc" data-fn="[^"]+"/, `${page}: formulário sem identificador de ferramenta`);
    assert.match(html, /<button class="btn" type="submit"/, `${page}: botão de cálculo inconsistente`);
  }
});

test('os cinco resultados usam o mesmo contêiner e ação de edição definidos pelo núcleo', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(app, /class="res-title"/);
  assert.match(app, /data-result-edit/);
  assert.match(app, /Alterar dados e simular novamente/);
});

test('memória de cálculo da pensão usa tabela padronizada com total', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const start = app.indexOf('pensao(){');
  const fn = app.slice(start);
  assert.ok(start >= 0);
  assert.match(fn, /\$\{tbl\(linhas,\['Valor mensal simulado',valor\]\)\}/);
  assert.match(fn, /Valor mensal definido no título judicial/);
});

test('camada visual da etapa 37 padroniza ajuda, botão e memória sem alterar largura do contracheque', () => {
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(css, /form\.calc\[data-fn\] > label > small/);
  assert.match(css, /form\.calc\[data-fn\] > button\[type="submit"\]/);
  assert.match(css, /\.res-ready \.note/);
  assert.match(css, /body\.pagina-contracheque main\.page\{max-width:1280px/);
});
