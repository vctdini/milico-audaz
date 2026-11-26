# Etapa 77 — Categorias da página inicial e tema global

## Alterações
- Os filtros de categoria da página inicial agora ficam em um painel próprio, com quebra de linha e dimensões responsivas; os botões não dependem de rolagem horizontal e não ultrapassam o bloco.
- Em telas estreitas, as categorias são organizadas em duas colunas, com a opção “Todas” ocupando a linha inteira.
- Adicionado seletor global de aparência no cabeçalho: Automático, Claro e Escuro.
- A preferência é armazenada em `localStorage` na chave `milico-audaz-theme`, separada dos dados de perfil e cálculos.
- O modo Automático acompanha `prefers-color-scheme` do sistema operacional e reage a mudanças na preferência do dispositivo.
- O seletor é inserido pelo arquivo `tema.js` em todas as páginas HTML do projeto (19 páginas).
- O tema escuro usa tokens compartilhados e ajustes para superfícies de formulários, cartões, tabelas, navegação e demonstrativos.
- Cache do Service Worker atualizado para `milico-20261126-etapa77-tema-global` e `tema.js` incluído nos recursos pré-cacheados.

## Preservação
- Nenhuma calculadora ou fórmula foi alterada nesta etapa.
- Não foram alteradas as chaves existentes de perfil, contracheque ou dados das calculadoras.
- O modo padrão é Automático; usuários que escolherem Claro ou Escuro mantêm a preferência entre páginas e visitas.

## Verificações executadas
- `node --check tema.js`: aprovado.
- `node --check app.js`: aprovado.
- `node --check sw.js`: aprovado.
- Testes focados Etapa 77: 5 aprovados.
- Regressão focada Etapas 75 e 76: 6 aprovados.
- Total da bateria focada: 11 aprovados, 0 falhas.
- Confirmada a inclusão de `tema.js` nas 19 páginas HTML.
- Não foi realizada homologação visual em navegador nesta execução; portanto, a aparência final deve ser conferida na execução local, especialmente em telas pequenas e em formulários especializados.
