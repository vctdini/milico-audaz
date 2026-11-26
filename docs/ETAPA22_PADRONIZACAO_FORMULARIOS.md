# Etapa 22 — Padronização da experiência dos formulários

## Objetivo
Aprimorar a leitura e o preenchimento das calculadoras existentes sem alterar a identidade visual, a estrutura das páginas, os identificadores dos campos ou as regras de cálculo.

## Implementação
- Formulários dos simuladores simples passam a usar duas colunas em telas maiores e uma coluna em celulares.
- Campos recebem altura mínima e espaçamento consistentes, com foco visual mais claro.
- Opções do tipo checkbox recebem área de interação mais confortável.
- Seções avançadas (`details`) ocupam a largura completa do formulário.
- Botão de cálculo ocupa a largura total, facilitando sua localização.
- Resultados ganham largura compatível com os formulários e melhor adaptação de tabelas em telas estreitas.
- Foi incluída uma folha de estilo de impressão para priorizar o conteúdo do resultado.

## Preservações
- Nenhum arquivo de lógica de cálculo foi alterado nesta etapa.
- Nenhum ID de campo, função `data-fn`, parâmetro ou valor padrão foi alterado.
- O formulário especializado do contracheque mantém seu layout próprio.
- Cores, cabeçalho, navegação e identidade do projeto foram preservados.

## Escopo
A camada visual aplica-se a `form.calc[data-fn]` e `form#taf`, evitando interferência nos componentes especializados do contracheque.

## Validação
Executar `node --test tests/regression.test.js` na pasta do projeto. Também recomenda-se conferir manualmente cada calculadora em largura desktop e celular, pois testes automatizados de lógica não substituem inspeção visual nos navegadores.
