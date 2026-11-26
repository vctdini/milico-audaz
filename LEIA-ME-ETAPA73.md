# Etapa 73 — Passagens somente de ida e inclusão do militar

- O cálculo de passagens utiliza a distância rodoviária somente de ida cadastrada em Origem e destinos.
- Ao marcar Passagens, o militar é incluído automaticamente como 1 passageiro por cenário de destino.
- As quantidades de adultos, crianças menores de 2 anos e crianças maiores de 2 anos são somadas ao militar.
- O parâmetro permanece R$ 0,50 por km por pessoa.
- O demonstrativo financeiro soma a passagem do militar e dos dependentes na coluna Passagens e no total estimado de cada destino.
- A seção Passagens do militar e dependentes foi posicionada após Origem e destinos e Itens incluídos, imediatamente antes do botão Calcular.
- A validação exige distância de ida quando Passagens está selecionado, mesmo que não haja dependentes cadastrados.

## Validação
- `node --check app.js`: aprovado.
- `node --test tests/etapa73-passagens-somente-ida.test.js`: 4 aprovados.
- Suíte histórica completa: 204 aprovados e 31 falhas em verificações legadas preexistentes/incompatíveis com versões anteriores; não foram atribuídas como aprovadas.
- Não foi realizada inspeção visual em navegador nesta etapa.
