# Inventário preliminar de parâmetros legais e regras

**Estado:** inventário inicial com uma primeira conferência de fontes oficiais; ainda não é auditoria jurídica integral.  
**Objetivo:** identificar onde vivem valores e regras que podem precisar de atualização e preparar uma fonte única confiável antes de conectar dados ao Supabase.

## Como ler este inventário

- **Parâmetro de vigência:** tabela, valor, percentual, faixa ou limite que pode mudar por norma ou data e que deve poder ser atualizado sem reescrever a fórmula.
- **Regra de cálculo:** operação, condição ou elegibilidade. Alteração de regra exige revisão da lógica no código; não deve ser feita por texto livre ou fórmula enviada pelo banco.
- **Entrada do usuário:** informação individual ou valor que deve continuar sendo informado pelo usuário; não é um parâmetro legal geral.
- As normas indicadas abaixo são as que as páginas do projeto citam ou associam aos cálculos. A correspondência entre cada valor, dispositivo e redação vigente ainda precisa ser conferida em fonte oficial.

## Parâmetros candidatos a uma fonte central

| Área / calculadora | Valores e tabelas atualmente no projeto | Onde estão hoje | Referência atualmente exibida ou associada | Tipo / observação |
|---|---|---|---|---|
| Soldo por posto/graduação | Tabela de soldos por posto, graduação e alunos; conjunto de postos/QE e associações de círculo | `app.js` (`D.POSTOS`, inicialização e montagem de postos) e listas HTML | Lei nº 15.167/2025, com valores indicados como vigentes desde jan/2026, na página de legislação | Parâmetro versionado por vigência; há dados também em HTML que devem deixar de ser duplicados |
| Adicional militar | Percentual por círculo: OG 28%, superior 25%, intermediário 22%, subalterno 19%, sargentos 16%, praças 13% | `app.js` (`D.CIRC`) | MP nº 2.215-10/2001 e Lei nº 13.954/2019, conforme a página de legislação | Parâmetro de tabela |
| Adicional de disponibilidade militar | Percentuais associados aos postos/graduações, inclusive QAO e QE | `app.js` (`D.POSTOS`, propriedade `disp`, aliases/clones) e opções HTML | Lei nº 13.954/2019; a interface permite também percentual máximo alcançado na ativa | Tabela mais regra de elegibilidade. Não é apenas um percentual global |
| Adicional de habilitação | Percentuais de 12%, 27%, 45%, 68% e 73% | Opções HTML repetidas nas calculadoras; cálculo em `app.js` | Lei nº 13.954/2019, Anexo III, citada nas páginas | Parâmetros de tabela; separar dos cursos/equivalências individuais |
| Adicional de tempo de serviço | Percentual histórico informado pelo usuário; código compara ATS e disponibilidade | Perfil e `app.js` | Lei nº 13.954/2019 e regra de direito adquirido referida na interface | Entrada individual + regra de precedência; não publicar como percentual geral |
| Compensação orgânica | Percentual e posto de referência selecionados pelo usuário | Perfil e `app.js` | Decreto nº 4.307/2002 e norma específica da atividade, conforme a interface | Entrada individual/condicional; percentual autorizado não é uma constante para todos |
| Adicional de permanência | Percentual informado; a interface menciona 5% após 720 dias e acréscimo por promoção | Perfil e `app.js` | Decreto nº 4.307/2002, art. 10, citado nas referências do projeto | Regra parametrizável por percentuais e condição temporal; requer conferência individual |
| Gratificação de localidade especial | Percentuais Categoria A 20% e Categoria B 10%; cadastro auxiliar de localidades | `app.js`, `movimentacao.html`, `js/localidades-gle.js` | MP nº 2.215-10/2001, Anexo III, e Portaria GM-MD nº 379/2022, com alterações | Percentuais e dados de localidade; classificação também depende de critérios geográficos e vigência |
| Gratificação de representação | 10% para oficial-general/comando e 2% por dia em hipóteses eventuais | `app.js` (`calcularGratificacaoRepresentacao`) | Lei nº 13.954/2019, Anexo IV; Decreto nº 11.002/2022, conforme a interface | Percentuais são parâmetros; acumulação/eligibilidade é regra de cálculo |
| Pensão militar | 10,5% e parcela histórica adicional de 1,5% quando aplicável | `app.js` (`calcularDescontosObrigatorios`) | MP nº 2.215-10/2001 e Lei nº 13.954/2019, referidas nas páginas | Percentual + condição histórica de opção; auditar regra e população atingida antes de migrar |
| FuSEx | Desconto-base de 3%; cotas de dependentes com opções 0,4% e 0,5%; isenções por enquadramento | `app.js`, `contracheque.html`, catálogo/perfil | Lei nº 13.954/2019 e IG FuSEx (Portaria C Ex nº 1.742/2022, citada no código) | Percentuais e elegibilidade; cotas/isenções não são um único valor universal |
| Imposto de renda mensal | Tabela chamada `IR2026`: limites de faixa, alíquotas, parcelas, dedução por dependente, desconto simplificado e redução gradual | `app.js` (`IR2026`) | Lei nº 15.270/2025 é citada para redução mensal; tabela completa e vigência precisam de validação | Conjunto de parâmetros por ano-calendário; separar cálculo mensal, férias e 13º conforme a regra |
| Salário-família | Crédito unitário de R$ 0,16 | `app.js` | Portaria nº 7-GB/1968, reproduzida em orientação de SVP do Exército; rubrica também consta em contracheque CPEx de 2025 | Valor corroborado; precisa contar somente dependentes elegíveis, não o total genérico cadastrado |
| Assistência pré-escolar | Teto de R$ 526,64 desde 01/05/2026; soldo-base de referência R$ 1.927; faixas de participação de 5%, 10%, 15%, 20% e 25% | `app.js` (`calcularAssistenciaPreEscolar` e chamada) | Portarias GM-MD nº 1.113/2024 e nº 3.019/2026 | Teto e faixas confirmados; confirmar datas para períodos anteriores e incidência em folha |
| Adicional de férias e natalino | 1/3 da remuneração; cálculo proporcional por meses, primeira parcela de 50% | `app.js` | Decreto nº 4.307/2002, art. 80, para férias; referências do adicional natalino precisam ser consolidadas | Parte é fórmula; eventuais bases, datas e incidências precisam de validação |
| Margem consignável | Limite de 70% dos rendimentos permanentes e reserva de 10% do soldo | `app.js` (`calcularMargemConsignavel`) | A referência legal precisa ser consolidada na página correspondente | Percentuais dentro da fórmula; validar base e exceções antes de tornar configuráveis |
| Auxílio-transporte | Cota-parte de 6% do soldo proporcional a 22/30; máximo de 22 dias | `app.js` (`calcularAuxilioTransporte`) e formulário | Decreto nº 12.117/2024; Portaria nº 849-Cmt Ex/2016 e demais referências da interface | Limites/percentuais potencialmente atualizáveis; tarifas reais vêm do usuário |
| Auxílio-alimentação | Etapa comum de R$ 13,50; 10 etapas para 24h, 5 para expediente acima de 8h e abaixo de 24h, 1 em outras hipóteses; teto conjunto de 10 dias nas primeiras hipóteses | `app.js`, `auxilio-alimentacao.html`, `D.ETAPA` | MP nº 2.215-10/2001, Anexo IV, Tabela III; Decreto nº 4.307/2002, arts. 65–75; Portaria GM-MD nº 2.774/2025 | Valor de etapa e multiplicadores/limites devem ser validados. `D.ETAPA` aparenta não ser consumido pelo cálculo atual; formulário usa valor próprio |
| Diárias | Tabela de valores por círculo/categoria de destino; meia diária; critérios de duração, exclusões e acréscimos | `app.js` (`D.DIAR`, `calcularDiarias`) e `diarias.html` | Decreto nº 12.324/2024 e Decreto nº 4.307/2002, conforme a página de legislação | Valores confirmados desde 01/01/2025; critérios são regras separadas |
| Ajuda de custo / movimentação | Fatores 2×, 4×, metade sem dependentes, hipóteses de 1×+1× e 2×+1× para comissões, e 8× na inatividade | `app.js` (`FN.ajuda`), `movimentacao.html`, `ajuda-custo-cursos.html` | Lei nº 13.954/2019, art. 15 e Anexo V; Decreto nº 4.307/2002; R-50 e normas do Exército citadas | Predominantemente regra/elegibilidade, não simples configuração; depende de dependentes, natureza e situação |
| Compensação pecuniária | Uma remuneração por ano computável, arredondamento de fração de 180 dias; exclusão do serviço obrigatório; férias calculadas em linhas separadas | `js/compensacao-pecuniaria.js` | Lei nº 7.963/1989 e Portaria Normativa nº 28/2019, citadas pelo módulo | Fórmula e critérios de elegibilidade; precisam de auditoria jurídica específica |
| TAF | Tabelas por sexo, idade, evento, índices e menções | `taf-dados.js`, `taf.js` | Portaria EME nº 850/2022, indicada em `legislacao.html` | Dados de referência estruturados; verificar se a tabela continua vigente e se corresponde ao público da calculadora |

