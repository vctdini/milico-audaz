# Milico Audaz — Etapa 1: auditoria de experiência e preservação da identidade

**Base examinada:** pacote `milico-audaz-etapa19-auditoria-12.zip` (25/11/2026).

## 1. Objetivo e limite desta etapa

Esta etapa registra a situação existente e define melhorias incrementais. A diretriz é preservar a identidade visual, a estrutura de navegação e a organização já construídas. Não foi realizado redesign radical, troca de paleta, substituição de tipografia, reescrita de calculadoras ou alteração de fórmulas nesta etapa.

## 2. Elementos que devem ser preservados

- Marca textual “Milico Audaz” e cabeçalho principal.
- Paleta azul como cor institucional predominante, com cores auxiliares já utilizadas.
- Organização atual da página inicial: apresentação, busca, indicadores, filtros por categoria, favoritos e cards de ferramentas.
- Navegação principal e páginas individuais das calculadoras.
- Cards de ferramentas com ícones SVG, descrição curta e estado (“Pronto”, “Parcial”, “Em breve”).
- Estrutura própria das calculadoras, inclusive os agrupamentos já desenvolvidos no contracheque.
- PWA, identidade instalada e funcionamento offline já previstos no projeto.

## 3. Inventário verificado

Foram encontrados 18 documentos HTML: início, catálogo de ferramentas, legislação, sobre, contato, privacidade, termos e 11 páginas de ferramentas/conteúdo calculável. Todas as páginas verificadas possuem título, um H1, folha de estilos compartilhada, cabeçalho, rodapé, navegação e meta viewport. A página inicial usa uma composição própria baseada em seções e catálogo de cards; não contém elemento `<main>` explícito, ao contrário das páginas internas.

As páginas de calculadora possuem formulários individuais. A quantidade de campos varia bastante: contracheque (35), ajuda de custo para cursos (13), movimentação (13), TAF (10), diárias (8), auxílio-transporte (5), juros compostos (5), auxílio-alimentação (4), gratificação de representação (4), IMC (2) e pensão alimentícia (2). Isso reforça a necessidade de padronizar apresentação e orientação sem forçar todos os formulários a terem o mesmo formato.

## 4. Diagnóstico inicial

### Pontos positivos

1. **Identidade já reconhecível:** o azul institucional, a marca, o cabeçalho e os cards criam uma linguagem visual própria.
2. **Busca e descoberta:** a home já reúne busca textual, categorias e favoritos — recursos que devem ser mantidos e refinados, não substituídos.
3. **Ícones:** já existem ícones SVG inline em pontos importantes, inclusive nos cards da home. A oportunidade é uniformizar tamanho, traço, alinhamento e significado; não adicionar ícones decorativos em excesso.
4. **Consistência estrutural:** as páginas verificadas compartilham cabeçalho, rodapé, navegação, viewport e CSS principal.
5. **Contracheque:** há componentes específicos para etapas, receitas/descontos, resumo e edição de lançamentos. Essa evolução deve ser preservada.

### Melhorias prioritárias identificadas

| Prioridade | Área | O que melhorar | Diretriz de implementação |
|---|---|---|---|
| Alta | Navegação | Conferir nomenclatura, estado ativo, foco por teclado e comportamento em telas estreitas | Ajustar o componente existente, sem trocar o modelo de navegação |
| Alta | Formulários | Uniformizar rótulos, unidades, ajuda contextual, obrigatoriedade e mensagens de validação | Criar padrões reutilizáveis respeitando as necessidades de cada simulador |
| Alta | Resultados | Dar hierarquia ao valor principal, detalhar composição e oferecer ação clara para simular novamente | Preservar os cálculos e melhorar apenas a apresentação/fluxo |
| Alta | Mobile | Verificar largura, quebra de grids, botões, tabelas e áreas de toque | Correções pontuais no CSS compartilhado e nas exceções de cada página |
| Média | Ícones | Padronizar biblioteca SVG já utilizada e melhorar acessibilidade dos ícones decorativos/funcionais | Manter SVG inline; usar rótulos acessíveis em ações |
| Média | Cards | Harmonizar altura, alinhamento, estados e feedback de hover/foco | Manter o padrão atual de cards e cores por categoria |
| Média | Acessibilidade | Revisar contraste, foco visível, associação label/campo, mensagens e semântica | Corrigir progressivamente sem alterar a aparência geral |
| Média | Ajuda contextual | Explicar termos militares, unidades e premissas nos pontos de preenchimento | Textos curtos, próximos ao campo e sem sobrecarregar a tela |
| Baixa | Microinterações | Melhorar feedback de favoritos, filtros, cálculo e cópia/impressão | Animações discretas e respeitando `prefers-reduced-motion` |

## 5. Pontos que exigem validação manual/visual

A leitura estática do HTML/CSS não comprova a qualidade visual real em todos os navegadores e tamanhos de tela. Antes de implementar alterações mais amplas, devem ser feitos testes visuais em desktop e celular, incluindo:

- menu e cabeçalho em largura reduzida;
- busca, filtros e favoritos na página inicial;
- cards em diferentes larguras;
- formulários longos e campos condicionais;
- tabelas e relatórios de resultado;
- teclado, foco visível e zoom de 200%;
- impressão e estados vazios/erro.

Também não foi feita nesta etapa uma validação de navegador com execução de JavaScript, console, rede ou leitor de tela. Esses itens ficam para a rodada de QA funcional/visual.

## 6. Regras de preservação para as próximas etapas

1. Não trocar a paleta principal nem a tipografia sem necessidade demonstrada.
2. Não reorganizar a home por completo; melhorar a composição atual.
3. Não substituir cards existentes por outro padrão de interface.
4. Não reescrever calculadoras ou fórmulas durante uma tarefa puramente visual.
5. Não remover recursos já implementados (busca, categorias, favoritos, PWA, offline, impressão ou edição de lançamentos).
6. Toda mudança deve ser pequena, rastreável e comparada com a versão-base.
7. Se uma mudança exigir alteração estrutural relevante, documentar o motivo antes de executá-la.

## 7. Próxima etapa recomendada

Executar uma rodada de refinamento visual de baixo risco começando pelo sistema compartilhado: cabeçalho/navegação, botões, campos, cards, ícones SVG e estados de foco. Em seguida, aplicar os padrões às páginas internas e às calculadoras, uma família de componentes por vez. A página inicial e o contracheque devem ser usados como referências de consistência, sem apagar suas características próprias.

## 8. Integridade desta entrega

Esta etapa é uma auditoria e um registro de diretrizes. Os arquivos funcionais recebidos foram mantidos, sem alterações de cálculo ou de conteúdo das ferramentas. O único acréscimo é este documento de auditoria.
