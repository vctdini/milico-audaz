# Milico Audaz — Etapa 68: padronização visual global

## Objetivo
Unificar a apresentação das páginas do Milico Audaz com regras globais de largura, centralização, tipografia, espaçamento e comportamento responsivo.

## Alterações
- Padronizada a largura máxima do conteúdo e dos formulários, centralizando os blocos na página.
- Padronizados espaçamentos internos, bordas e raios dos cartões e formulários.
- Uniformizada a escala tipográfica e a altura de linha dos títulos, textos, rótulos e controles.
- Adicionadas regras para evitar estouro horizontal e quebra inadequada de palavras em blocos, títulos, rótulos e textos.
- Grades passam a usar colunas flexíveis com `minmax(0, 1fr)` e recolhem para uma coluna em telas menores.
- Tabelas e demonstrativos ficam limitados ao contêiner, com rolagem horizontal interna quando necessário.
- Regras aplicadas globalmente pelo `style.css`, compartilhado pelas páginas HTML do projeto.

## Arquivos
- `style.css` — camada global da Etapa 68 adicionada ao final, preservando os estilos específicos existentes.
- `LEIA-ME-ETAPA68.md` — este registro.

## Validação
- Conferido que todas as 18 páginas HTML carregam `style.css`.
- Conferida a presença de `min-width: 0`, limites de largura e media queries na camada global.
- A validação foi estática; não foi realizada inspeção visual automatizada em navegador de todas as páginas/dispositivos.
