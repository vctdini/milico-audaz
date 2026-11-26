# Etapa 37 — Consistência de experiência nas cinco calculadoras

## Escopo

Revisão integrada da experiência de preenchimento e leitura dos resultados de auxílio-transporte, auxílio-alimentação, diárias, gratificação de representação e pensão alimentícia, partindo do pacote da Etapa 36.

A etapa se limitou à apresentação e à consistência de interface. Não foram alteradas fórmulas, percentuais, tabelas, critérios normativos, limites de negócio ou parâmetros financeiros.

## Ajustes implementados

- Padronização visual do texto auxiliar sob os campos dos formulários auditados.
- Alinhamento consistente dos checkboxes e seus rótulos.
- Padronização do botão principal de cálculo, com largura mínima em telas maiores e largura integral em telas pequenas.
- Padronização visual das tabelas de memória de cálculo, com algarismos tabulares e alinhamento dos valores.
- A calculadora de pensão alimentícia passou a apresentar a memória de cálculo em tabela, alinhada ao padrão já utilizado pelas outras quatro ferramentas. O modo percentual mostra base e percentual; o modo fixo identifica o valor mensal informado no título judicial. O total simulado aparece em linha de total.
- Mantida a ação compartilhada “Alterar dados e simular novamente” do núcleo de resultados.
- Atualização do identificador de cache do PWA para `milico-20261125-qa-37`.

## Preservações

- Identidade visual azul/vermelha e estrutura geral do projeto.
- Largura especial aprovada para o contracheque; nenhuma regra de largura do demonstrativo foi alterada.
- Fórmulas e funções de cálculo das cinco ferramentas.
- Avisos, fontes legais e ressalvas normativas existentes.
- A possibilidade de simular valores sem que a calculadora decida elegibilidade administrativa.

## Testes

Foram adicionados testes de consistência para:

- Região de resultados com `aria-live="polite"` em todas as cinco páginas.
- Estrutura comum dos formulários e botões de cálculo.
- Contêiner e ação compartilhados dos resultados.
- Memória tabular da pensão alimentícia nos modos percentual e fixo.
- Camada visual comum e preservação da largura específica do contracheque.

A suíte completa deve ser executada com `node --test tests/*.test.js`.

## Limitações

- A suíte automatizada não substitui inspeção visual manual em navegador desktop e celular.
- Não foi feita homologação jurídica nesta etapa.
- A validação de conteúdo e incidência continua subordinada às ressalvas já registradas nas Etapas 31 a 35.
- Não foi feita publicação em hospedagem; este pacote é para teste local.

## Arquivos alterados

- `app.js`: memória de cálculo da pensão padronizada em tabela.
- `style.css`: acabamento visual comum para campos, botões, checkboxes e notas de resultado.
- `sw.js`: versão do cache atualizada.
- `tests/contracheque-layout.test.js`: expectativa de cache atualizada.
- `tests/ux-consistency.test.js`: testes específicos da Etapa 37.
- Este relatório.
