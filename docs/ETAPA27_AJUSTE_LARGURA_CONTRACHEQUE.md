# Etapa 27 — Ajuste da largura do demonstrativo do contracheque

## Solicitação
A simulação do contracheque passou a ficar estreita no computador, comprimindo descrições, números e colunas do demonstrativo.

## Correção aplicada
- O resultado que contém o demonstrativo do contracheque recebe a classe específica `res-contracheque`.
- Em telas maiores, esse resultado volta a ocupar a largura ampla disponível na página (até 1040 px).
- Os cartões internos do demonstrativo passam a ocupar toda a largura do resultado.
- As tabelas mantêm dimensionamento automático, com mais espaço para a descrição e uma coluna própria para valores.
- Em telas pequenas, são mantidos ajustes compactos para evitar estouro horizontal.
- Os demais simuladores continuam com a largura compacta padronizada.

## Escopo preservado
Nenhuma fórmula, regra, parâmetro, campo ou texto de cálculo foi alterado. A mudança é restrita à apresentação do resultado do contracheque e à identificação da versão do cache offline.

## Validação
Foi incluído teste automatizado para verificar a classe específica e a regra de largura. A suíte completa deve ser executada antes da distribuição.
