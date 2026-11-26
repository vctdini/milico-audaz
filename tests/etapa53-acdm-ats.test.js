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
const base={qe:false,smi:false,hab:0,ats:0,co:0,coPosto:'sgt2',pm:0,gle:0,gr:0};
test('ACDM usa percentual legal da graduação quando mantida seleção automática',()=>{const p=c.dados.POSTOS.find(x=>x.id==='sgt2');const f=c.comp(p,base);assert.equal(f.disp,12);assert.equal(f.dp,Math.round(p.soldo*.12*100)/100);});
test('ACDM pode preservar maior percentual alcançado na ativa e incide sobre soldo atual',()=>{const p=c.dados.POSTOS.find(x=>x.id==='sgt2');const f=c.comp(p,{...base,dispPercent:20});assert.equal(f.disp,20);assert.equal(f.dp,Math.round(p.soldo*.20*100)/100);});
test('ATS e ACDM não são somados: aplica-se o mais vantajoso',()=>{const p=c.dados.POSTOS.find(x=>x.id==='sgt2');const f=c.comp(p,{...base,ats:15,dispPercent:20});assert.equal(f.dd,Math.round(p.soldo*.20*100)/100);assert.equal(Math.round((f.ats+f.dp)*100)/100>f.dd,true);});
test('quando ATS é maior, ele prevalece sem acumular ACDM',()=>{const p=c.dados.POSTOS.find(x=>x.id==='sgt2');const f=c.comp(p,{...base,ats:30,dispPercent:20});assert.equal(f.dd,Math.round(p.soldo*.30*100)/100);assert.equal(f.atsMaior,true);});
test('interface permite declarar maior percentual ACDM alcançado na ativa e alerta sobre promoção por benefício',()=>{assert.match(html,/Maior percentual de ACDM alcançado na carreira ativa/);assert.match(html,/Não considere posto superior obtido apenas como benefício na inatividade/);});
