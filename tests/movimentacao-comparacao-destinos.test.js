const fs=require('fs');const path=require('path');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'movimentacao.html'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');
const checks=[
 ['formulário amplo de movimentação',html.includes('mov-calc')],
 ['campo de guarnição de origem',html.includes('id="mov-origem"')],
 ['lista dinâmica de destinos',html.includes('id="mov-destinos-lista"')],
 ['distância total de ida e volta',html.includes('Distância total (ida e volta), em km')],
 ['distância rodoviária de ida para bagagem',html.includes('mov-destino-km-ida')],
 ['botão para adicionar destino',html.includes('id="mov-adicionar-destino"')],
 ['comparação de resultados por destino',js.includes('function renderMovDestinos')&&js.includes('Demonstrativo financeiro por destino')],
 ['passagens calculadas pelo padrão de R$ 0,50 por km por pessoa',js.includes('TARIFA_PASSAGEM_KM_PESSOA = 0.50')&&html.includes('R$ 0,50/km/pessoa')],
 ['listas pesquisáveis de guarnições para origem, destinos e passageiros',html.includes('mov-guarnicoes-lista')&&html.includes('list=\"mov-guarnicoes-lista\"')&&js.includes('mov-passagem-destino')],
 ['ajuda de custo permanece separada do transporte',js.includes('A ajuda de custo permanece separada do transporte')],
 ['validação de destino vazio sem quebrar cálculo',js.includes("if(!linhas.length)return ''")]
];
let fail=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)fail++;}
if(fail)process.exit(1);console.log(`${checks.length} testes aprovados`);