## Resultado da primeira conferência de fontes

Esta seção registra somente o que foi possível conferir nesta etapa. “Confirmado” se refere ao dispositivo/valor citado, não a todos os detalhes de implementação e incidências do cálculo.

| Grupo | Resultado da conferência | Consequência para a centralização |
|---|---|---|
| Soldos | A tabela do projeto corresponde aos valores do Anexo I da Lei nº 15.167/2025, com efeitos conforme as datas do próprio anexo. | Pode ser tratada como tabela anual versionada, após conferir as datas de vigência de cada parcela e os mapeamentos de postos/QE. |
| Adicional de disponibilidade | A Lei nº 13.954/2019, Anexo II, confirma a tabela por posto/graduação e regras especiais, inclusive QE. Nota técnica da Secretaria de Economia e Finanças do Exército interpreta que o militar do QAO conserva o percentual de subtenente alcançado na carreira (32%), aplicado ao soldo atual do posto QAO. | Percentuais confirmados. A apuração correta é o maior percentual do histórico na ativa, não necessariamente o percentual associado apenas ao posto atual; o formulário precisa deixar isso claro. |
| Adicional militar | A tabela do Anexo II da MP nº 2.215-10/2001 prevê 13% para praças de graduação inferior a terceiro-sargento, exceto as que prestam serviço militar inicial. | O cálculo agora zera o adicional militar para soldado do efetivo variável/recruta e mantém 13% para as demais praças abrangidas pela faixa. |
| Adicional de habilitação e representação; ajuda de custo | Anexos III, IV e V da Lei nº 13.954/2019 confirmam percentuais/fatores principais usados no código. A incidência concreta e elegibilidade continuam sendo regras separadas. | Valores podem ser versionados; não transformar elegibilidade em configuração livre sem revisão do código e cenários de referência. |
| IRRF mensal 2026 | A Receita Federal publica a tabela mensal e dedução por dependente/desconto simplificado usados no projeto. A Lei nº 15.270/2025 também dá suporte à redução de imposto aplicada por faixa em 2026. | Tabela e redução devem ficar agrupadas por ano-calendário. A base tributável montada pelo simulador ainda precisa de auditoria independente. |
| Pensão militar | Lei nº 3.765/1960, art. 3º-A, com redação da Lei nº 13.954/2019, dá suporte à contribuição de 10,5% desde 2021. A alíquota histórica de 1,5% é associada ao regime de opção legado da MP nº 2.215-10/2001, não a uma cobrança automática universal. | A opção e o universo de pessoas elegíveis precisam permanecer explícitos e ser auditados por perfil; não aplicar 1,5% a todos. |
| FuSEx | As IG aprovadas pela Portaria C Ex nº 1.742/2022 confirmam quem contribui e excluem alunos CPOR/NPOR e cabos/soldados do Efetivo Variável. Material explicativo oficial do Exército indica contribuição padrão de 3%, cota complementar de 0,4% ou 0,5%, total máximo de 3,5%. | O usuário informa manualmente o número cadastrado no FuSEx e seleciona a cota complementar aplicável; o simulador assume esses dados corretos e não tenta deduzi-los do total de dependentes. |
| Assistência pré-escolar | A Portaria GM-MD nº 1.113/2024 confirma faixa de nascimento a cinco anos, participação de 5% a 25%, base soldo de referência e faixas conforme remuneração. A Portaria GM-MD nº 3.019/2026 fixou o valor em R$ 526,64 em todo o território nacional, com efeitos desde 01/05/2026, revogando a Portaria Conjunta MGI/MD nº 31/2024. | O valor de R$ 526,64 no código está confirmado a partir de maio de 2026. Manter histórico do valor anterior (R$ 484,90 até abril de 2026) e aplicar vigência correta em simulações retroativas. |
| Auxílio-alimentação | A Portaria Normativa nº 19/2017 e alteração GM-MD nº 2.774/2025 dão suporte ao valor de etapa comum de R$ 13,50 consultado nesta rodada. | O valor tem suporte; confirmar separadamente os limites, classificações de jornada e tratamento de dias nas fórmulas do projeto. |
| Salário-família | Orientação oficial da SVP do 13º BIB transcreve a Portaria nº 7-GB/1968, informa R$ 0,16 por dependente elegível e descreve categorias/condições específicas; contracheque oficial do CPEx de outubro de 2025 também registra a rubrica por R$ 0,16. | O usuário informa manualmente a quantidade de dependentes que considera elegíveis; o simulador assume que o número preenchido atende aos critérios e calcula R$ 0,16 por dependente informado. |
| Diárias nacionais | O Anexo III consolidado do Decreto nº 4.307/2002, com redação dada pelo Decreto nº 12.324/2024 e efeitos desde 01/01/2025, confirma os valores atuais em `D.DIAR` por círculo e destino. | Tabela monetária confirmada para a vigência corrente localizada. Preservar grupos e condições de elegibilidade como regras separadas e usar a tabela correta em simulações históricas. |
| Bagagem e cubagem | O Anexo I do Decreto nº 4.307/2002 confirma limites por posto/graduação, automóvel (12 m³) e motocicleta (3 m³); os limites cadastrados em `CUBAGEM_MOV` correspondem às classes aplicáveis. O Anexo II consolidado reproduz as tarifas por faixa hoje em `TABELA_TARIFA_BAGAGEM`. O art. 38, § 4º, prevê tabela estabelecida anualmente por ato do Ministro da Defesa. | Os literais correspondem à tabela hoje constante do decreto consolidado. Como a norma prevê atualização anual por ato ministerial, registrar a fonte/data da conferência; a busca não encontrou ato posterior substitutivo. Revalidar antes de cada atualização anual. |

