# Milico Audaz — Auditoria inicial (Exército Brasileiro)

**Escopo:** militares do Exército Brasileiro. **Competência-base:** janeiro de 2026 em diante.  
**Data da pesquisa:** 25/11/2026.  
**Status:** diagnóstico inicial; não constitui parecer jurídico nem validação final de folha de pagamento.

## 1. Fontes oficiais consultadas

| Tema | Norma/fonte | Uso no projeto | Situação |
|---|---|---|---|
| Estrutura remuneratória e direitos pecuniários | MP 2.215-10/2001 | Componentes da remuneração, direitos pecuniários, descontos e salário-família | Fonte primária; conferir texto consolidado e regulamentos específicos |
| Proteção social e adicionais | Lei 13.954/2019 | Adicional de compensação por disponibilidade, gratificação de representação, ajuda de custo e descontos obrigatórios | Fonte primária; conferir alterações posteriores |
| Soldos | Lei 15.167/2025, Anexo VI da Lei 13.954/2019 | Soldos com efeito financeiro a partir de 01/01/2026 | Tabela oficial localizada |
| Pensão militar | Lei 3.765/1960, texto compilado | Contribuição, hipóteses e descontos de pensão militar | Fonte primária; bases e situações devem ser modeladas por situação funcional |
| Estatuto dos Militares/dependência | Lei 6.880/1980, com alterações da Lei 13.954/2019 | Dependentes e direitos | Fonte primária; conferir categorias e regras específicas |
| Imposto de Renda | Lei 9.250/1995; Lei 15.270/2025; tabela RFB 2026; IN RFB 1.500/2014 | IRRF mensal, deduções legais, dependentes e desconto simplificado | Tabela oficial 2026 localizada; base de rendimentos do militar requer matriz de incidências |
| FuSEx | Portaria C Ex 1.742/2022 (EB10-IG-02.032); Portaria DGP/C Ex 430/2022 (EB30-IR-20.039); cartilha HGuPV 2023 | Beneficiários, cadastro, contribuições e indenizações | Normas-base localizadas; verificar alterações posteriores e confirmar fórmula vigente com fonte normativa primária |
| Auxílio-transporte | Decreto 12.117/2024 | Critérios de concessão e cálculo | Regulamento atual localizado; fórmula do app precisa ser confrontada artigo a artigo |
| Etapa comum de alimentação | Portaria Normativa 19/MD/2017, alterada pela Portaria GM-MD 2.774/2025 | Valor da etapa comum: R$ 13,50 | Valor oficial localizado; critérios e multiplicadores ainda exigem validação |
| Diárias, movimentação e ajuda de custo | Decreto 4.307/2002; Decreto 2.040/1996 (R-50); Lei 13.954/2019, Anexo V; normas DGP/Exército | Diárias, movimentação, ajuda de custo e transporte de bagagem | Auditoria específica pendente por hipótese e localidade |
| TAF | Diretrizes e tabelas vigentes do Exército | Índices por sexo/faixa etária/modalidade | Validar edição, anexos e atualizações antes de declarar vigente |

## 2. Achados prioritários no código existente

### Contracheque

