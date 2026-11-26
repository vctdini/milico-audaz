# AUD-022 — Compensação pecuniária: auditoria orientada à simulação

**Status:** regra aritmética central mapeada; ferramenta sem implementação. A simulação não avaliará elegibilidade do usuário.

## 1. Fórmula legal central
A Lei nº 7.963/1989 estabelece compensação equivalente a uma remuneração mensal por ano de efetivo serviço militar, tomando a remuneração correspondente ao posto/graduação na data do pagamento. Fração igual ou superior a 180 dias é considerada um ano; o período de serviço militar obrigatório não integra a contagem prevista na lei. O art. 3º descreve situações específicas de exclusão.

O Decreto nº 99.425/1990, art. 1º, III, exclui da remuneração-base: diárias, ajuda de custo, indenização de transporte, auxílio/adiantamento para uniformes, indenização de etapas, 13º salário e adicional de férias. O art. 1º, I e II, disciplina pagamento parcelado por acordo e publicação do acordo no boletim interno/documento equivalente. O art. 3º prevê vedação de cumulação com indenizações financeiras ali indicadas, ressalvado o direito de opção.

Fontes:
- Lei nº 7.963/1989: https://www2.camara.leg.br/legin/fed/lei/1989/lei-7963-21-dezembro-1989-365506-publicacaooriginal-1-pl.html
- Decreto nº 99.425/1990, DOU de 31/07/1990: https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=31%2F07%2F1990&jornal=1&pagina=1

## 2. Modelo do simulador
O usuário informa:
- remuneração mensal de referência na data de pagamento, com rubricas discriminadas;
- total de tempo de serviço computável para a simulação;
- parcela de serviço militar obrigatório a excluir, se aplicável;
- opção de visualizar o total em pagamento único ou parcelamento hipotético.

Cálculo:
`anos = anos_completos + (fração_restante_em_dias >= 180 ? 1 : 0)`
`compensação_estimada = remuneração_base_elegível_informada × anos`

A base de remuneração deve ser apresentada rubrica a rubrica. As parcelas excluídas pelo Decreto 99.425/1990 não devem compor a base legal padrão. Para flexibilidade de simulação, o usuário pode comparar cenários com rubricas opcionais, desde que o relatório sinalize claramente que a inclusão é hipótese manual e não a fórmula legal padrão.

## 3. Separação entre cálculo e elegibilidade
A interface pode mostrar, em nota, que a Lei 7.963/1989 descreve a compensação para licenciamento ex officio por término de prorrogação e prevê exclusões específicas. Porém, o simulador não deve bloquear o cálculo se o usuário escolher outra hipótese: ele apenas calcula os parâmetros informados e identifica o cenário utilizado.

## 4. Casos de teste matemático
- 1 ano + 179 dias: 1 remuneração.
- 1 ano + 180 dias: 2 remunerações.
- 2 anos + 179 dias: 2 remunerações.
- 2 anos + 180 dias: 3 remunerações.
- Serviço obrigatório informado separadamente: não integrar o tempo computável legal padrão.
- Diárias, ajuda de custo, transporte, etapas, 13º e adicional de férias: excluídos da base legal padrão.
- Remuneração-base zero: resultado zero; não gerar NaN/Infinity.
- Parcelamento: somatório das parcelas deve corresponder ao total, respeitando regra de arredondamento.

## 5. Pendências
- confirmar no texto consolidado da Lei 7.963/1989 se houve alteração legislativa posterior e conferir atos executórios específicos do Exército;
- confirmar quais rubricas do sistema remuneratório de 2026 compõem a “remuneração mensal” para esse fim, sem assumir equivalência com remuneração bruta do contracheque;
- verificar as indenizações específicas citadas no art. 3º do Decreto e como oferecer cenário comparativo/opção;
- validar a regra de parcelamento e fluxo administrativo atualizado.

**Conclusão:** a regra matemática pode ser especificada, mas a calculadora deve solicitar a base mensal como entrada discriminada e não presumir elegibilidade nem composição da remuneração.
