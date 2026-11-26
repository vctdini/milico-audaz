'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
test('Etapa 61: linha de passageiro totalmente vazia não bloqueia o cálculo',()=>{
  assert.match(app,/if\(!destino&&!tipo\)return;/);
});
test('Etapa 61: linha iniciada continua exigindo destino e categoria',()=>{
  assert.match(app,/if\(!destino\)pendencias\.push\(`Passageiro \$\{i\+1\}: selecione o destino\.`\)/);
  assert.match(app,/if\(!tipo\)pendencias\.push\(`Passageiro \$\{i\+1\}: selecione a categoria\.`\)/);
});
