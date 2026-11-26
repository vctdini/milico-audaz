# Etapa 36 — Auditoria integrada das cinco calculadoras

## Escopo

Auditoria integrada de auxílio-transporte, auxílio-alimentação, diárias, gratificação de representação e pensão alimentícia, partindo do pacote da Etapa 35. O objetivo foi verificar consistência entre motores, validações, apresentação monetária, regras de interação já implementadas, integridade de navegação e atualização do PWA. Não houve alteração de fórmulas, percentuais, tabelas ou critérios normativos.

## Achado inicial e correção

A primeira execução conjunta de todos os testes encontrou uma falha de manutenção: `tests/contracheque-layout.test.js` ainda esperava o identificador de cache da Etapa 34, embora o Service Worker do pacote Etapa 35 já utilizasse `milico-20261125-qa-35`. O código do aplicativo não estava quebrado; o teste de versão estava desatualizado.

Correção: o Service Worker passou a usar `milico-20261125-qa-36` e o teste de integridade agora verifica esse identificador. Isso garante que navegadores com a versão anterior reconheçam a atualização e que a suíte teste a versão corrente.

## Conferências integradas

- Os cinco motores permanecem expostos pelo núcleo compartilhado `MilicoAudazCore`.
- As validações de formulário continuam recusando valores negativos nas cinco ferramentas.
- Auxílio-alimentação mantém o limite conjunto de 10 dias nas hipóteses do art. 67.
- Diárias apresenta total composto por diárias integrais, meias diárias e acréscimo.
- Gratificação eventual continua excluída quando há diárias no mesmo período, preservando as parcelas mensais conforme a regra já implementada.
- Pensão alimentícia mantém os modos percentual e valor fixo, com arredondamento monetário em centavos.
- Auxílio-transporte mantém o cálculo e a memória existentes; não foi alterada a precisão interna nem a fórmula nesta etapa.
- Links locais, âncoras, IDs, arquivos de pré-cache, layout do contracheque e consistência UX foram reexecutados.

## Resultado dos testes

A suíte completa inclui testes de regressão, layout, diárias, gratificação de representação, integridade de navegação, consistência UX e novos testes integrados. Resultado final registrado no pacote após execução: 120 testes aprovados, 0 reprovados.

## Limitações e pendências

- Testes automatizados não substituem conferência manual em navegadores reais, computadores e celulares.
- A aprovação matemática não equivale à homologação jurídica ou administrativa das fórmulas.
- Permanecem as pendências normativas expressamente listadas nos relatórios das Etapas 31 a 35, especialmente confirmação de normas complementares do Exército e do divisor da proporcionalidade da gratificação de comando.
- A calculadora de auxílio-alimentação continua sem coleta de datas para identificar sobreposição de situações no mesmo dia.
- A calculadora de diárias continua dependendo de informações fornecidas pelo usuário para representar dias integrais, meias diárias, cobertura de despesas e localidades.
- A pensão alimentícia continua subordinada ao título judicial ou acordo homologado para definição da base e das incidências.

## Arquivos alterados nesta etapa

- `sw.js`: identificador de cache atualizado para `milico-20261125-qa-36`.
- `tests/contracheque-layout.test.js`: expectativa do identificador de cache atualizada.
- `tests/integrated-benefits.test.js`: novos testes integrados das cinco calculadoras.
- `docs/ETAPA36_AUDITORIA_INTEGRADA_CINCO_CALCULADORAS.md`: este relatório.

## Conclusão

A auditoria integrada não exigiu alteração de fórmulas ou critérios das cinco calculadoras. O único defeito encontrado na rodada foi uma expectativa de teste de cache desatualizada, corrigida e coberta por nova verificação. A etapa consolida a consistência automatizada entre as cinco ferramentas, sem declarar homologação normativa total.
