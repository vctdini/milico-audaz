'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=fs.readFileSync(path.resolve(__dirname,'..','app.js'),'utf8');
test('movimentação por interesse próprio exclui a ajuda de custo do total estimado',()=>{
 assert.match(app,/const impedidaPorInteresseProprio=natureza==='proprio'/);
 assert.match(app,/const tot=impedidaPorInteresseProprio\?0:totalCalculado/);
 assert.match(app,/art\. 57, inciso I, alínea “a”, do Decreto nº 4\.307\/2002/);
});
test('a exclusão da ajuda de custo por interesse próprio não desmarca nem elimina as parcelas de transporte',()=>{
 assert.match(app,/As demais parcelas de transporte devem ser avaliadas separadamente/);
 assert.match(app,/const subtotal=ajuda\+bagVal\+passVal/);
});
