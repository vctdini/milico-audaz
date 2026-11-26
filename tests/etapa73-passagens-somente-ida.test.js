const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const app = fs.readFileSync('app.js','utf8');
const html = fs.readFileSync('movimentacao.html','utf8');
test('Etapa 73: passagens usam distância rodoviária somente de ida',()=>{
 const helper=app.slice(app.indexOf('function distanciaTotalDestinoMov'),app.indexOf('function calcularTransportePessoalMov'));
 assert.match(helper,/mov-destino-km-ida/);
 assert.doesNotMatch(helper,/mov-destino-km\?/);
});
test('Etapa 73: passagem do militar é incluída automaticamente',()=>{
 assert.match(app,/tipo:'Militar',quantidade:1/);
 assert.match(app,/Militar<\/td><td>1<\/td>/);
});
test('Etapa 73: dependentes somam ao valor do militar no demonstrativo',()=>{
 assert.match(app,/pass\.itens\.reduce\(\(a,x\)=>a\+x\.valor,0\)/);
 assert.match(app,/Passagens<\/th>/);
});
test('Etapa 73: seção de passageiros fica após distâncias e antes do botão calcular',()=>{
 const a=html.indexOf('id="comparacao-destinos"'), b=html.indexOf('id="mov-passagens-grupo"'), c=html.indexOf('type="submit"');
 assert.ok(a>=0&&b>a&&c>b);
 assert.match(html,/Passagens do militar e dependentes/);
});