### Fontes oficiais consultadas nesta etapa

- [Lei nº 15.167/2025 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15167.htm)
- [Lei nº 13.954/2019 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm)
- [MP nº 2.215-10/2001 — Planalto](https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm)
- [Lei nº 3.765/1960 — Planalto](https://www.planalto.gov.br/ccivil_03/leis/l3765.htm)
- [Tabela do IRPF 2026 — Receita Federal](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026)
- [Lei nº 15.270/2025 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm)
- [Nota Técnica nº 14/ASSE1/SSEF/SEF/2020 — Exército (interpretação do ACDM no QAO)](https://12cgcfex.eb.mil.br/images/4secao/2020/Nota_Tcnica_n_14-ASSE1-SSEF-SEF_de_25_JUN_20.pdf)
- [Portaria GM-MD nº 3.019/2026 — transcrição do ato publicado no DOU](https://www.sijur.com.br/dou/2026/05/29/portaria-gm-md-3-019-gabinete-do-ministro.html) (publicada em 29/05/2026)
- [Portaria GM-MD nº 1.113/2024 — MDLegis](https://mdlegis.defesa.gov.br/norma_html/?ANO=2024&NUM=1113&SER=A)
- [Portaria Conjunta MGI/MD nº 31/2024 — Diário Oficial](https://legis.sigepe.gov.br/sigepe-bgp-ws-legis/legis-service/download/?id=0019207993-ALPDF%2F2024)
- [Portaria C Ex nº 1.742/2022 — IG FuSEx, SGEx](https://www.sgex.eb.mil.br/sg8/002_instrucoes_gerais_reguladoras/01_gerais/port_n_1742_cmdo_eb_18maio2022.html) (fonte primária listada pelo Exército; indisponível para leitura automatizada nesta consulta)
- [Portaria Normativa GM-MD nº 2.774/2025 — MDLegis](https://mdlegis.defesa.gov.br/norma_html/?ANO=2017&NUM=19&SER=A)
- [Cartilha FuSEx do Hospital de Guarnição de Porto Velho, 2023 — Exército](https://hgupv.eb.mil.br/images/Arquivos_2022/Imagens/Cartilha_FuSEx_HGuPV_JUN2023.pdf) (material oficial explicativo, usado como apoio; falta conferência consolidada da norma primária)
- [Orientações da SVP do 13º BIB sobre salário-família — Exército](https://13bib.eb.mil.br/images/SIP/Orientaes_aos_Inativos_e_Pensionistas_01_junho_23_11h.pdf) (transcreve a Portaria nº 7-GB/1968; documento explicativo de 2023)
- [Decreto nº 4.307/2002 consolidado — Planalto](https://www.planalto.gov.br/ccivil_03/decreto/2002/d4307.htm)

## Valores e dados que não devem ser tratados como parâmetros legais globais

| Item | Tratamento recomendado | Motivo |
|---|---|---|
| Tarifa de ida/volta de transporte coletivo | Permanece como entrada do usuário | Varia por percurso/localidade e data |
| Pensão alimentícia | Permanece como entrada definida no título judicial | Percentual/base/valor dependem da decisão de cada pessoa |
| Compensação orgânica, ATS, permanência, GLE efetivamente recebida | Permanece como dado do perfil/usuário, sujeito a validação | Depende da trajetória funcional, atividade e ato individual |
| Distância e rota rodoviária | Entrada ou consulta estimativa com revisão manual | A rota depende do trajeto; OSRM/Nominatim não são tarifa legal |
| Transporte de pessoal a R$ 0,50/km | Marcado como estimativa atual | O próprio resultado informa que não é tarifa oficial; não classificar como valor normativo sem base oficial |
| Tabela de tarifa/cubagem de bagagem e veículos | Permanece como tabela legal versionada com checagem anual | Valores correspondem aos Anexos I e II do Decreto nº 4.307/2002 consolidado; o art. 38, § 4º, prevê atualização anual por ato do Ministro da Defesa |
| Rubricas extras e incidências do contracheque | Permanece configurável pelo usuário | A incidência depende da rubrica e situação individual; não inferir automaticamente sem fonte |
| Calculadoras de IMC e juros compostos | Fórmulas matemáticas, sem parâmetro legal do produto identificado | Não precisam integrar a base legislativa salvo futura decisão de produto |

## Pontos técnicos encontrados

1. `app.js` concentra a tabela de postos, parte dos percentuais, tabelas de diárias e várias fórmulas de múltiplas calculadoras.
2. Há percentuais e valores repetidos em HTML e JavaScript. Uma alteração pode deixar a interface e o cálculo divergentes.
3. `IR2026`, a tarifa de bagagem/cubagem e a tarifa estimativa de transporte de pessoal são outros grupos de literais fora da tabela `D`.
4. `D.SM` (R$ 1.621,00) e `D.ETAPA` (R$ 13,50) existem na declaração inicial; a busca de referências no código não encontrou consumidores de `D.SM`, e o formulário de alimentação tem seu próprio valor de etapa. Confirmar se estão obsoletos antes de removê-los.
5. `legislacao.html` é atualmente um catálogo estático de links oficiais. Os dispositivos associados a cada calculadora aparecem em textos e comentários dispersos.
6. `js/localidades-gle.js` é uma transcrição auxiliar e já alerta que não cobre, por si só, critérios geográficos e atualizações normativas.
7. Não foi encontrada configuração de build ou suíte de testes na raiz. A introdução de parâmetros remotos exigirá pelo menos cenários de referência e uma indicação visível da versão/data carregada.

## Proposta de classificação para a próxima etapa

Antes de criar tabelas no Supabase, cada item acima deve receber:

- identificador estável (ex.: `irpf.mensal.2026.faixa_1.limite`);
- tipo e unidade (R$, percentual, dias, multiplicador, lista/tabela);
- norma, artigo/anexo/tabela e URL oficial;
- data inicial/final de vigência e jurisdição/público abrangido;
- regra de cálculo que consome o parâmetro;
- estado de validação (`pendente`, `conferido`, `publicado`) e data/revisor;
- cenário de referência que permita comparar antes/depois.

Decisão funcional: requisitos individuais que não podem ser inferidos com segurança (como elegibilidade ao salário-família e categoria/cota FuSEx) são informados pelo usuário. O cálculo aceita esses dados como verdadeiros para a simulação, sem afirmar que o cadastro oficial foi validado. O soldado em serviço militar inicial não recebe adicional militar no cálculo, conforme a exceção da Tabela II do Anexo II da MP nº 2.215-10/2001.
