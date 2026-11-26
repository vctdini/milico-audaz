# ETAPA 51 — Auditoria da base remuneratória da ajuda de custo

## Conclusão normativa

A MP nº 2.215-10/2001, art. 1º, define a remuneração em sentido próprio como a soma de:
- soldo;
- adicionais: militar, habilitação, tempo de serviço (observado o art. 30), compensação orgânica e permanência;
- gratificações: localidade especial e representação.

O art. 2º da mesma MP separa dessa remuneração os direitos remuneratórios, entre eles transporte e ajuda de custo. Portanto, não se deve usar o total bruto do contracheque sem separar verbas indenizatórias/direitos remuneratórios.

A Lei nº 13.954/2019, art. 15 e Anexo V, estabelece os múltiplos da remuneração para ajuda de custo. O Decreto nº 4.307/2002, arts. 55 e 56, trata da finalidade e fixa como referência temporal a data do ajuste de contas. A Portaria nº 290-DGP/2013, art. 27, remete à composição do art. 1º da MP nº 2.215-10/2001.

## Comparação com o código da calculadora (Etapa 50)

A função `comp()` atualmente soma: soldo + adicional militar + habilitação + maior entre ATS e disponibilidade + compensação orgânica + permanência + gratificação de localidade especial + gratificação de representação.

Entretanto, `prm()` atualmente define `gr: 0`, mesmo quando a interface oferece a caixa “Exerço cargo de comando, direção ou chefia (GR de 10%)”. Assim, a gratificação de representação de comando selecionada pelo usuário não entra na remuneração usada pela ajuda de custo. É uma divergência entre interface e cálculo que deve ser corrigida após validar o enquadramento e a incidência aplicável.

Também há um limite de escopo: a interface não coleta todas as rubricas/ocorrências possíveis de gratificação de representação. A remuneração não deve ser presumida a partir do total bruto do contracheque, nem de um único adicional isolado.

## Regra de implementação recomendada

1. Manter a composição legal por rubricas (art. 1º da MP), não usar remuneração líquida nem total bruto indiscriminado.
2. Considerar apenas parcelas remuneratórias efetivamente percebidas e aplicáveis na data do ajuste de contas.
3. Tratar gratificação de representação conforme a hipótese específica e o valor efetivo aplicável; não presumir que todo militar recebe GR.
4. Excluir direitos remuneratórios/indenizatórios do art. 2º da MP, inclusive ajuda de custo, transporte e diárias, evitando circularidade.
5. Exibir no resultado a memória discriminada: soldo, adicional militar, habilitação, ATS/disponibilidade, compensação orgânica, permanência, localidade especial e representação.
6. Para a transferência à inatividade (Anexo V, situação f), aplicar regra própria de referência do soldo do último posto do círculo, sem reaproveitar automaticamente a base da movimentação ativa.
7. Validar a interpretação operacional com orientação vigente do DGP/CPEx antes de declarar o cálculo homologado.

## Situação nesta etapa

**Auditoria concluída; fórmula não alterada nesta etapa.** A composição legal está identificada, mas a regra de incidência e parametrização da gratificação de representação — e a regra específica da situação de inatividade — precisam ser confirmadas antes de alterar o motor financeiro. Isso evita corrigir um ponto criando outro erro.

## Fontes

- MP nº 2.215-10/2001, arts. 1º, 2º e 3º: https://www2.camara.leg.br/legin/fed/medpro/2001/medidaprovisoria-2215-10-31-agosto-2001-392526-normaatualizada-pe.pdf
- Lei nº 13.954/2019, art. 15 e Anexo V: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- Decreto nº 4.307/2002, arts. 55 a 57: https://www2.camara.leg.br/legin/fed/decret/2002/decreto-4307-18-julho-2002-472328-normaatualizada-pe.html
- Ministério da Defesa — composição da remuneração: https://www.gov.br/defesa/pt-br/acesso-a-informacao/perguntas-frequentes/ministerio-da-defesa
- CPEx — Orientação Técnica de Pagamento 10.1 (distinção entre remuneração e direitos remuneratórios): https://cpex.eb.mil.br/images/assuntos_legislacao_consignacao/Orienta%C3%A7%C3%A3o_T%C3%A9cnica_de_Pagamento_10.1_-_Consigna%C3%A7%C3%B5es_-_Margem_Consign%C3%A1vel_e_M%C3%ADnimo_Legal.pdf