1. O IR é digitado manualmente (`id="ir"`). O cadastro `dep-ir` é persistido, mas não participa de cálculo.
2. O FuSEx é calculado com percentual livre (padrão 3,5%) aplicado a uma base simplificada. A cartilha oficial do HGuPV (abril/2023) descreve contribuição padrão de 3% e quota complementar de 0,4% para um dependente direto (exceto cônjuge) ou 0,5% para mais de um dependente direto ou dependente indireto. A regra exige qualificação do tipo de dependente; a simples contagem total não basta. A cartilha é orientação institucional e deve ser conferida com a norma primária vigente antes de automatizar.
3. A tela contém `dep-salario-familia`, mas a MP 2.215-10, art. 11, enumera salário-família entre direitos do militar na inatividade remunerada. Não presumir pagamento a militar da ativa; exigir situação funcional e confirmação de regulamentação específica.
4. O campo de dependentes para IR não deve ser tratado como número automaticamente dedutível sem validar os requisitos fiscais individuais. A tabela RFB 2026 informa dedução mensal de R$ 189,59 por dependente; desconto simplificado mensal de R$ 607,20; tabela progressiva e redução do imposto para rendimentos tributáveis até R$ 7.350,00.
5. O demonstrativo atual já separa uma lista de créditos e outra de descontos, mas soma `outros créditos` diretamente ao total bruto sem classificação de natureza tributária ou de incidência. É necessário classificar cada rubrica em: remuneração tributável, remuneração não tributável, indenização/benefício, base da pensão militar, base FuSEx e desconto.
6. O cálculo de pensão militar usa 10,5% de `f.base`. Não alterar nem validar essa base sem mapear as regras por militar da ativa, inativo, pensionista e eventuais situações transitórias.
7. O aviso de limite mínimo de 30% usa a regra da MP 2.215-10, art. 14, §3º; conferir a base de comparação e o regime atual de descontos obrigatórios/autorizados da Lei 13.954/2019 antes de usá-lo como validação final.

### Gratificação de representação

O código inclui gratificação de representação de 10% para oficial-general e também para quem marca cargo de comando, direção ou chefia no total mensal do contracheque. A Lei 13.954/2019, art. 10, distingue a parcela devida aos oficiais-generais daquela devida **em caráter eventual** aos demais militares nas hipóteses regulamentadas. A automação atual pode transformar uma verba eventual em mensal; separar as hipóteses e aplicar dias/ato autorizativo conforme regulamento do Exército.

### Auxílio-transporte

O código aplica 22 dias úteis, gasto diário e cota-parte de 6% do soldo proporcional a 22/30. O Decreto 12.117/2024 é o regulamento posterior específico. Não manter a fórmula antiga sem confrontar as condições, base e metodologia do decreto.

### Auxílio-alimentação

A tabela de dados usa etapa de R$ 13,50, coerente com a Portaria GM-MD 2.774/2025. Os multiplicadores de 10, 5 e 1 etapas e as situações de elegibilidade precisam ser conferidos com a MP 2.215-10, Decreto 4.307/2002 e normas complementares do Exército.

### Diárias e ajuda de custo

As fórmulas atuais usam grupos de posto/círculo, valores e multiplicadores fixos. Validar tabelas, destino, pernoite, afastamento, retorno, abatimentos, acumulação e situação de movimentação antes de publicar como resultado confiável.

## 3. Dados de dependentes necessários para automação correta

Os quatro contadores atuais são úteis como resumo, mas não bastam para decidir elegibilidade. Para o cálculo do FuSEx, é necessário distinguir dependente direto/indireto e cônjuge/companheiro, além de confirmar cadastramento no CADBEN-FuSEx. Para IR, a quantidade deve corresponder a dependentes fiscais válidos. Para salário-família, primeiro deve ser identificada a condição de militar na inatividade e a norma específica aplicável.

**Recomendação:** manter os quatro campos e, em uma etapa posterior, acrescentar cadastro opcional por dependente (tipo de vínculo, idade, estudante, invalidez, rendimentos, cadastro FuSEx e condição fiscal), com proteção local dos dados.

## 4. Arquitetura de implementação

- `js/data/normas-2026.json`: catálogo versionado de normas, links oficiais, vigência e status de validação.
- `js/data/`: tabelas com `vigenciaInicio`, `vigenciaFim`, fonte, artigo/anexo e data de conferência.
- `js/calculators/`: um módulo por calculadora, sem fórmulas duplicadas.
- `js/core/`: moeda, validação, arredondamento, perfil e demonstrativo financeiro.
- `tests/`: casos de teste com resultados calculados independentemente e exemplos de contracheques anonimizados.

## 5. Próxima ordem de execução

