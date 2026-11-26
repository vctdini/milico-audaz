# Andamento da auditoria — Milico Audaz

**Última etapa:** Auditoria 07 — compensação pecuniária de temporários e ajuda de custo/movimentação.  
**Código-fonte:** preservado, sem alteração de fórmulas nesta etapa.

## Divergências e pendências registradas

- AUD-001 — adicional histórico de 1,5% aplicado ao militar ativo: divergência documentada.
- AUD-002 — FuSEx e quota complementar deduzidos do IRRF mensal: divergência relevante, com validação jurídico-tributária final pendente após nova evidência do CRP/CPEx.
- AUD-003 — desconto simplificado forçado no IR do 13º: divergência documentada.
- AUD-004 — dedutibilidade da contribuição de pensão militar no IRRF: pendente, com evidência oficial da Receita sobre montepio militar e evidência CPEx do CRP.
- AUD-005 — base compartilhada PM/FuSEx: não homologada; base por categoria pendente.
- AUD-006 — quota complementar FuSEx independente do cadastro categorizado de dependentes: inconsistência funcional documentada.
- AUD-007 — assistência pré-escolar: regra/valor e histórico parcialmente verificados; composição remuneratória para faixa ainda pendente.
- AUD-008 — FuSEx: cadeia normativa, base e quotas: parcialmente confirmado; Portaria 508/2024 adicionada ao mapa normativo, sem confundir com ato de alíquota.
- AUD-009 — revisão das deduções de FuSEx e pensão militar no IRRF: pendente de validação final.

## Achados relevantes desta etapa

1. A Portaria C Ex nº 1.742/2022 (IG FuSEx) define categorias de contribuintes e, no art. 22, remete a contribuição a portaria específica do Comandante do Exército, com percentuais incidentes sobre parcelas que compõem pensão, remuneração ou proventos conforme a categoria.
2. A Portaria DGP/C Ex nº 508/2024 (EB30-IR-20.038) substituiu a antiga IR 30-38 e deve constar no banco legislativo como norma do SAMMED relacionada ao FuSEx. Seu art. 65 remete o valor da contribuição à portaria específica do Comandante do Exército.
3. A referência da PLOA 2025 a aumento da contribuição padrão para 3,5% é uma justificativa/projeção orçamentária, não prova de que a alíquota foi alterada por ato normativo publicado. Não alterar o percentual com base apenas nessa referência.
4. A Receita Federal (Perguntas e Respostas IRPF 2026, pergunta 336) reconhece dedutibilidade de contribuições para montepio civil ou militar quando destinadas a benefícios complementares aos da Previdência Social. O CPEx agrega FuSEx e pensão militar na linha do CRP chamada “Contribuição Previdenciária Oficial”; a natureza distinta do FuSEx exige interpretação e confirmação adicional antes de usar essa classificação como fundamento para dedução mensal.

## Próximas tarefas

1. Localizar cópias oficiais e cadeia completa de alterações das Portarias 662/2019 e 1.347/2020, inclusive eventual ato posterior que tenha alterado a alíquota.
2. Obter texto oficial da Portaria 1.742/2022 e da Portaria 430/2022 na SGEx/MDLegis.
3. Homologar base de contribuição por rubrica e por categoria (ativa, inatividade, pensionista, contribuinte não beneficiário da AMH).
4. Verificar com documentação oficial do CPEx o significado fiscal do CRP para retenção mensal e ajuste anual.
5. Só então alterar motor e testes.

**Nota:** a auditoria não está concluída. A ausência de revogação localizada não é tratada como prova absoluta de vigência. Fontes auxiliares e cópias não oficiais são identificadas como tais.


## Achados da Auditoria 07

- AUD-010 — compensação pecuniária: Lei 7.963/1989 e Decreto 99.425/1990 mapeados. Elegibilidade restrita ao licenciamento ex officio por término de prorrogação; 1 remuneração por ano; fração >=180 dias conta como ano; serviço obrigatório excluído; hipóteses de exclusão e parcelas não integrantes da base registradas. Ferramenta continua “Em breve”; especificação legal criada, cálculo ainda não implementado.
- AUD-011 — ajuda de custo/movimentação: multiplicadores do Anexo V da Lei 13.954/2019 comparados com `FN.ajuda()`. Os fatores a–f estão em grande parte alinhados, mas permanecem pendentes a validação da base remuneratória, a correspondência Suboficial/Subtenente na situação f, a elegibilidade em movimentação por interesse próprio, a confirmação de desligamento na hipótese de localidade especial A e a coleta de datas para comissões/cursos.
- Banco `normas-2026.json` recebeu Lei 7.963/1989, Decreto 99.425/1990 e Decreto 2.040/1996 (R-50).
- Nenhuma fórmula foi alterada.

