# AUD-010 — Compensação pecuniária do militar temporário

**Status:** regra legal básica confirmada; critérios administrativos e casos de borda pendentes.  
**Prioridade:** alta.  
**Escopo:** ferramenta atualmente marcada “Em breve”; nenhuma fórmula implementada na Etapa 19.

## 1. Regra legal central

A Lei nº 7.963/1989, art. 1º, assegura ao oficial ou praça licenciado **ex officio por término de prorrogação do tempo de serviço** compensação equivalente a **uma remuneração mensal por ano de efetivo serviço militar prestado**, tomando como base a remuneração correspondente ao posto/graduação na data do pagamento.

O § 1º determina que fração igual ou superior a 180 dias seja considerada um ano. O § 2º exclui o período do serviço militar obrigatório. O art. 3º exclui o licenciado ex officio a bem da disciplina ou por condenação transitada em julgado. Portanto, não é benefício automático para todo desligamento de temporário nem para licenciamento a pedido.

## 2. Regulamentação

O Decreto nº 99.425/1990 regulamenta a Lei. Seu art. 1º, III, exclui da remuneração-base, para pagamento do pecúlio: diárias, ajuda de custo, indenização de transporte, auxílio/adiantamento para aquisição de uniformes, indenização de etapas, 13º salário e adicional de férias. O decreto também prevê opção por pagamento parcelado mediante acordo e impede cumulação com determinadas indenizações financeiras, ressalvado o direito de opção (art. 3º).

## 3. Modelo de cálculo a implementar

`compensacao = remuneracao_elegivel_na_data_pagamento × anos_computaveis`

`anos_computaveis = anos_completos + (fracao_restante_em_dias >= 180 ? 1 : 0)`

O motor não deve assumir que “remuneração” é simplesmente o soldo. Deve construir a base a partir das parcelas remuneratórias elegíveis, excluindo expressamente as verbas listadas no Decreto 99.425/1990. A interpretação da remuneração mensal na data do pagamento e eventuais regras de rubricas deve ser homologada com norma e orientação administrativa da Força antes da publicação.

## 4. Dados necessários na interface

- Força: Exército (escopo fixo do app).
- Posto/graduação na data do pagamento.
- Data de incorporação/início de serviço efetivo e data de licenciamento.
- Tempo de serviço obrigatório, separado e excluído.
- Tipo e fundamento do licenciamento (término de prorrogação; a pedido; disciplina; condenação; outros).
- Tempo efetivo computável e fração em dias.
- Remuneração na data do pagamento, com rubricas discriminadas.
- Existência de indenização financeira incompatível e opção formal, quando aplicável.
- Pagamento à vista ou parcelado mediante acordo.

## 5. Casos de teste obrigatórios

1. 1 ano e 179 dias de serviço computável: 1 remuneração.
2. 1 ano e 180 dias: 2 remunerações.
3. 2 anos e 179 dias: 2 remunerações.
4. Período de serviço obrigatório não entra na contagem.
5. Licenciamento a pedido: não elegível pela Lei 7.963/1989.
6. Licenciamento ex officio a bem da disciplina: não elegível (art. 3º).
7. Licenciamento ex officio por condenação transitada em julgado: não elegível (art. 3º).
8. Verbas expressamente excluídas pelo Decreto 99.425/1990 não entram na base.
9. Teste de arredondamento monetário apenas ao final, com memória de cálculo.

## 6. Conclusão

A regra central está suficientemente documentada para iniciar especificação e protótipo, mas a ferramenta deve permanecer bloqueada para cálculo oficial até validar composição de remuneração e procedimentos internos do Exército. Não criar exceções ou multiplicadores não previstos na Lei/Decreto.

## 7. Fontes

- Lei nº 7.963/1989, arts. 1º a 3º: https://www2.camara.leg.br/legin/fed/lei/1989/lei-7963-21-dezembro-1989-365506-publicacaooriginal-1-pl.html
- Decreto nº 99.425/1990, arts. 1º a 4º: https://www2.camara.leg.br/legin/fed/decret/1990/decreto-99425-30-julho-1990-342622-publicacaooriginal-1-pe.html
- Catálogo oficial da Lei 7.963/1989: https://legislacao.presidencia.gov.br/atos/?ano=1989&ato=55bc3ZE5EeFpWTb05&data=21%2F12%2F1989&numero=7963&tipo=LEI
