import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html=readFileSync(new URL('../movimentacao.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../style.css',import.meta.url),'utf8');
test('itens da movimentação são declarados pelo usuário em checkboxes visíveis',()=>{
 for(const value of ['empregado-domestico','automovel','motocicleta','bagagem','passagens']) assert.match(html,new RegExp(`type="checkbox" name="mov-item" value="${value}"`));
});
test('resultado lista os itens marcados sem presumir seleção automática',()=>{
 assert.match(js,/function itensMovimentacaoSelecionados\(\)/);
 assert.match(js,/renderItensMovimentacao\(\)/);
 assert.match(js,/renderItensMovimentacao\(\)\+renderPassagensMov\(\)/);
 assert.match(js,/document\.querySelectorAll\('input\[name="mov-item"\]:checked'\)/);
});
test('seleções são limpas pelo comando limpar cálculo e têm feedback acessível',()=>{
 assert.match(js,/atualizarResumoItensMov\(\);if\(destinosMov\)/);
 assert.match(html,/id="mov-itens-status" class="note" aria-live="polite"/);
});
test('interface esclarece que marcar não confirma concessão nem pagamento',()=>{
 assert.match(html,/Os itens desmarcados ficam fora do cálculo/);
 assert.match(css,/mov-item-option/);
});
