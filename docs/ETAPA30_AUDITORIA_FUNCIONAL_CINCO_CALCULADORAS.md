# Etapa 30 — Auditoria funcional de cinco calculadoras

**Base de trabalho:** Etapa 29 — centralização do contracheque.

## Escopo
Auditoria de entradas, limites técnicos, valores negativos, casas decimais, contagens fracionadas e situações extremas nas ferramentas de auxílio-transporte, auxílio-alimentação, diárias, gratificação de representação e pensão alimentícia.

## Alterações implementadas
- Validador comum de parâmetros numéricos, com suporte a vírgula decimal.
- Rejeição de campos obrigatórios vazios, texto não numérico, valores negativos e quantidades fracionadas onde a entrada representa dias/ocorrências inteiras.
- Auxílio-transporte: tarifas obrigatórias não negativas; dias inteiros entre 0 e 22; soldo personalizado opcional, mas positivo quando informado.
- Auxílio-alimentação: etapa comum positiva; quantidades inteiras não negativas.
- Diárias: dias inteiros de 1 a 366; quantidade de acréscimos e dias úteis inteiros não negativos; valores monetários não negativos; validação de destino/círculo.
- Gratificação de representação: dias no cargo inteiros entre 0 e 30; dias de atividade eventual inteiros não negativos.
- Pensão alimentícia: base não negativa; percentual limitado tecnicamente de 0% a 100%. O simulador continua aplicando somente a base e o percentual digitados, sem inferir o conteúdo da decisão judicial.

## Preservação das regras
Não foram alterados percentuais, multiplicadores, tabelas de diárias, valor da etapa comum, bases legais ou critérios de elegibilidade. As validações são controles de consistência dos dados inseridos; não decidem se o usuário faz jus a qualquer parcela. Nenhuma regra legal foi alterada.

## Achados normativos que permanecem em aberto
- **Auxílio-transporte:** a fórmula implementada ainda usa tarifa ida + volta multiplicada pelos dias informados e cota-parte de 6% do soldo proporcional a 22 dias. O Decreto nº 12.117/2024 descreve menor custo diário do transporte coletivo, 22 dias e redução proporcional pelos dias com transporte custeado pela União. A tela ainda não coleta modalidade/integração nem dias cobertos pela União. Não homologar o cálculo final nem alterar a regra sem especificação aprovada.
- **Auxílio-alimentação:** a aritmética 10/5/1 etapas e a etapa comum de R$ 13,50 estão parametrizadas, mas o campo “outras situações” reúne hipóteses distintas. A condição orçamentária da ação também não é modelada.
- **Diárias:** o motor presume diárias integrais nos dias anteriores e meia diária no retorno, sem coletar pernoite, alojamento, refeições, itinerário ou fornecimento de transporte. O acréscimo e o desconto de auxílio-transporte também precisam de validação do cenário concreto.
- **Gratificação de representação:** a fórmula 10% mensal/2% por dia é mantida, mas não se registram a hipótese eventual específica, autorização, acumulação entre hipóteses nem precedência sobre diárias. A proporcionalidade mensal usa divisor 30 e requer confirmação operacional antes de homologação.
- **Pensão alimentícia:** cálculo percentual é apenas aritmético. Base, percentual e incidência sobre 13º/férias/verbas devem reproduzir o título judicial/acordo; não existe percentual universal.

## Referências primárias consultadas
- Lei nº 13.954/2019: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- Decreto nº 11.002/2022: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11002.htm
- Portaria GM-MD nº 2.774/2025: https://mdlegis.defesa.gov.br/norma_html/?ANO=2025&NUM=2774&SER=A
- Portaria Normativa nº 19/MD/2017, texto consolidado: https://mdlegis.defesa.gov.br/norma_html/?ANO=2017&NUM=19&SER=A
- Decreto nº 12.117/2024 (auxílio-transporte): texto identificado na auditoria anterior; conferir atualizações e atos complementares do Exército antes de homologar.
- Decreto nº 4.307/2002 (diárias): texto e anexos identificados na auditoria anterior; validar hipóteses por itinerário antes de homologar.

## Testes
A suíte automatizada foi ampliada com casos válidos, negativos, campos vazios, frações de dias, limites superiores e percentuais fora da faixa técnica. Os testes verificam a camada de validação e integridade; não constituem homologação jurídica nem teste visual manual.

## Situação
**Implementação de validações técnicas concluída. Auditoria normativa e funcional das cinco calculadoras permanece parcialmente aberta.** Nenhuma fórmula foi alterada nesta etapa.
