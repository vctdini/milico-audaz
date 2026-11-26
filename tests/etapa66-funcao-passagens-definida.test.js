'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
function core(){
 const document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
 const window={};
 vm.runInNewContext(app,{document,window,console,Number,Math,Date});
 return window.MilicoAudazCore;
}
test('Etapa 66: núcleo JavaScript inicializa sem ReferenceError e exporta a função de passagens',()=>{
 const c=core();
 assert.equal(typeof c.calcularTransportePessoalMov,'function');
});
test('Etapa 66: cálculo compatível de passagens usa R$ 0,50 por km por pessoa',()=>{
 const r=core().calcularTransportePessoalMov([{destino:'Manaus - AM',tipo:'dependente',quantidade:2,km:2400}]);
 assert.equal(r.quantidade,2);
 assert.equal(r.total,2400);
});