1. Confirmar a situação funcional abrangida pelo simulador (ativa, reserva remunerada, reformado, temporário, aluno/recruta ou múltiplas situações).
2. Fechar a matriz de incidência de cada rubrica do contracheque.
3. Implementar IRRF 2026 com deduções legais versus desconto simplificado e redução da Lei 15.270/2025, após fechar a base tributável.
4. Reestruturar FuSEx com cadastro de beneficiários e regra normativa validada; não derivar a contribuição apenas do número total de dependentes.
5. Revisar pensão militar, limite de descontos, representação, disponibilidade e adicionais.
6. Padronizar o demonstrativo de receitas, indenizações, descontos e líquido.
7. Auditar individualmente transporte, diárias, alimentação, movimentação, ajuda de custo, pensão alimentícia, TAF e demais ferramentas.
8. Rodar testes de regressão e comparar com contracheques anonimizados de competências conhecidas.

## 6. Referências consultadas

- MP 2.215-10/2001: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
- Lei 13.954/2019: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- Lei 15.167/2025: https://planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15167.htm
- Lei 3.765/1960 (compilada): https://planalto.gov.br/ccivil_03/leis/l3765compilado.htm
- Lei 6.880/1980: https://www.planalto.gov.br/ccivil_03/leis/l6880.htm
- Lei 9.250/1995 (compilada): https://www.planalto.gov.br/ccivil_03/leis/l9250compilado.htm
- Lei 15.270/2025: https://legis.senado.gov.br/norma/41758136
- Tabela RFB 2026: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026
- IN RFB 1.500/2014: https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=57670&visao=anotado
- Decreto 12.117/2024: https://legis.senado.gov.br/norma/38742457
- Portaria GM-MD 2.774/2025: https://mdlegis.defesa.gov.br/norma_html/?ANO=2025&NUM=2774&SER=A
- Portaria C Ex 1.742/2022 e FuSEx: consultar MDLegis/SGEx; cartilha HGuPV (2023): https://hgupv.eb.mil.br/images/Arquivos_2022/Imagens/Cartilha_FuSEx_HGuPV_JUN2023.pdf

**Limite da auditoria:** os pontos acima identificam riscos e prioridades, mas não substituem a conferência integral de todos os anexos, alterações e normas internas do Exército. Nenhuma fórmula sinalizada como pendente deve ser apresentada como cálculo oficial.


## Atualização após definição do público funcional

Escopo confirmado: Exército Brasileiro; militares da ativa de carreira, temporários, alunos, reserva remunerada e reformados; competência inicial janeiro de 2026.

### Salvaguardas implementadas
- Campo `situação funcional` adicionado ao contracheque e ao perfil local compartilhado.
- O motor legado da ativa não é executado para reserva remunerada e reformados; esses casos recebem aviso de que a simulação específica está em auditoria.
- Temporários e alunos podem selecionar sua categoria, mas recebem aviso de validação pendente de elegibilidade por rubrica.
- O demonstrativo separa remuneração bruta, outros créditos/indenizações, descontos e líquido. Outros créditos não são automaticamente presumidos como tributáveis ou contributivos.
- A gratificação mensal de representação no contracheque foi restrita ao oficial-general. O exercício de comando deixou de ser somado como verba mensal automática; hipóteses eventuais devem ser apuradas pela calculadora própria e conforme Decreto 11.002/2022, art. 4º.
- Foi removido o complemento automático genérico ao salário mínimo, pois a regra precisa ser validada para cada situação funcional e não deve ser presumida universalmente.

### Pendências bloqueantes
- Motor de proventos de reserva/reforma: quotas de soldo, fundamento legal, integralidade/proporcionalidade e parcelas aplicáveis.
- Regras específicas de alunos e temporários, inclusive pensão militar e assistência médico-hospitalar.
- Matriz de incidência por rubrica: IRRF, pensão militar, FuSEx e outros descontos.
- Cadastro detalhado de dependentes para FuSEx e IR; contadores isolados não comprovam elegibilidade.
- Atualizar e consolidar o Decreto 11.002/2022 com alterações posteriores, inclusive Decreto 13.052/2026 (publicado em julho de 2026).
- Testes de regressão com contracheques anonimizados e validação independente das fórmulas.

