# AUD-005 — Base de incidência da contribuição para pensão militar e do FuSEx

**Status:** análise preliminar; conclusão jurídica pendente para a base dos militares da ativa e para a disciplina atual do FuSEx.  
**Prioridade:** alta.  
**Arquivo examinado:** `app.js` (Etapa 19).

## 1. Comportamento encontrado no código

A função `comp()` monta `f.base` como:

` s + am + hab + dd + co + pm + gle `

Ou seja, inclui soldo, adicional militar, habilitação, a maior parcela entre adicional de tempo de serviço e disponibilidade, compensação orgânica, permanência e gratificação de localidade especial. A gratificação de representação não integra essa base padrão. Lançamentos extras podem ser somados quando o usuário marca manualmente `Incide na base PM/FuSEx`.

A função `calcularDescontosObrigatorios()` aplica sobre a mesma base:
- 10,5% para pensão militar;
- 3% para FuSEx;
- quota complementar selecionada de 0,4% ou 0,5%.

## 2. Pensão militar — o que a lei permite afirmar

A Lei nº 3.765/1960, art. 1º, define militares das Forças Armadas e pensionistas como contribuintes obrigatórios. O art. 3º-A explicita a incidência sobre parcelas que compõem os proventos na inatividade e sobre o valor integral da quota-parte da pensão. O §2º fixa a alíquota em 10,5% desde 1º/1/2021. O §3º trata das contribuições extraordinárias de pensionistas de 3% e 1,5%.

A redação consultada não enumera, nesse art. 3º-A, a base rubrica a rubrica para militares da ativa. Portanto, não é correto usar apenas o art. 3º-A para homologar automaticamente a base `f.base` aplicada aos ativos. É necessário cruzar a Lei nº 3.765/1960, a MP nº 2.215-10/2001, o Decreto nº 11.002/2022 consolidado e as orientações/atos de execução da folha do Exército.

**Resultado:** alíquota de 10,5% confirmada como parâmetro legal geral desde 2021; composição da base dos ativos permanece pendente de homologação. A incidência sobre proventos na inatividade e quota-parte de pensão está expressamente descrita no art. 3º-A.

## 3. FuSEx — risco na base compartilhada

O código aplica 3% e quota complementar sobre `f.base`, que contém diversos adicionais e gratificações. A cartilha institucional do Hospital de Guarnição de Porto Velho, publicada em 2023, descreve contribuição padrão de 3% para titulares (incluindo cônjuge/companheiro) e quota complementar de 0,4% ou 0,5% segundo a quantidade/tipo de dependentes. O Acórdão TCU nº 3.236/2025 reproduz trecho de manual do FuSEx com essa mesma composição e informa teto total de 3,5%.

Há, ainda, precedente da Turma Nacional de Uniformização publicado no DOU em 2011 que afirma que a contribuição do FuSEx deve incidir sobre o soldo, sob pena de violação à reserva legal. Trata-se de precedente histórico e anterior aos atos internos cadastrados pelo projeto; ele não basta, isoladamente, para concluir a disciplina vigente em 2026, mas impede homologar sem exame a incidência sobre toda a remuneração.

**Resultado:** divergência potencial de alta prioridade. A base de FuSEx não deve ser considerada validada. Confirmar o texto integral e a vigência dos atos normativos atuais do Exército (incluindo Portarias C Ex nº 662/2019, 1.347/2020, 1.742/2022 e Portaria DGP/C Ex nº 430/2022), bem como eventual alteração posterior e o alcance da decisão judicial/TNU.

## 4. Quota complementar e cadastro de dependentes

O app apresenta uma seleção manual de 0%, 0,4% ou 0,5%. A descrição atual diferencia um dependente direto de mais de um dependente direto ou dependente indireto, excluindo o cônjuge/companheiro da contagem. Entretanto, o campo numérico `dep-fusex` não determina automaticamente a quota: o usuário precisa selecionar o percentual em um controle separado.

Isso cria risco de inconsistência entre o cadastro de dependentes e a contribuição estimada. Também falta, no motor, validação de categorias individuais de dependentes, vínculo ativo no CADBEN e hipóteses de suspensão/duplicidade de titularidade.

**Resultado:** regra de percentuais encontra apoio em material institucional secundário/operacional de 2023 e em trecho reproduzido pelo TCU, mas a aplicação automática e a elegibilidade de cada dependente não estão homologadas com norma primária atual.

## 5. Recomendações — sem alteração do motor nesta etapa

1. Não tratar a base única `f.base` como base legalmente homologada para PM e FuSEx.
2. Separar futuramente `basePensaoMilitarAtiva`, `basePensaoInatividade`, `basePensaoPensionista` e `baseFusex`.
3. Manter o percentual de 10,5% como parâmetro, mas não declarar homologada a base da ativa.
4. Não homologar 3%/0,4%/0,5% sobre a base ampla atual até confirmar a legislação primária e a jurisprudência aplicável.
5. Vincular a quota complementar ao cadastro categorizado de dependentes FuSEx e validar os dados do CADBEN; manter opção manual apenas como simulação explicitamente não oficial.
6. Criar testes por rubrica e situação funcional depois da definição normativa das bases.

## 6. Fontes consultadas

- Lei nº 3.765/1960, texto compilado oficial: https://planalto.gov.br/ccivil_03/leis/l3765compilado.htm
- Lei nº 13.954/2019, texto oficial: https://planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- MP nº 2.215-10/2001, texto oficial: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
- Decreto nº 11.002/2022, texto no Senado: https://legis.senado.leg.br/norma/35577723/publicacao/35584987
- Cartilha institucional FuSEx HGuPV (2023): https://hgupv.eb.mil.br/images/Arquivos_2022/Imagens/Cartilha_FuSEx_HGuPV_JUN2023.pdf
- Acórdão TCU nº 3.236/2025, Segunda Câmara: https://pesquisa.apps.tcu.gov.br/doc/acordao-completo/3236/2025/Segunda%20C%C3%A2mara
- DOU de 24/05/2011, decisão TNU sobre base de cálculo do FuSEx: https://www.gov.br/mme/pt-br/arquivos/do-24-05-2011-s1.pdf

**Limitação:** fontes institucionais de orientação e decisões judiciais são evidência auxiliar; não substituem o texto primário integral e atualizado das portarias do Exército. Não foi possível concluir, nesta rodada, a vigência e a cadeia completa de alterações de todas as portarias FuSEx.
