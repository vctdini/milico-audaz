# Milico Audaz — Etapa 59

## Objetivo
Aprimorar a entrada de distâncias, orientar o usuário sobre pendências antes do cálculo e impedir que valores monetários se quebrem no demonstrativo por destino.

## Alterações
- Campos de distância aceitam valores decimais durante a edição.
- Ao sair do campo, a distância é arredondada automaticamente para o quilômetro inteiro mais próximo.
- Distâncias obtidas pela consulta rodoviária também são arredondadas para quilômetros inteiros.
- O motor normaliza os valores antes dos cálculos, inclusive quando chegam com casas decimais.
- Ao clicar em Calcular, a tela apresenta uma lista de pendências específicas: origem, destino, distância necessária para bagagem/veículos e dados de cada passageiro.
- Demonstrativo financeiro por destino usa tabela com largura mínima, rolagem horizontal controlada em telas estreitas, nomes de destinos quebráveis e valores monetários sem quebra interna.
- Service worker atualizado para invalidar o cache anterior.

## Arquivos alterados
- `movimentacao.html`
- `app.js`
- `js/movimentacao-distancias.js`
- `style.css`
- `sw.js`
- `tests/movimentacao-etapa59-validacao-distancias-demonstrativo.test.js`

## Regra de arredondamento
Quilômetros fracionários são arredondados para o inteiro mais próximo (`Math.round`). Exemplo: 124,4 km → 124 km; 124,5 km → 125 km. O arredondamento é aplicado antes do cálculo e informado ao usuário.

## Validação
- `node --check app.js`
- `node --check js/movimentacao-distancias.js`
- `node --test tests/*.test.js`

Os testes automatizados não substituem a conferência visual em navegador real nem a validação de rotas externas.