### Nota sobre a legislação pesquisada
O Decreto 11.002/2022 diferencia expressamente remuneração dos militares ativos (art. 2º) e proventos na inatividade/pensões (art. 3º). Também prevê gratificação de representação mensal para oficiais-generais e eventual para outras hipóteses (art. 4º). A Lei 3.765/1960, art. 3º-A, define a contribuição para pensão militar sobre parcelas dos proventos na inatividade; a incidência sobre remuneração de ativos deve ser conferida no conjunto normativo aplicável.

## Etapa 4 — regressão inicial e proteção contra descontos presumidos

### Ajustes feitos nesta etapa
- Removido o cálculo automático de pensão militar e FuSEx que utilizava `f.base`, propriedade inexistente no objeto retornado pelo motor. O comportamento anterior podia produzir `NaN` e um líquido inválido.
- Pensão militar e FuSEx passaram a ser campos de valor manual, com aviso explícito de que o resultado é parcial até a matriz de incidência por rubrica e situação funcional estar validada.
- Campo de ATS renomeado para receber percentual reconhecido em 29/12/2000, e não anos. O motor já tratava o valor como percentual; o rótulo anterior induzia entrada incompatível.
- Criado `js/data/regras-historicas.json` para preservar as referências históricas de adicionais e contagem de tempo sem ativá-las no cálculo corrente. Regras com divergência ou documentação pendente ficam bloqueadas.
- Criada suíte inicial `tests/regression.test.js` com testes automatizados do catálogo de postos, composição remuneratória, prevalência entre ATS e disponibilidade, QE, serviço militar inicial e campos do contracheque.

### Resultado dos testes
- 11 testes automatizados executados: 11 aprovados, 0 falhas.
- `node --check app.js`: aprovado.
- `node --check js/perfil.js`: aprovado.
- JSONs normativos: validação sintática aprovada.

