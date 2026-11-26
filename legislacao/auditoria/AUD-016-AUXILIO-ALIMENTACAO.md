# AUD-016 — Auxílio-alimentação: enquadramento das hipóteses e etapa comum

**Ferramenta:** `auxilio-alimentacao.html` / `FN.alimentacao()` em `app.js`  
**Classificação:** NÃO VALIDADA para cálculo final. Os multiplicadores 10, 5 e 1 e o valor da etapa comum estão identificados, mas a ferramenta não verifica os requisitos de elegibilidade de cada hipótese.  
**Código alterado:** não.

## Fontes primárias

1. MP nº 2.215-10/2001, art. 3º, XIII, e Anexo IV, Tabela III: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
2. Portaria Normativa nº 19/MD, de 01/06/2017, texto consolidado no MDLegis: https://mdlegis.defesa.gov.br/norma_html/?ANO=2017&NUM=19&SER=A
3. Portaria GM-MD nº 2.774, de 23/06/2025, texto oficial no MDLegis: https://mdlegis.defesa.gov.br/norma_html/?ANO=2025&NUM=2774&SER=A

## Regra legal identificada

A Tabela III do Anexo IV da MP nº 2.215-10/2001 estabelece:

- 10 vezes a etapa comum quando o militar estiver em serviço de escala de 24 horas, dentro da hipótese da alínea “a” (não poder receber alimentação pela OM ou por outra nas proximidades, ou ser obrigado por horário/distância a fazer refeições fora da residência, com despesas extraordinárias);
- 5 vezes a etapa comum em serviço/expediente superior a 8 horas de efetivo trabalho e inferior a 24 horas, sob a mesma hipótese da alínea “a”;
- 1 vez a etapa comum nas hipóteses específicas das alíneas “b”, “c” e “d”: OM sem rancho organizado e sem possibilidade de arranchamento próximo; praça abaixo de 3º sargento em férias regulamentares sem alimentação pela União; e praça abaixo de 3º sargento em Localidade Especial Categoria A acompanhada de dependente.

A Portaria Normativa nº 19/MD/2017, alterada pela Portaria GM-MD nº 2.774/2025, fixa a etapa comum em R$ 13,50 em todo o território nacional. O parágrafo único do art. 3º, incluído em 2025, determina observar o limite do referencial monetário da respectiva ação orçamentária. A Portaria 2.774 entrou em vigor na publicação, observada a anualidade orçamentária.

## Confronto com a interface e o motor

O motor calcula `etapa × (10 × n24 + 5 × n8 + 1 × n1)`. A aritmética dos fatores reproduz a Tabela III, mas o campo “Outras situações (1 etapa cada)” reúne três hipóteses legais distintas e não pergunta qual delas se aplica.

A interface não valida:

- se o militar não pôde receber alimentação da própria OM ou de OM próxima;
- se a distância/horário impôs refeição fora da residência e houve despesa extraordinária;
- se a jornada foi de efetivo trabalho superior a 8 e inferior a 24 horas;
- se a OM não possui rancho organizado e não há arranchamento em OM próxima;
- se o beneficiário das hipóteses “c” e “d” é praça abaixo de 3º sargento;
- se a praça estava em férias regulamentares e não foi alimentada pela União;
- se a praça estava em Localidade Especial Categoria A acompanhada de dependente;
- se a execução orçamentária comporta o limite do referencial monetário da ação.

A ferramenta permite inserir quantidades de serviço e “outras situações” sem documentar a hipótese legal. Logo, não deve apresentar o resultado como valor automaticamente devido.

## Conclusão e recomendação

Manter a fórmula aritmética como parâmetro preliminar, mas classificar a calculadora como não validada. Separar a entrada em hipóteses legais identificadas (alínea “a” 24h; alínea “a” >8h e <24h; alíneas “b”, “c” e “d”), com validações de posto/graduação, situação, alimentação fornecida e condição da OM. Manter a etapa comum com vigência por competência, não como número fixo sem histórico.
