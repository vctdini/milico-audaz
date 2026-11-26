const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'tema.js'), 'utf8');

test('todas as páginas HTML carregam o tema global', () => {
  assert.ok(htmlFiles.length >= 15);
  for (const file of htmlFiles) {
    assert.match(fs.readFileSync(path.join(root, file), 'utf8'), /<script src="tema\.js"><\/script>/, file);
  }
});

test('controle global oferece automático, claro e escuro', () => {
  for (const value of ['system', 'light', 'dark']) assert.ok(js.includes("['" + value + "'"));
  assert.match(js, /preferencia-tema/);
  assert.match(js, /localStorage\.setItem\(KEY,preference\)/);
});

test('modo automático acompanha a preferência do sistema operacional', () => {
  assert.match(js, /prefers-color-scheme: dark/);
  assert.match(js, /preference==='system'&&media&&media\.matches/);
  assert.match(js, /if\(preference==='system'\)apply\(\)/);
});

test('filtros da página inicial quebram linha e permanecem dentro do painel', () => {
  assert.match(css, /\.pull>\.chips\s*\{[^}]*flex-wrap:\s*wrap/s);
  assert.match(css, /\.pull>\.chips\s*\{[^}]*overflow:\s*visible/s);
  assert.match(css, /\.pull>\.chips \.chip\s*\{[^}]*white-space:\s*normal/s);
  assert.match(css, /@media\(max-width:640px\)[\s\S]*?\.pull>\.chips \.chip:first-child/);
});

test('tema escuro altera tokens compartilhados e superfícies das ferramentas', () => {
  assert.match(css, /html\[data-theme="dark"\]\s*\{[^}]*--bg:/s);
  for (const selector of ['body', '.tile', 'form.calc', '.tabs', 'input']) {
    assert.ok(css.includes('html[data-theme="dark"] ' + selector), selector);
  }
});
