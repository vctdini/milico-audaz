# Etapa 64 — Calculadora de movimentação disponível

## Alterações
- Status da calculadora de Movimentação alterado de **Parcial** para **Pronto** no catálogo inicial.
- Indicadores atualizados: 11 ferramentas disponíveis e nenhuma ferramenta parcial.
- Cache do service worker versionado para `milico-20261126-etapa64`, para evitar que instalações PWA mantenham a interface anterior.

## Escopo operacional
A calculadora permite simular ajuda de custo, destinos, bagagem, transporte de automóvel/motocicleta, passagens e dependentes, conforme itens selecionados e dados informados.

## Ressalva importante
“Pronto” indica que a ferramenta está disponível para uso como **simulador**. Não significa homologação oficial nem validação integral de todas as hipóteses normativas e da remuneração-base. Permanecem as ressalvas registradas em `legislacao/auditoria/AUD-011-MOVIMENTACAO-AJUDA-CUSTO.md`, especialmente a homologação da composição da remuneração-base e a confirmação de enquadramento/eligibilidade em casos específicos. O resultado não substitui análise da OM nem ato administrativo.

## Verificações
Executar `node --check app.js` e `node --test tests/*.test.js` antes da publicação. A interface deve ser conferida no navegador após atualização do site/cache.
