'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
function core({destinos=[],domestico=false}={}){
 const rows=destinos.map(d=>({querySelector:(sel)=>sel==='.mov-destino-nome'?{value:d.nome}:sel==='.mov-destino-km'?{value:String(d.km)}:null}));
 const document={getElementById:()=>null,querySelector:(sel)=>sel==='input[name="mov-item"][value="empregado-domestico"]:checked'&&domestico?{}:null,querySelectorAll:(sel)=>sel==='#mov-destinos-lista .mov-destino'?rows:[],addEventListener:()=>{}};
 const window={};vm.runInNewContext(app,{document,window,console,Number,Math,Date});return window.MilicoAudazCore;
}
test('passagens: aplica R$ 0,50 por km por pessoa sobre a distância total ida e volta',()=>{const c=core({destinos:[{nome:'Manaus - AM',km:2400}]});const r=c.calcularTransportePessoalMov([{destino:'Manaus - AM',tipo:'militar',quantidade:'1',km:2400},{destino:'Manaus - AM',tipo:'dependente',quantidade:'2',km:2400}]);assert.equal(r.quantidade,3);assert.equal(r.total,3600);assert.equal(r.itens[0].valor,1200);});
test('passagens: calcula separadamente por destino e quantidade de pessoas',()=>{const c=core({destinos:[{nome:'Boa Vista - RR',km:1000},{nome:'Manaus - AM',km:800}]});const r=c.calcularTransportePessoalMov([{destino:'Boa Vista - RR',tipo:'militar',quantidade:'2',km:1000},{destino:'Manaus - AM',tipo:'dependente',quantidade:'1',km:800}]);assert.equal(r.total,1400);});
test('passagens: ignora linha totalmente vazia sem presumir passageiro',()=>{const r=core().calcularTransportePessoalMov([{destino:'',tipo:'',quantidade:'1',km:null}]);assert.equal(r.quantidade,0);assert.equal(r.total,0);});
test('passagens: exige destino e categoria quando linha é iniciada',()=>{assert.match(core().calcularTransportePessoalMov([{destino:'',tipo:'militar',quantidade:'1',km:null}]).erro,/destino e categoria/);});
test('passagens: exige distância total cadastrada para o destino',()=>{assert.match(core().calcularTransportePessoalMov([{destino:'Manaus - AM',tipo:'militar',quantidade:'1',km:null}]).erro,/distância total de ida e volta/);});
test('passagens: ignora empregado doméstico quando a opção não está marcada',()=>{const r=core({destinos:[{nome:'Manaus - AM',km:1000}]}).calcularTransportePessoalMov([{destino:'Manaus - AM',tipo:'domestico',quantidade:'1',km:1000}]);assert.equal(r.total,0);});
test('passagens: inclui empregado doméstico quando a opção está marcada',()=>{const r=core({destinos:[{nome:'Manaus - AM',km:1000}],domestico:true}).calcularTransportePessoalMov([{destino:'Manaus - AM',tipo:'domestico',quantidade:'1',km:1000}]);assert.equal(r.total,500);});
test('passagens: interface abre sob demanda e usa quantidade, distância e tarifa padrão',()=>{assert.match(html,/id="mov-passagens-grupo"[^>]*hidden/);assert.match(html,/id="mov-adicionar-passageiro"/);assert.match(html,/class="mov-passagem-qtd"/);assert.match(html,/R\$ 0,50\/km\/pessoa/);});
test('listas de guarnições: origem, destinos e passageiros compartilham a lista pesquisável',()=>{assert.match(html,/id="mov-guarnicoes-lista"/);assert.equal((html.match(/list="mov-guarnicoes-lista"/g)||[]).length,3);});
