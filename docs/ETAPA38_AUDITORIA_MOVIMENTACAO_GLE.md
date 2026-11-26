# Etapa 38 — Auditoria da movimentação e da Gratificação de Localidade Especial

## Base documental fornecida

- Portaria GM-MD nº 379, de 25 de janeiro de 2022 (PDF fornecido pelo usuário, 6 páginas).
- Portaria GM-MD nº 4.965, de 10 de novembro de 2025 (PDF fornecido pelo usuário, 2 páginas; publicação indicada no DOU nº 217, Seção 1, de 13/11/2025).

## Conteúdo normativo incorporado

A Portaria nº 379/2022 estabelece a classificação das localidades especiais em Categorias A e B (arts. 3º e 4º) e traz relações de localidades nos Anexos I e II. O art. 2º trata do pagamento da Gratificação de Localidade Especial.

A Portaria nº 4.965/2025 acrescenta o art. 2º-A à Portaria nº 379/2022. O novo dispositivo prevê pagamento ao militar em comissão, operação, exercício ou destaque, entre a data de apresentação e a de partida da localidade especial. O § 1º determina que período igual ou superior a oito horas e inferior a vinte e quatro horas seja computado como um dia. O § 2º permite acumulação com a Gratificação de Representação referente à mesma comissão, operação, exercício ou destaque. O § 3º admite pagamento cumulativo com diárias e ajuda de custo, conforme o planejamento da atividade. O § 4º define comissão e destaque. O § 5º trata das datas de apresentação e partida em missões nas vias fluviais, lacustres e áreas marítimas especificadas.

## Implementação nesta etapa

- Inclusão de campos separados para categoria da localidade, tipo de atividade, data/hora de apresentação e data/hora de partida.
- Apuração do intervalo decorrido e da quantidade de dias: períodos completos de 24 horas são computados como dias completos; o período residual é computado como um dia quando for de pelo menos 8 horas e inferior a 24 horas.
- Validação de datas inválidas e de partida anterior ou igual à apresentação.
- Exibição de memória de cálculo com horas decorridas, períodos completos e período residual.
- Exibição de aviso sobre a possibilidade normativa de acumulação com Gratificação de Representação, diárias e ajuda de custo, conforme o planejamento da atividade.
- Inclusão de ressalva de que a seleção de categoria é informativa e não valida a classificação oficial da localidade.
- Inclusão de ressalva explícita: os percentuais 10%/20% já existentes no campo de remuneração não são estabelecidos pelas Portarias nº 379/2022 e nº 4.965/2025. Não foram alterados nem homologados nesta etapa.

## Limites e pendências

1. A ferramenta continua sendo um simulador e não decide elegibilidade, autorização, designação ou reconhecimento administrativo.
2. A lista de localidades dos Anexos I e II ainda não foi convertida em cadastro pesquisável com atualização normativa. O usuário seleciona A/B conforme classificação previamente confirmada.
3. A Portaria nº 4.965/2025 não define, no texto fornecido, o percentual monetário da GLE; é necessária a norma remuneratória específica para validar percentuais e base.
4. A calculadora de ajuda de custo por mudança de sede continua separada da apuração temporal da GLE. Não foi alterado o multiplicador da ajuda de custo nesta etapa.
5. Não foi feita alteração nos valores da ajuda de custo, soldos, adicionais ou fórmulas do contracheque.

## Testes

Testes automatizados específicos cobrem intervalos inferiores a 8 horas, exatamente 8 horas, período residual abaixo do limiar, períodos de 24 horas, combinação de dias completos com fração residual e datas inválidas.
