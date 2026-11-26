# AUD-014 — Gratificação de representação: mensal e eventual

**Ferramenta:** `gratificacao-representacao.html` / `FN.gr()` em `app.js`  
**Classificação:** PARCIALMENTE VALIDADA — percentuais e proporcionalidade básica coincidem; elegibilidade e controles de acumulação incompletos.  
**Código alterado:** não.

## Fontes primárias

1. Lei nº 13.954/2019, art. 10 e Anexo IV: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
2. Decreto nº 11.002/2022, texto atualizado, arts. 4º a 9º: https://www2.camara.leg.br/legin/fed/decret/2022/decreto-11002-17-marco-2022-792404-normaatualizada-pe.html
3. Decreto nº 13.052/2026, que acrescentou as hipóteses de avaliação de sistemas/produtos de defesa, manutenção e serviço de transporte ao art. 5º, III, f, do Decreto nº 11.002/2022: https://legis.senado.leg.br/norma/43484616/publicacao/43492652

## Regras confirmadas

- Oficial-general: gratificação mensal de 10% do soldo (Lei nº 13.954/2019, Anexo IV; Decreto nº 11.002/2022, art. 4º, I).
- Cargo de comando, direção ou chefia de OM: 10% do soldo por mês, proporcional aos dias se houver movimentação antes do fim do mês (Decreto nº 11.002/2022, art. 4º, §2º).
- Viagem de representação, viagem de instrução, emprego operacional ou estar às ordens de autoridade estrangeira no País: 2% do soldo por dia, com período de 8h a menos de 24h contado como um dia (art. 4º, §1º e Anexo IV da Lei).
- Gratificação mensal de oficial-general e gratificação por comando/chefia podem acumular com as hipóteses eventuais (art. 4º, §3º).
- As hipóteses eventuais das alíneas b, c, d e e são inacumuláveis entre si (art. 4º, §4º).
- A gratificação eventual depende de autorização por ato da autoridade competente/delegada (art. 6º).
- Gratificação eventual não acumula com diárias; se houver cumulatividade, exclui-se a gratificação de representação e mantém-se a diária (art. 8º, II e parágrafo único).
- O Decreto nº 13.052/2026 atualizou o elenco de atividades que podem configurar emprego operacional; a alteração deve estar refletida na descrição/ajuda da ferramenta.

## Conferência do código

Os percentuais de 10% e 2%, o cálculo mensal proporcional por dias de comando e a soma de oficial-general + comando + eventual são compatíveis, em princípio, com os arts. 4º e Anexo IV. A fórmula aritmética central não foi identificada como errada nesta inspeção.

## Lacunas funcionais

1. A tela tem apenas um campo genérico “Dias de viagem, instrução ou emprego operacional”. Não distingue viagem de representação, viagem de instrução, emprego operacional ou missão sob autoridade estrangeira.
2. Não coleta autorização formal nem sua autoridade/delegação, exigidas pelo art. 6º para as hipóteses eventuais.
3. Não pergunta se o mesmo período recebe diárias. A tela apenas exibe aviso de não acumulação, mas o cálculo não bloqueia a gratificação nem permite selecionar a prevalência das diárias. O Decreto determina manter diárias e excluir GR eventual.
4. Não impede somar dias de hipóteses eventuais incompatíveis entre si (b-e), nem evita contagem duplicada do mesmo período.
5. A descrição da tela não inclui expressamente “estar às ordens de autoridade estrangeira no País” e não atualiza as atividades de emprego operacional incluídas pelo Decreto nº 13.052/2026.
6. O cálculo presume 30 dias como divisor mensal. É necessário testar a regra operacional de proporcionalidade com os procedimentos de folha/CPEx e casos de movimentação em meses com 28, 29 ou 31 dias antes de homologar o divisor.

## Conclusão e recomendação

Classificar como **parcialmente validada**. Manter percentuais, mas redesenhar o formulário para escolher uma única hipótese eventual por período, registrar horas/dias, autorização e eventual diária. Implementar regra de precedência: se houver diária, manter diária e excluir a GR eventual, sem afetar GR mensal de oficial-general ou GR de comando/chefia quando legalmente acumuláveis. Confirmar o divisor de proporcionalidade junto ao normativo/rotina de pagamento do Exército antes de alterar a regra.
