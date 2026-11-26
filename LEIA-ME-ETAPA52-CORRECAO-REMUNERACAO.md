# ETAPA 52 — Correção da composição remuneratória e da GR mensal

## Alteração no motor
- Na página de movimentação, o parâmetro da caixa `cmd` alimenta `gr` com 10% quando marcada. A regra fica deliberadamente escopada à `.mov-calc` para não alterar o comportamento das caixas homônimas em outras ferramentas.
- A função `perfil()` deixou de zerar a GR depois de ler os parâmetros.
- A parcela integra `total`, que é a base utilizada pela ajuda de custo nas situações de movimentação da ativa.
- Na transferência para a inatividade, o código mantém `gr=0` para a composição com soldo de referência, evitando transportar automaticamente uma parcela de atividade para o cálculo específico da situação f.

## Ajuste de interface
A caixa foi renomeada para indicar que se refere à GR mensal pelo exercício de cargo de comando, direção ou chefia. O texto orienta a marcar somente quando a parcela estiver sendo efetivamente percebida na data de referência do ajuste de contas e diferencia essa hipótese das gratificações eventuais.

## Fundamento normativo consultado
- MP nº 2.215-10/2001, art. 1º, III, alínea b: gratificação de representação integra a composição da remuneração.
- Decreto nº 11.002/2022, art. 4º, I e II, alínea a, e § 2º: GR mensal para oficiais-generais e GR pelo exercício de cargo de comando, direção ou chefia de OM; nesta última hipótese, 10% do soldo por mês de exercício, proporcional quando cabível.
- Decreto nº 4.307/2002, art. 56: referência temporal para cálculo da ajuda de custo é a data do ajuste de contas.
- Lei nº 13.954/2019, art. 15 e Anexo V: múltiplos da remuneração para ajuda de custo.

## Limites e cautelas
- A caixa é uma declaração do usuário; não verifica designação, autorização ou contracheque.
- A alteração trata da GR mensal por cargo de comando/direção/chefia. Não inclui GR eventual por viagem, instrução, emprego operacional ou outras hipóteses no cálculo mensal da ajuda de custo.
- O resultado continua sendo simulação. A confirmação da rubrica efetivamente percebida na data do ajuste de contas deve ser feita com o contracheque/CPEx e processo administrativo.
- Não foi alterada a regra específica de transferência para a inatividade, nem as demais parcelas remuneratórias.

## Arquivos alterados
- `app.js`
- `movimentacao.html`
- `tests/etapa52-remuneracao-gr.test.js`
