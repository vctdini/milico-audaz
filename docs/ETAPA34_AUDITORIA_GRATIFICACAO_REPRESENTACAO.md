# Etapa 34 — Auditoria da gratificação de representação

## Escopo
Auditoria normativa e funcional da calculadora de gratificação de representação, partindo da Etapa 33. A ferramenta continua sendo simulador e não decide elegibilidade ou autorização administrativa.

## Fontes normativas consultadas

1. Lei nº 13.954/2019, art. 10 e Anexo IV: gratificação mensal para oficiais-generais e em caráter eventual nas hipóteses legais; percentuais de 10% para oficial-general e cargo de comando/direção/chefia e 2% para viagem de representação/instrução, emprego operacional ou ordens de autoridade estrangeira.
2. Decreto nº 11.002/2022, art. 4º: enumera as hipóteses; § 1º computa um dia para período igual ou superior a 8 horas e inferior a 24 horas; § 2º fixa 10% do soldo a cada mês de exercício em cargo de comando/direção/chefia, com proporcionalidade quando houver movimentação antes do mês completo; § 3º prevê acumulação das parcelas mensais (oficial-general e comando) com as hipóteses eventuais; § 4º torna inacumuláveis entre si as hipóteses eventuais.
3. Decreto nº 11.002/2022, art. 8º, II e parágrafo único: gratificação eventual não é paga cumulativamente com diárias; havendo cumulatividade, exclui-se a gratificação de representação e mantêm-se as diárias.
4. Normas EB10-N-08.003, aprovadas pela Portaria C Ex nº 1.887/2022: a autorização do pagamento eventual é delegada às autoridades indicadas; o saque depende de autorização; PGE/PBIM isoladamente não é suficiente; os arts. 5º e 6º disciplinam solicitação, publicação em BI e devolução de valores antecipados em excesso.

## Correções e melhorias

- Incluído seletor de hipótese eventual: viagem de representação, viagem de instrução, emprego operacional ou estar às ordens de autoridade estrangeira no País. O seletor permite apenas uma hipótese eventual por simulação, refletindo a inacumulabilidade do art. 4º, § 4º.
- Esclarecido o critério temporal: período igual ou superior a 8 horas e inferior a 24 horas conta como um dia. A ferramenta recebe dias já apurados; não calcula horários de início/fim.
- Incluída indicação de recebimento de diárias no mesmo período. Quando marcada, a parcela eventual é excluída e as parcelas mensais permanecem, em linha com o art. 8º, II e parágrafo único.
- Mantidos os percentuais legais: 10% do soldo para oficial-general e comando/direção/chefia; 2% do soldo por dia para hipóteses eventuais.
- Acrescentadas orientações sobre autorização formal e publicação em boletim interno conforme EB10-N-08.003.
- Preservadas fórmulas e layout das demais ferramentas.

## Ponto pendente de homologação

A implementação anterior e a atual estimam a proporcionalidade da parcela de comando dividindo o percentual mensal por 30 dias. O Decreto nº 11.002/2022, art. 4º, § 2º, determina proporcionalidade ao número de dias, mas o texto consultado não explicita o divisor. Por isso, o relatório e a interface identificam a base de 30 dias como critério técnico de simulação que deve ser confirmado com o CPEx; não se apresenta esse divisor como transcrição literal da norma.

Também não foi transformada em bloqueio a necessidade de autorização, porque o Milico Audaz é simulador. A ferramenta apenas alerta que o pagamento eventual depende de ato autorizativo e dos procedimentos internos. A soma simultânea da parcela mensal de oficial-general e da parcela mensal de comando, quando ambas forem marcadas, deve ser confirmada para o caso concreto pela área pagadora; a norma explicita a acumulação de cada hipótese mensal com as hipóteses eventuais, mas não detalha no texto consultado o cenário de cumulação entre as duas hipóteses mensais.

## Testes adicionados

- 10% mensal de oficial-general.
- 10% de comando proporcional aos dias inseridos.
- 2% por dia de atividade eventual.
- Exclusão da gratificação eventual quando há diárias no mesmo período.
- Preservação da parcela mensal quando a eventual é excluída.
- Valores negativos e dias fracionados.
- Obrigatoriedade de selecionar uma hipótese eventual quando há dias informados.

## Conclusão
A calculadora agora representa separadamente as hipóteses eventuais, aplica o conflito legal com diárias e esclarece a regra de contagem de dias. O divisor da proporcionalidade de comando e a eventual cumulação simultânea das duas parcelas mensais permanecem identificados como pontos de validação com o CPEx, sem serem apresentados como homologados.
