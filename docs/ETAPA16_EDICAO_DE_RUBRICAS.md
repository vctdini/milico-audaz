# Etapa 16 — edição de receitas, descontos e parâmetros

## Objetivo
Reduzir a poluição visual do demonstrativo e permitir corrigir qualquer lançamento já incluído sem removê-lo e cadastrá-lo novamente.

## Implementação
- Lançamentos genéricos e rubricas identificadas apresentam resumo compacto com descrição, valor, botão de edição (lápis) e remoção.
- O editor abre sob demanda e possui ação “Concluir edição”.
- Parâmetros selecionados no catálogo (ATS, compensação orgânica, permanência, localidade, quota FuSEx e opção histórica de 1,5%) apresentam resumo compacto, edição por lápis e remoção.
- Eventos de férias e adicional natalino também ficam compactos depois de concluída a edição, mantendo seus controles disponíveis pelo lápis.
- O perfil local restaura as linhas no novo formato, preservando descrição, valor e incidências.
- A prévia e os totais continuam sendo recalculados quando os campos são alterados.

## Validação
Executar `node --check app.js`, `node --check js/perfil.js`, `node --check sw.js` e `node --test tests/regression.test.js`.

A interação real no navegador deve ser conferida pelo usuário com Live Server; os testes automatizados não substituem a homologação visual.