## Achados da Auditoria 08

- AUD-012 — tempo de serviço e passagem para a reserva: a ferramenta continua sem implementação. Foram mapeados os arts. 135 a 137 (tempo efetivo x anos de serviço), art. 97 (35 anos totais e requisito distinto de atividade de natureza militar), art. 22 da Lei 13.954/2019 (transição na data de 17/12/2019), arts. 50 e 56 (proventos/quota de soldo) e MP 2.215-10/2001, Anexo II, Tabela VI (adicional de permanência após 720 dias além do tempo exigido e acréscimo de 5% por promoção).
- O contracheque permite informar adicional de permanência manualmente; não verifica o tempo excedente nem as promoções que justificam o percentual. Classificação: parcialmente validado.
- O motor compara ATS e disponibilidade e aplica o maior. O Decreto 10.471/2020 confirma a vedação de cumulação e a regra do adicional mais vantajoso; elegibilidade do ATS e histórico do maior percentual de disponibilidade permanecem pendentes.
- Incluído o Decreto 10.471/2020 no catálogo de normas, com início de vigência em 01/09/2020.
- Nenhuma fórmula foi alterada nesta etapa.

## Achados da Auditoria 09

- AUD-013 — diárias: valores do Anexo III e acréscimo do Anexo IV conferidos com Decreto 4.307/2002 consolidado e Decreto 12.324/2024. O motor não coleta fatos essenciais (pernoite, hospedagem, alimentação fornecida, garantia integral das despesas, duração superior a três meses, ajuda de custo, uso de veículo oficial, itinerário multi-cidade e afastamento funcional); cálculo atual presume automaticamente dias integrais antes do retorno e meia diária no retorno. Classificação: não validada para cálculo final.
- AUD-014 — gratificação de representação: percentuais de 10% e 2%, proporcionalidade do cargo e acumulação da GR mensal com eventual conferem com Lei 13.954/2019, Anexo IV, e Decreto 11.002/2022, art. 4º. Lacunas: falta distinguir hipóteses eventuais mutuamente exclusivas, coletar autorização, aplicar precedência das diárias e refletir integralmente as hipóteses atualizadas pelo Decreto 13.052/2026. Classificação: parcialmente validada.
- Valores codificados das diárias coincidem com Anexo III alterado pelo Decreto 12.324/2024; acréscimo de embarque/desembarque de R$95,00 coincide com Anexo IV. Isso não valida a fórmula de concessão.
- Adicionados ao catálogo o Decreto 12.324/2024, a Portaria 290-DGP/2013 (cópia institucional localizada; vigência/alterações pendentes) e a Portaria GM-MD 4.074/2024 (aplicabilidade específica ainda pendente).
- Nenhuma fórmula foi alterada nesta etapa.

## Achados da Auditoria 10

- AUD-015 — auxílio-transporte: Decreto 12.117/2024 confirma 22 dias, tarifa de menor custo e desconto de 6% do soldo proporcional a 22 dias. A fórmula implementada usa campo genérico `dias` multiplicando a despesa e não separa dias com transporte custeado pela União; faltam percurso, integração modal, situação funcional e declaração. Classificação: não validada para cálculo final.
- AUD-016 — auxílio-alimentação: multiplicadores 10, 5 e 1 conferem com a Tabela III do Anexo IV da MP 2.215-10/2001; etapa comum de R$ 13,50 confirmada na Portaria Normativa 19/MD/2017, alterada pela Portaria GM-MD 2.774/2025. A interface não verifica as condições de cada hipótese, e “outras situações” agrupa alíneas distintas. Classificação: não validada para cálculo final.
- AUD-017 — ajuda de custo para cursos: fatores 3 (situação b) e 2 (situação c), com metade sem dependente, conferem com o Anexo V da Lei 13.954/2019. Porém, datas reais não são coletadas e a caixa de GR 10% não é lida por `FN.ajuda()`; `perfil()` zera a GR. Composição da remuneração de referência segue pendente. Classificação: parcialmente validada.
- `normas-2026.json` recebeu Portaria Normativa 19/MD/2017 e registro cauteloso da referência institucional à Portaria 849/2016 (texto integral e alterações pendentes).
- Nenhuma fórmula foi alterada nesta etapa. Os 62 testes de regressão existentes passaram; eles não cobrem a validação jurídica dessas três calculadoras.

