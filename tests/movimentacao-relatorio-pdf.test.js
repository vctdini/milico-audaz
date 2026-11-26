const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('botão do relatório indica impressão ou PDF', () => {
 const html = fs.readFileSync(path.join(root, 'movimentacao.html'), 'utf8');
 assert.match(html, /id="mov-pdf"[^>]*>Gerar PDF \/ Imprimir/);
});
test('folha de estilos possui layout de impressão focado no resultado', () => {
 const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
 assert.match(css, /@media print/);
 assert.match(css, /#conteudo #res/);
});
