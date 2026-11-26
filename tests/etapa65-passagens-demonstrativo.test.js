'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
test('Etapa 65: dependentes não aparecem como item selecionável',()=>{
 assert.doesNotMatch(html,/name="mov-item"[^>]*value="dependentes"/);
});
test('Etapa 65: campos de dependentes aparecem dentro da seção de passagens',()=>{
 const pass=html.indexOf('id="mov-passagens-grupo"');
 const items=html.indexOf('id="mov-itens"');
 assert.ok(pass>=0&&items>pass);
 for(const id of ['adultos','menores2','maiores2'])assert.ok(html.includes(`id="mov-dependentes-${id}"`));
});
test('Etapa 65: interface não contém cadastro manual redundante de passageiros',()=>{
 for(const id of ['mov-passagens-lista','mov-adicionar-passageiro','mov-passagem-destino','mov-passagem-tipo','mov-passagem-qtd','mov-passagem-km','mov-passagem-tarifa'])assert.ok(!html.includes(id));
});
test('Etapa 65: cálculo automático usa destino do militar e R$ 0,50 por km por pessoa',()=>{
 assert.match(app,/const TARIFA_PASSAGEM_KM_PESSOA = 0\.50/);
 assert.match(app,/distanciaTotalDestinoMov\(d\.nome\)/);
 assert.match(app,/mov-dependentes-'\+id/);
});
test('Etapa 65: demonstrativo principal fica contido e destacado',()=>{
 assert.match(css,/\.mov-calc \.mov-demonstrativo\{width:100%;max-width:100%;min-width:0;overflow:hidden/);
 assert.match(css,/\.mov-calc \.mov-demonstrativo \.mov-financial-table-wrap\{width:100%;max-width:100%;min-width:0;overflow-x:auto/);
});
test('Etapa 65: cache do aplicativo foi atualizado',()=>assert.match(sw,/etapa66/));
