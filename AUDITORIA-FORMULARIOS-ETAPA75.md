# Auditoria de formulários — Etapa 75

## Escopo revisado
Foram inspecionadas as 19 páginas HTML e os campos `input`, `select` e `textarea` de cada uma. Também foram lidos os módulos de perfil compartilhado, movimentação, distâncias, núcleo de cálculos e Service Worker.

## Inventário de campos
| Página | Campos identificados |
| `ajuda-custo-cursos.html` | 13 |
| `auxilio-alimentacao.html` | 4 |
| `auxilio-transporte.html` | 5 |
| `calculadora-imc.html` | 2 |
| `calculadora-taf.html` | 10 |
| `compensacao-pecuniaria.html` | 6 |
| `contato.html` | 0 |
| `contracheque.html` | 35 |
| `diarias.html` | 10 |
| `ferramentas.html` | 1 |
| `gratificacao-representacao.html` | 6 |
| `index.html` | 1 |
| `juros-compostos.html` | 5 |
| `legislacao.html` | 0 |
| `movimentacao.html` | 33 |
| `pensao-alimenticia.html` | 4 |
| `privacidade.html` | 0 |
| `sobre.html` | 0 |
| `termos.html` | 0 |

## Duplicidades e simplificações identificadas

### Movimentação
- Removido o campo **Distância total (ida e volta)**. A distância rodoviária de ida já atende às operações atuais da calculadora (bagagem, veículos e passagens).
- A consulta automática de rota agora preenche apenas a distância de ida e informa esse trecho no retorno visual.
- As quantidades de dependentes por faixa etária foram movidas para uma seção única, visível na área principal de dados. A seção de passagens apenas informa que reaproveitará esses números.
- A condição interna de existência de dependente é sincronizada pelas quantidades informadas, evitando uma segunda marcação manual.

### Campos que foram mantidos por terem finalidades diferentes
- Auxílio-transporte: custos diários de ida e volta representam os dois trechos do deslocamento e não são duplicidade.
- Contracheque: dependentes totais e dependentes reconhecidos para FuSEx, IR, salário-família e pré-escolar podem ter quantidades diferentes por finalidade legal; não foram fundidos.
- Contracheque: posto/graduação e adicionais são compartilhados com as calculadoras secundárias pelo perfil salvo. Esses campos não exigem novo preenchimento quando o perfil já existe.
- Movimentação: posto/graduação e parâmetros remuneratórios são reaproveitados do perfil, com possibilidade de ajuste na própria simulação.

## Itens que exigem uma etapa própria antes de alterar
- Receitas e descontos automáticos do contracheque: adicionar editar/excluir em cada rubrica padrão requer ligar os controles ao motor de cálculo, ao demonstrativo final, à base de incidência de contribuição e ao IR. A interface não deve permitir alterar um número sem atualizar todos esses resultados. Por segurança, esta etapa não foi implementada como mera edição visual.
- Automatização por posto/graduação: o código já calcula soldo, adicional militar e compensação por disponibilidade a partir da tabela de postos, e importa o perfil para as calculadoras secundárias. Rubricas condicionais (habilitação, ATS reconhecido, compensação orgânica, permanência, GLE, comando, dependentes, FuSEx e IR) dependem de dados de direito individual, situação funcional ou declaração do usuário; não devem ser ativadas apenas pelo posto sem base suficiente.
- Auditoria jurídica de cada rubrica e incidência: exige conferir a norma vigente e os parâmetros das tabelas antes de alterar fórmulas.

## Testes executados nesta etapa
- 16 testes focados aprovados: distância de ida, dependentes em campo único, links e recursos locais, âncoras, IDs únicos, arquivos do Service Worker e consistência dos formulários/resultados.
- `node --check` sem erros nos scripts alterados.
- Não foi possível executar navegação real em Chromium neste ambiente; a responsividade visual e a interação em dispositivo físico continuam pendentes.
