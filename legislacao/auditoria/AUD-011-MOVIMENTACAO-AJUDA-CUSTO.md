# AUD-011 — Movimentação e ajuda de custo

**Status:** fatores do Anexo V conferidos; escopo e remuneração-base ainda carecem de homologação integral.  
**Prioridade:** alta.  
**Arquivos:** `movimentacao.html`, `ajuda-custo-cursos.html`, `app.js` (`FN.ajuda`).

## 1. Regra legal do Anexo V

A Lei nº 13.954/2019, art. 15 e Anexo V, prevê: (a) com dependente, movimentação com desligamento: 2 remunerações; (b) comissão >3 e <=12 meses sem desligamento: 2 remunerações na ida e 1 na volta; (c) comissão >15 dias e <=3 meses sem desligamento: 1 na ida e 1 na volta; (d) com dependente, transferência para Localidade Especial Categoria A ou dela para outra localidade, com desligamento: 4 remunerações; (e) sem dependente, metade dos valores de a–d; (f) transferência para inatividade remunerada, com ou sem dependente: 8 remunerações calculadas com soldo do último posto do círculo hierárquico para oficiais e soldo de Suboficial para praças.

## 2. Confronto com o código

A função `FN.ajuda()` reproduz os multiplicadores 2, 3 (2 na ida + 1 na volta), 2 (1 + 1), 4 e metade para as situações a–e. Para a situação f, aplica 8 vezes uma remuneração calculada com referência ao último posto do círculo (`p.ref`), coerente com a estrutura do Anexo V para oficiais; para praças, a referência cadastrada é Subtenente, que precisa ser comparada à redação legal “soldo de Suboficial” e à equivalência de posto/graduação aplicável no Exército. O texto da lei federal usa a terminologia “Suboficial”; a interface/cadastro do Exército usa “Subtenente”. Não tratar como equivalência automática sem registrar a correspondência normativa.

O motor usa `f.total`/`comp(ref,o).total`, cuja composição deriva de soldo, adicional militar, habilitação, maior entre ATS e disponibilidade, compensação orgânica, permanência e localidade especial; exclui gratificação de representação (`gr`). A base e a aplicação de cada adicional na remuneração de referência para ajuda de custo devem ser confirmadas à luz da MP 2.215-10, art. 1º, e dos atos internos de execução.

## 3. Riscos e limitações identificados

1. A tela oferece “transferência para ou de Localidade Especial Categoria A”, mas não exige explicitamente confirmação de desligamento da OM; a hipótese legal do Anexo V, alínea d, exige movimentação com desligamento.
2. A situação “mudança de sede com desligamento” é genérica; o app não pergunta se a movimentação é por necessidade do serviço ou interesse próprio. O R-50 prevê que despesas de movimentações por interesse próprio correm inteiramente por conta do requerente (Decreto 2.040/1996, art. 32, parágrafo único). A elegibilidade da ajuda de custo deve considerar a natureza do ato.
3. O cálculo não trata de passagens, transporte de pessoal, bagagem, instalação e trânsito; a página informa a limitação, o que é adequado, mas o resultado não pode ser apresentado como acerto total da movimentação.
4. Cursos/estágios cobertos pelas situações b/c dependem da duração exata e da ausência de desligamento. A interface seleciona a faixa, mas não coleta datas para provar que a duração atende aos limites.
5. A regra de dependentes deve seguir o conceito legal/administrativo vigente e a declaração/habilitação correspondente; checkbox isolado é simulação simplificada.
6. A situação f não deve aplicar redução por ausência de dependente, pois a lei expressamente abrange com ou sem dependente. O código atual não aplica a redução nessa hipótese.

## 4. Decreto 2.040/1996 — movimentação

O R-50 define movimentação, trânsito e instalação (arts. 3º a 6º), disciplina movimentação por necessidade do serviço e interesse próprio (arts. 13 a 16) e prevê que despesas resultantes de movimentações por interesse próprio correm inteiramente por conta do requerente (art. 32, parágrafo único). A norma não substitui o Anexo V da Lei 13.954/2019 para cálculo do multiplicador de ajuda de custo; ela fornece critérios administrativos e de elegibilidade da movimentação. O Decreto 8.514/2015 alterou vários dispositivos do R-50 e revogou parcialmente outros, devendo o banco manter o texto consolidado.

## 5. Recomendações para correção futura

- Adicionar campo “movimentação por necessidade do serviço / interesse próprio”, com bloqueio ou aviso jurídico correspondente.
- Para localidade especial A, exigir confirmação de mudança com desligamento e validar o enquadramento oficial da localidade.
- Para cursos, coletar data inicial/final e calcular duração em dias, sem depender apenas de opção manual de faixa.
- Manter separadas ajuda de custo, transporte de bagagem, passagens, trânsito e instalação.
- Formalizar tabela de remuneração de referência por círculo e rubricas antes de homologar a função.
- Criar testes de fronteira: 15 dias, 16 dias, 3 meses exatos, 3 meses + 1 dia, 12 meses exatos, 12 meses + 1 dia; com e sem dependente; categoria A para/desde outra localidade; transferência à inatividade com/sem dependente.

## 6. Fontes

- Lei nº 13.954/2019, art. 15 e Anexo V: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- Decreto nº 2.040/1996 (R-50), texto atualizado: https://www2.camara.leg.br/legin/fed/decret/1996/decreto-2040-21-outubro-1996-444898-normaatualizada-pe.html
- Decreto nº 8.514/2015 (alterações do R-50): consultar na cadeia normativa do texto consolidado da Câmara.
