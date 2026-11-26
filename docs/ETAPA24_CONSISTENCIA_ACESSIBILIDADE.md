# Etapa 24 — Consistência e acessibilidade de navegação

## Objetivo
Aprimorar a navegação entre páginas sem alterar a identidade visual, o conteúdo funcional das calculadoras ou as fórmulas.

## Alterações implementadas
- Inclusão de um link “Pular para o conteúdo principal” em todas as páginas HTML.
- O link fica visualmente discreto até receber foco por teclado, quando aparece no topo da página.
- Inclusão de um destino consistente (`#conteudo`) nas páginas internas e na página inicial.
- Links marcados visualmente como página atual passam a expor `aria-current="page"` para tecnologias assistivas.
- Pequenos ajustes de estilo mantêm as cores azul e vermelha e respeitam a preferência por movimento reduzido.
- Atualização da identificação do cache do Service Worker para a Etapa 24, permitindo que o navegador reconheça a nova versão dos arquivos.

## Verificações
- Referências locais (`href` e `src`) das páginas: nenhuma referência local quebrada identificada na verificação estática.
- IDs duplicados: nenhum identificado nas páginas verificadas.
- JavaScript: `node --check` aprovado para `app.js`, `pwa.js` e `sw.js`.
- Testes automatizados: `node --test tests/*.test.js` — 66 aprovados, 0 reprovados.

## Pontos identificados para uma próxima rodada
- `sobre.html` e `privacidade.html` ainda contêm campos editoriais provisórios (`[SEU NOME]` e `[SEU NOME / E-MAIL]`). Não foram preenchidos porque dependem de informação confirmada pelo responsável pelo projeto.
- A auditoria automatizada não substitui inspeção visual em navegadores e aparelhos reais. A validação manual de desktop, Android e iPhone permanece recomendada antes da publicação.
- A revisão de conteúdo jurídico, fórmulas e parâmetros não fez parte desta etapa.

## Preservações
- Estrutura das páginas e identidade azul/vermelha preservadas.
- Nenhuma fórmula, parâmetro, função de cálculo ou campo de entrada foi alterado.
- Nenhum serviço externo ou biblioteca adicional foi introduzido.
