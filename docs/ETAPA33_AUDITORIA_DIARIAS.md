# Etapa 33 — Auditoria funcional e normativa das diárias

## Escopo
Revisão da calculadora de diárias militares no País, com base na Etapa 32. A identidade visual e a estrutura geral do Milico Audaz foram preservadas. A revisão se limita à simulação e não decide concessão administrativa.

## Achados relevantes

1. **Cálculo anterior excessivamente presumido:** o formulário recebia apenas a quantidade total de dias e calculava automaticamente todos os dias, exceto um, como integrais, e o último como meia diária. Isso não permitia representar corretamente afastamentos sem pernoite ou com alojamento/pousada fornecida.
2. **Auxílio-transporte deduzido automaticamente:** a versão anterior subtraía um valor diário de auxílio-transporte das diárias. Essa dedução não aparece nos arts. 18 a 20 do Decreto nº 4.307/2002. A dedução automática foi retirada; eventual ajuste administrativo não é presumido.
3. **Gratificação de representação:** a mensagem anterior dizia que diárias não acumulavam com gratificação de representação. O art. 19 do Decreto nº 4.307/2002 não estabelece essa vedação. A mensagem foi removida por falta de suporte no dispositivo citado.
4. **Acréscimo de embarque/desembarque:** o formulário agora identifica o número de localidades de destino com acréscimo, usa R$ 95,00 como referência do Anexo IV e permite indicar uso de veículo oficial nos trajetos do art. 20, § 2º. Quando marcado, o acréscimo é zerado, mantendo-se a diária se aplicável.
5. **Condições que afastam diárias:** o formulário explicita afastamento inferior a oito horas, cobertura conjunta de alimentação, pousada e locomoção urbana, e movimentação com mudança de sede e desligamento da OM. Quando o usuário marca uma dessas condições, o cálculo zera diárias e acréscimo, apresentando a razão.
6. **Separação entre diária integral e meia diária:** o usuário informa diretamente a quantidade de dias integrais e meias diárias. Meias diárias incluem dia sem pernoite, dia com alojamento/pousada gratuita e dia do retorno, nos termos do art. 18, II.

## Base normativa consultada

- Decreto nº 4.307/2002, art. 18: diária em afastamento de até três meses; integral quando houver pernoite fora da sede e não houver alojamento/pousada gratuita; meia diária quando não houver pernoite, quando houver alojamento/pousada gratuita e no dia do retorno. O § 1º prevê indenização da alimentação pelo valor da etapa local se fornecida por OM nas hipóteses indicadas; o cálculo dessa indenização não está implementado. O § 2º trata de afastamento acima de três meses, hipótese em que somente é devida ajuda de custo.
- Decreto nº 4.307/2002, art. 19: hipóteses sem diária, incluindo cobertura conjunta de alimentação, pousada e locomoção urbana; vedação cumulativa com ajuda de custo; ausência de diária em movimentação com mudança de sede e desligamento de OM; e afastamento inferior a oito horas consecutivas.
- Decreto nº 4.307/2002, art. 20, §§ 1º e 2º: acréscimo por localidade de destino e exceção pelo uso de veículo oficial nos trajetos descritos.
- Decreto nº 4.307/2002, art. 21: restituição integral ou parcial quando o afastamento não ocorre ou termina antes do prazo previsto.
- Decreto nº 4.307/2002, art. 22: diária correspondente à autoridade superior em hipótese específica, mediante ato próprio e obrigatoriedade de hospedagem no mesmo local.
- Anexo III do Decreto nº 4.307/2002, com valores atualizados pelo Decreto nº 12.324/2024, vigentes a partir de 1º/1/2025.
- Anexo IV do Decreto nº 4.307/2002: acréscimo de R$ 95,00.

## Valores de referência do Anexo III

| Grupo | Brasília, Manaus, Rio de Janeiro e São Paulo | Outras capitais | Demais localidades |
|---|---:|---:|---:|
| Comandantes de Força / Natureza Especial | R$ 800,00 | R$ 700,00 | R$ 650,00 |
| Oficiais-generais | R$ 600,00 | R$ 515,00 | R$ 455,00 |
| Oficiais-superiores | R$ 510,00 | R$ 450,00 | R$ 395,00 |
| Oficiais intermediários, subalternos e aspirantes a oficial | R$ 425,00 | R$ 380,00 | R$ 335,00 |
| Subtenentes, sargentos, aspirantes e cadetes | R$ 425,00 | R$ 380,00 | R$ 335,00 |
| Alunos de formação listados no anexo | R$ 355,00 | R$ 315,00 | R$ 280,00 |
| Demais praças e praças especiais | R$ 355,00 | R$ 315,00 | R$ 280,00 |

## Limitações ainda não modeladas

- Não coleta datas e horários de partida/retorno; portanto, não calcula duração automaticamente nem identifica afastamento acima de três meses.
- Não calcula indenização de alimentação por etapa quando alimentação é fornecida por OM nas hipóteses do art. 18, § 1º.
- Não calcula restituições previstas no art. 21.
- Não implementa a hipótese especial do art. 22 (acompanhamento de autoridade superior).
- Não calcula ou compara a ajuda de custo em hipótese de enquadramento simultâneo; o art. 18, § 3º, prevê pagamento do direito pecuniário de menor valor.
- O campo de localidades com acréscimo é preenchido pelo usuário; a ferramenta não audita trajetos nem a utilização de veículo oficial.
- Não foi localizada nesta etapa uma cópia oficial primária completa das normas internas do Exército citadas em versões anteriores. Por isso, não se usa a antiga dedução automática de auxílio-transporte nem se reproduz a antiga mensagem sobre não acumulação com gratificação de representação.

## Testes adicionados

- Cálculo de dias integrais e meias diárias separados.
- Afastamento inferior a oito horas.
- Cobertura conjunta de alimentação, pousada e locomoção urbana.
- Movimentação com mudança de sede e desligamento da OM.
- Uso de veículo oficial: suprime apenas o acréscimo.
- Rejeição de valores negativos, frações e excesso de dias.
- Confirmação de ausência de dedução automática de auxílio-transporte e de mensagem sem amparo sobre gratificação de representação.

## Conclusão
A calculadora agora permite simular cenários com diárias integrais e meias diárias sem presumir automaticamente a composição do afastamento. Foram retiradas duas premissas que não estavam sustentadas pelo dispositivo normativo indicado: desconto automático de auxílio-transporte e vedação geral com gratificação de representação. A ferramenta continua sendo simulador, não homologação jurídica ou administrativa.
