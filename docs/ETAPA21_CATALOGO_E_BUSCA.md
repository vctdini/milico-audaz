# Etapa 21 — Catálogo de ferramentas e busca

## Objetivo
Facilitar a localização dos simuladores sem alterar a identidade visual, a arquitetura das páginas ou as calculadoras existentes.

## Alterações implementadas
- A página **Ferramentas** agora oferece busca textual e filtros por categoria, mantendo os cards, ícones, cores e navegação já utilizados.
- A busca ignora diferenças entre letras acentuadas e não acentuadas (por exemplo, “diarias” encontra “Diárias”).
- A busca considera o nome, a descrição e os termos auxiliares cadastrados em cada card.
- Foi incluído um estado acessível de “nenhum resultado”, anunciado por tecnologia assistiva.
- Os filtros mantêm o padrão de botões e estados `aria-pressed` usado na página inicial.
- A página inicial teve os indicadores de quantidade ajustados para refletir o catálogo atual: 10 disponíveis, 1 parcial e 3 em preparação.
- A chave do cache do service worker foi atualizada para que instalações PWA reconheçam a nova versão.

## Preservado
- Paleta azul e vermelha, cabeçalho, navegação, cards e ícones existentes.
- URLs, estrutura e conteúdo das ferramentas.
- Fórmulas, tabelas, parâmetros normativos e lógica das calculadoras.
- Nenhuma ferramenta foi adicionada, removida ou teve seu status alterado.

## Validação
- `node --check app.js`: aprovado.
- `node --test tests/regression.test.js`: 62 testes aprovados, 0 reprovados.
- Verificação estrutural simples: 14 cards na página inicial e 14 na página Ferramentas; sem IDs duplicados nas duas páginas.

## Limites
Esta etapa melhora a descoberta e a navegação no catálogo. Não substitui testes visuais manuais em navegadores e dispositivos reais, nem representa publicação do aplicativo na internet.
