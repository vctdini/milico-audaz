'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
function core(){const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};const window={};vm.runInNewContext(app,{document,window,console,Number,Math,Date});return window.MilicoAudazCore;}
const c=core();
test('Anexo V: comissão superior a 15 dias e até 3 meses é faixa c',()=>{assert.equal(c.calcularFaixaComissao('2026-01-01','2026-01-17').faixa,'c');assert.equal(c.calcularFaixaComissao('2026-01-01','2026-04-01').faixa,'c');});
test('Anexo V: comissão superior a 3 e até 12 meses é faixa b',()=>{assert.equal(c.calcularFaixaComissao('2026-01-01','2026-04-02').faixa,'b');assert.equal(c.calcularFaixaComissao('2026-01-01','2027-01-01').faixa,'b');});
test('fronteiras da comissão: 15 dias não alcançam faixa c; acima de 12 meses não alcança faixa b',()=>{assert.equal(c.calcularFaixaComissao('2026-01-01','2026-01-16').faixa,null);assert.equal(c.calcularFaixaComissao('2026-01-01','2027-01-02').faixa,null);});
test('mês final é ajustado ao último dia válido em início no fim do mês',()=>{assert.equal(c.calcularFaixaComissao('2026-01-31','2026-04-30').faixa,'c');assert.equal(c.calcularFaixaComissao('2026-01-31','2026-05-01').faixa,'b');});
test('datas inválidas ou invertidas são rejeitadas',()=>{assert.match(c.calcularFaixaComissao('2026-02-30','2026-04-01').erro,/datas válidas/);assert.match(c.calcularFaixaComissao('2026-04-01','2026-03-01').erro,/posterior/);});
test('interface contém natureza da movimentação e cenários de comissão sem desligamento',()=>{assert.match(html,/id="natureza-mov"/);assert.match(html,/value="c"/);assert.match(html,/value="b"/);assert.match(html,/id="comissao-inicio"/);assert.match(html,/id="comissao-fim"/);});
test('interface preserva aviso de que ajuda de custo não inclui passagens e bagagem',()=>{assert.match(html,/Bagagem, passagens/);});
