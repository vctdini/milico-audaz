'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
test('demonstrativo consolida ajuda de custo, bagagem e passagens por destino',()=>{
 assert.match(app,/Demonstrativo financeiro por destino/);
 assert.match(app,/const subtotal=ajuda\+bagVal\+passVal/);
 assert.match(app,/cada linha representa um cenário alternativo de destino/);
 assert.doesNotMatch(app,/Total estimado dos destinos/);
});
test('passagens são vinculadas ao destino informado sem misturar destinos diferentes',()=>{
 assert.match(app,/filter\(x=>chave\(x\.destino\)===chave\(d\.nome\)\)/);
 assert.match(app,/não foi incluído nos subtotais por destino/);
});
test('parcelas sem dados necessários permanecem identificadas como pendentes',()=>{
 assert.match(app,/Distância de ida pendente/);
 assert.match(app,/não puderam ser calculados com os dados disponíveis/);
});
test('demonstrativo deixa claro que não reconhece direito nem garante pagamento',()=>{
 assert.match(app,/não confirma autorização de transporte ou garantia de pagamento/);
});
