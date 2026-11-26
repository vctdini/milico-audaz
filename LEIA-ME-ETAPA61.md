# Etapa 61 — Correção de validação de passageiros

## Problema corrigido
A seção de passageiros possui uma linha inicial vazia como modelo para cadastro. Quando a opção “Passagens” estava marcada, a validação exigia destino e categoria mesmo sem o usuário ter iniciado o cadastro de qualquer passageiro, impedindo o cálculo.

## Correção
- Linha sem destino e sem categoria é considerada não utilizada e ignorada pela validação.
- Quando o usuário começa a preencher uma linha (destino ou categoria), os campos obrigatórios continuam sendo validados.
- Quantidade e distância continuam sendo verificadas para linhas efetivamente iniciadas.
- O motor de cálculo já ignorava linhas totalmente vazias; a validação da interface foi alinhada a esse comportamento.

## Arquivos
- `app.js`: ajuste em `validarMovimentacaoAntesCalcular`.
- `tests/etapa61-passageiro-opcional.test.js`: testes de regressão.

## Teste manual recomendado
1. Marcar “Passagens” e deixar a linha inicial vazia: o formulário não deve bloquear por destino/categoria de passageiro.
2. Informar apenas uma categoria: deve solicitar o destino.
3. Informar apenas um destino: deve solicitar a categoria.
4. Preencher ambos sem distância cadastrada: deve solicitar a distância de ida e volta.
