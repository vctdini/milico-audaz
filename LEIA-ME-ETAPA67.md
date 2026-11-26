# Etapa 67 — Inclusão do salário-família

- O campo existente “Dependentes para salário-família” passa a gerar automaticamente crédito de R$ 0,16 por dependente informado.
- A rubrica “Salário-família” aparece nas receitas da prévia e no demonstrativo financeiro.
- O crédito integra o total de receitas e o líquido calculado.
- O valor não é incluído na base de contribuição PM/FuSEx nem marcado como tributável no IR, pois esta etapa implementa somente o parâmetro informado pelo usuário (R$ 0,16 por dependente).
- O cadastro de dependentes não foi duplicado.
- Cache do service worker atualizado para etapa67.

## Testes

Executar: `node --test tests/*.test.js`