## Achados da Auditoria 11

- AUD-018 — pensão alimentícia: a página executa apenas base × percentual e remete a decisão/acordo. O art. 13, VI, da Lei 13.954/2019 classifica a pensão como desconto obrigatório, mas não cria percentual/base universal. IN RFB 1.500/2014, arts. 52, I, 101 e 102, condiciona dedução fiscal a título admitido e comprovantes; a obrigação alimentar e a dedução no IR devem ser tratadas separadamente. Classificação: parcialmente validada como simulador aritmético.
- AUD-019 — TAF: Portaria EME/C Ex 850/2022 e Diretriz EB20-D-03.053 localizadas em PDF institucional; entrou em vigor em 01/01/2023 e revogou Portaria 032-EME/2008. Página institucional ECEME lista a Portaria 850/2022 como em vigor. Achado crítico em `taf.js`: provas não preenchidas são omitidas e `ok.every(i => i.suf)` pode retornar verdadeiro para lista vazia; erros também são excluídos da avaliação global. Padrão e PPM são selecionados manualmente sem coletar todos os dados de enquadramento. Índices dos Anexos A-D ainda precisam de comparação célula a célula. Classificação: não validada para resultado oficial.
- AUD-020 — IMC e juros: aritmética central compatível com as fórmulas adotadas. IMC carece de aviso de uso exclusivo das faixas adultas e validação de entradas. Juros compostos presume aportes no fim de cada mês, arredonda meses e não valida entradas negativas/limites de taxa. Classificação: parcialmente validadas matematicamente.
- Incluída Portaria EME/C Ex nº 850/2022 no `normas-2026.json`, com vigência inicial em 01/01/2023, revogação expressa da Portaria 032-EME/2008 e ressalva de conferência futura de alterações.
- Nenhuma fórmula ou interface foi alterada nesta etapa; os achados foram documentados antes da correção, conforme metodologia acordada.


## Diretriz funcional confirmada pelo usuário

- As calculadoras são simuladores: o usuário informa dados e o sistema calcula o cenário solicitado.
- A camada de calculadoras não decide elegibilidade nem bloqueia a simulação por falta de requisito jurídico.
- A auditoria valida fórmula, base, parâmetros, tabelas, proporcionalidade, cenários e memória de cálculo; requisitos legais podem aparecer como avisos informativos.
- A verificação de direito será módulo independente e futuro.
- Classificações de calculadora e verificação de direitos passam a ser independentes. Ver `DIRETRIZ-FUNCIONAL-CALCULADORAS.md`.

## Achados da Auditoria 12 — ferramentas ainda não implementadas

- AUD-021 — ajuste de contas: especificado como simulador de acerto por rubricas, não como decisão de direito. O material operacional do SIPPES/CPEx descreve ratificação de cálculos e inclusão de rubricas após desimplantação; o próprio manual de 2020 relata que a funcionalidade estava em processo de descontinuidade. Decreto 4.307/2002, arts. 80 e 81, fornece regras objetivas para adicional de férias e adicional natalino proporcionais. Portaria Normativa MD 28/2019 disciplina procedimento de indenização de férias não gozadas.
- AUD-022 — compensação pecuniária: regra central da Lei 7.963/1989 e exclusões de base do Decreto 99.425/1990 mapeadas para simulador. A interface deve receber remuneração por rubrica e tempo informado; não bloquear por elegibilidade. Base remuneratória completa por rubrica e fluxo de parcelamento seguem pendentes.
- AUD-023 — tempo de serviço: especificada calculadora de intervalos que separa tempo de efetivo serviço (Lei 6.880/1980, arts. 134 e 136) de anos de serviço/acréscimos (art. 137), com prevenção de sobreposição. Não verificará requisito de reserva nem reconhecimento administrativo.
- Incluída Portaria Normativa MD nº 28/2019 no catálogo legislativo, como norma procedimental sobre indenização de férias não gozadas.
- Nenhuma fórmula ou interface foi alterada nesta etapa.