### Limitações desta rodada
- Testes executados em Node.js com harness DOM mínimo. A tentativa de teste E2E com Chromium/Playwright foi bloqueada pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`), portanto ainda não há validação funcional real em navegador.
- Não foram testados ainda formulários de diárias, transporte, ajuda de custo, alimentação, TAF, IMC e juros com cenários completos.
- Não houve comparação contra contracheques oficiais anonimizados.
- Na etapa 4, IRRF, pensão militar e FuSEx estavam manuais. A etapa 5 substituiu a pensão por estimativa automática de 10,5% sobre uma base provisória; IRRF e FuSEx continuam manuais.
- Reserva e reforma continuam bloqueadas no contracheque até o motor de proventos estar validado.

### Pontos que precisam de revisão do usuário
1. Comparar soldo, adicional militar, habilitação, disponibilidade/ATS, compensação orgânica, permanência e gratificação de representação com um contracheque de referência sem dados pessoais.
2. Confirmar quais adicionais de habilitação devem estar disponíveis para cada curso reconhecido e situação funcional.
3. Conferir a classificação das rubricas e a base provisória da estimativa de pensão militar; comparar com o valor efetivo do contracheque. FuSEx ainda depende de qualificação dos dependentes.
4. Validar o fluxo de dependentes: os cinco contadores são apenas totais informados, não cadastro individual nem prova de elegibilidade.
5. Testar a instalação PWA e a atualização do cache após nova versão.


## Etapa 5 — ajustes da calculadora do contracheque

- Adicionado contador separado de dependentes habilitados para auxílio pré-escolar, salvo no perfil local e exibido no resumo de dependentes.
- Incluído crédito de auxílio pré-escolar calculado por quantidade informada, com valor unitário de R$ 526,64 (Portaria GM-MD nº 3.019/2026, efeitos financeiros desde 1º/5/2026). O contador pressupõe que o usuário já verificou o cadastro e os requisitos do benefício.
- Compensação orgânica passou a oferecer percentuais de 1% a 20%.
- Adicionados controles “Não faço jus” para ATS reconhecido, compensação orgânica, adicional de permanência e gratificação de localidade especial; os campos correspondentes são ocultados e zerados quando a opção é marcada.
- Demonstrativo separado em remuneração, auxílio pré-escolar, receitas adicionais, desconto automático estimado e demais descontos. As receitas e descontos adicionais aceitam linhas dinâmicas com descrição e valor, podendo ser removidas.
- Contribuição para pensão militar passou a ter estimativa automática de 10,5% sobre a base remuneratória definida pelo motor (`f.base`). Essa base é provisória e precisa de conferência rubrica a rubrica; a alíquota legal não resolve, por si só, a incidência de cada parcela. FuSEx e IRRF continuam manuais nesta etapa: o FuSEx exige distinguir dependentes diretos/indiretos e cônjuge/companheiro; o IRRF exige matriz de incidência tributária.
- O perfil local passou a persistir o novo contador e as linhas extras. Valores avulsos da versão anterior são migrados para as novas linhas quando possível.
- Testes de regressão ampliados para cobrir base de estimativa da pensão, pré-escolar, percentuais de compensação orgânica e campos dinâmicos.


## Etapa 6 — consolidação de receitas e descontos manuais

- Mantidos os cálculos e módulos que o usuário declarou validados; não foram alteradas as fórmulas de soldo, adicionais, transporte, alimentação, diárias, TAF ou gratificação de representação.
- Consolidada a interface de outras receitas e outros descontos com descrição e valor, subtotais dinâmicos e remoção de cada linha.
- Lançamentos extras continuam no perfil local compartilhado e são restaurados quando a página é reaberta no mesmo navegador.
- O cálculo recusa lançamento com valor positivo e descrição vazia. Valores zerados ou negativos não são somados.
- Receitas e descontos manuais entram no saldo geral, mas não alteram automaticamente bases de IRRF, FuSEx ou contribuição previdenciária.
- A contribuição para pensão militar conserva a opção de estimativa automática já existente; se não se aplicar ao caso concreto, o usuário pode desativá-la e informar o valor no bloco de outros descontos.
- Não foram implementados os motores adiados de reserva/reforma, aluno e temporário; permanecem fora do escopo desta etapa.

### Testes da etapa 6
- Incluídos testes da soma e normalização de lançamentos manuais, subtotais acessíveis, validação de descrição e persistência no perfil.
- A execução em Node.js valida lógica e estrutura; não substitui teste visual no navegador nem homologação oficial.

## Etapa 7 — Contracheque, FuSEx e IRRF (25/11/2026)

- Demonstrativo reorganizado no padrão do simulador de referência: dados, totais, receitas, descontos, IR mensal detalhado, IR de férias, IR do adicional natalino e margem consignável estimada.
- Compensação orgânica passa a aceitar posto/graduação de referência separado do posto atual.
- Descontos automáticos: pensão militar padrão de 10,5%, FuSEx padrão de 3% e quota complementar de 0,4% ou 0,5% conforme enquadramento selecionado.
- Campo de contribuição histórica adicional de 1,5% da MP 2.215-10/2001; somente para opção formalizada no prazo histórico, sem nova adesão.
- IRRF mensal com tabela e redução de 2026, comparando deduções legais modeladas com desconto simplificado. Eventos de férias e adicional natalino são calculados separadamente.
- Lançamentos extras de receita podem ser marcados como tributáveis no IR mensal. Sem marcação, não alteram a base tributável automática.
- Férias e 13º usam desconto simplificado de referência na ausência de deduções específicas informadas para cada evento; validar com contracheques de férias e adicional natalino.
- FuSEx: quota complementar configurada como 0,4% para um dependente direto além do cônjuge; 0,5% para mais de um dependente direto além do cônjuge ou um ou mais dependentes indiretos.
- Representação mensal não é adicionada automaticamente ao contracheque; permanece na calculadora individual.
- Incidência/base de cada rubrica continua sujeita à conferência por competência e situação funcional. Não usar esta simulação como comprovante oficial.
- Receitas manuais possuem marcações independentes para incidência de IR mensal e inclusão na base de contribuição PM/FuSEx; ambas começam desmarcadas para evitar presumir incidência.
- Auxílio pré-escolar corrigido para aplicar a cota-parte de 5% a 25% conforme a Portaria GM-MD nº 1.113/2024 (Anexo), com teto de R$ 526,64 a partir de maio/2026 (Portaria GM-MD nº 3.019/2026). O exemplo CPEx do usuário resulta em R$ 500,31 por dependente: faixa de 5% sobre o teto.

### Conferência com o exemplo CPEx enviado (novembro/2026)
Para 2º Sgt, remuneração-base de R$ 9.053,34, VB de Soldado Engajado de R$ 1.927,00 e 1 dependente para IR / 1 dependente direto FuSEx além do cônjuge:
- Compensação orgânica de 1% sobre o soldo de 3º Sgt: R$ 41,77.
- Pensão militar (10,5%): R$ 950,60.
- FuSEx (3%): R$ 271,60.
- FuSEx dependente (0,4%): R$ 36,21.
- IRRF mensal: R$ 1.182,74.
- IR sobre adicional natalino de R$ 9.053,34, com desconto simplificado: R$ 1.413,96.
- Auxílio pré-escolar: teto R$ 526,64 menos cota-parte de 5% = R$ 500,31 por dependente.
Os cálculos acima reproduzem as rubricas e os valores apresentados no comprovante CPEx e no exemplo Planilha Bizurada. Créditos e descontos eventuais restantes devem ser adicionados nas linhas manuais.
- Suíte de regressão Node: 27 testes aprovados; não houve teste E2E visual em navegador nesta execução.

Com a inclusão manual dos créditos eventuais do contracheque CPEx (auxílio-transporte R$ 310,90, salário-família R$ 0,16 e adicional natalino R$ 9.053,34) e dos descontos eventuais (1ª parcela natalina R$ 4.526,67, ajuste transporte R$ 14,13, despesa médica FuSEx R$ 520,90 e consignações R$ 320,54 + R$ 47,66), o demonstrativo recompõe R$ 18.918,05 de receitas, R$ 9.285,01 de descontos e líquido de R$ 9.633,04, igual ao exemplo CPEx enviado.


## Etapa 8 — simplificação da experiência do contracheque

A tela foi reorganizada para apresentar primeiro os dados essenciais (situação, posto/graduação, competência, habilitação e dependentes). As receitas principais e os descontos padrão são exibidos em prévia dinâmica. Não há mais recolhimento automático de grupos ao perder o foco. Parâmetros adicionais e lançamentos extraordinários ficam em seções que o próprio usuário abre quando precisar. O mês de referência também aparece no demonstrativo e é salvo no perfil local.

A prévia é uma estimativa de conferência; não substitui a validação das incidências individuais nem a folha oficial.

## Correção da prévia automática — 25/11/2026

Foi corrigida a integração da seção "Seu contracheque" (`cc-preview-receitas` e `cc-preview-descontos`). A prévia agora é renderizada na abertura da página e reage aos eventos `input` e `change` dos campos que afetam soldo, adicionais, dependentes, pensão, FuSEx, IR e lançamentos extras. Os campos continuam visíveis; não há recolhimento automático. Testes de regressão: 28 aprovados.


## Correção do catálogo de rubricas — Etapa 11.1

- O modal do catálogo foi movido para fora do formulário para evitar interferência com o fluxo de submissão.
- A abertura dos catálogos de receitas e descontos passou a usar delegação de eventos no documento.
- A seleção de rubrica abre a seção correspondente, destaca o campo de cálculo ou cria uma linha pré-preenchida com a descrição da rubrica.
- Foi incluído retorno visual acessível após a seleção.
- Cache PWA atualizado para `milico-20261125-catalogo-rubricas-correcao-12`.
- Testes automatizados: 31 aprovados. Teste visual real no navegador ainda depende de validação local.


## Atualização — Etapa 12 (25/11/2026)

- Os botões “Adicionar receita” e “Adicionar desconto” foram posicionados diretamente nos respectivos quadros da seção “Seu contracheque”.
- As rubricas selecionadas passam a ser incluídas no próprio quadro, com cálculo automático quando existe regra implementada e lançamento identificado quando o valor depende de ato ou situação individual.
- Adicional de férias: calcula 1/3 da remuneração do mês de início das férias (Decreto nº 4.307/2002, art. 80). O usuário informa a remuneração de férias paga antecipadamente, se houver, para estimar o IR separado sobre a remuneração de férias + 1/3. O crédito adicional soma apenas o terço, evitando duplicar a remuneração mensal.
- Adicional natalino: base de dezembro editável, meses computados de 1 a 12, 1ª parcela de 50% da remuneração do mês anterior sem IRRF; 2ª parcela lança o 13º integral proporcional como crédito, abate a 1ª parcela recebida e calcula IRRF exclusivo sobre o 13º integral.
- A redução de IR de 2026 é aplicada ao 13º conforme IN RFB nº 1.500/2014, art. 13, com redação da IN RFB nº 2.299/2025, e art. 65-A, § 3º.
- O Decreto nº 4.307/2002, arts. 81 e 82, fundamenta a proporcionalidade, o pagamento em duas parcelas e o abatimento do adiantamento. O art. 81, § 3º, exclui do cálculo do 13º os direitos remuneratórios do art. 2º da MP nº 2.215-10/2001; por isso, auxílio-transporte, auxílio-alimentação, auxílio-fardamento, assistência pré-escolar, salário-família, adicional de férias e outras verbas do art. 2º não entram na base de 13º. A base padrão usa a remuneração do art. 1º da MP.
- Eventos continuam opcionais: não são incluídos automaticamente sem o usuário selecioná-los no catálogo.
- Limitação de validação: os testes automatizados cobrem as fórmulas e a presença dos controles; a interação visual precisa ser conferida no navegador do usuário.

## Etapa 13 — correções de consolidação do contracheque

- Centralizada a soma final de receitas e descontos para garantir que todos os lançamentos do catálogo sejam contabilizados uma única vez.
- Despesas médicas FuSEx, taxa de PNR e pensão alimentícia passaram a ser linhas do catálogo de descontos, sem campos paralelos na seção avançada.
- Removida a seção redundante de orientação e movidos os controles de férias/13º para dentro do quadro Receitas.
- IR de férias agora é apurado separadamente sobre remuneração do mês + 1/3, comparando deduções legais informadas e desconto simplificado.
- IR do 13º permanece separado: primeira parcela sem retenção e segunda parcela com tributação do valor integral e abatimento do adiantamento, usando o desconto simplificado como referência compatível com o contracheque CPEx fornecido.
- Descontos extras e marcação de dedutibilidade de pensão alimentícia são persistidos no perfil local.
- Testes automatizados da suíte: 42 aprovados. Teste visual no navegador ainda depende da validação local do usuário.


## Etapa 18 — margem consignável, cores e PDF

- O resumo superior passou a apresentar receitas, descontos, líquido estimado e margem consignável.
- A margem segue a orientação do CPEx: rendimentos permanentes × 70%, menos reserva de 10% do soldo, descontos obrigatórios e descontos autorizados. A margem pode ser negativa; não é limitada artificialmente a zero.
- Gratificação de localidade especial é excluída da base da margem. Direitos remuneratórios eventuais (pré-escolar, férias, 13º, alimentação, fardamento, transporte, natalidade etc.) não integram a base permanente.
- Receitas extras somente entram na base de rendimentos permanentes quando o usuário marcar expressamente essa característica; descontos extras são tratados como autorizados para a estimativa.
- IR mensal e contribuições obrigatórias são considerados na parcela de descontos obrigatórios da margem. IR de férias, IR de 13º e adiantamento natalino são eventos não recorrentes e não reduzem a margem mensal estimada.
- O botão “Baixar simulação em PDF” abre a impressão do navegador; o usuário deve selecionar “Salvar como PDF”. Não há biblioteca PDF externa incorporada.
- Cores: receitas em azul e descontos em vermelho no resumo, prévia e demonstrativo.
- Testes automatizados cobrem a fórmula, margem negativa, resumo de quatro indicadores e impressão/PDF.
