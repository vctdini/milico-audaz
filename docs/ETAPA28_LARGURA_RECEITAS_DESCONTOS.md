# Etapa 28 — Ampliação horizontal das receitas e descontos

## Objetivo
Atender ao retorno de uso do contracheque: os quadros de Receitas e Descontos no resultado estavam estreitos e faziam as descrições e valores quebrarem em excesso.

## Alterações
- A página do contracheque recebe uma classe própria para limitar o ajuste a essa ferramenta.
- Em telas com largura a partir de 900 px, a área principal passa a ter até 1280 px.
- O resultado do contracheque utiliza toda a largura disponível.
- As tabelas de Receitas e Descontos passam a reservar 78% para descrições e 22% para valores, mantendo valores alinhados e sem quebra.
- Em telas menores, a largura original da página é preservada.
- Nenhuma fórmula, parâmetro, regra de cálculo ou conteúdo de rubrica foi alterado.

## Validação
Executar a suíte automatizada com `node --test tests/*.test.js`. A validação visual final deve ser feita no computador do usuário, conferindo descrições longas, valores e totais nas seções Receitas e Descontos.
