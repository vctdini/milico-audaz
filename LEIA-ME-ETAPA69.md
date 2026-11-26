# Etapa 69 — Organização das famílias de calculadoras na página inicial

A página inicial foi reorganizada seguindo a referência visual enviada (Planilha Bizurada):

- Seis famílias em grade responsiva de três colunas no desktop, duas em telas médias e uma no celular.
- Cabeçalho de cada família com título, quantidade de ferramentas e controle de recolher/expandir.
- Ferramentas apresentadas em linhas compactas com ícone, nome e seta; descrições e etiquetas de status ficam ocultas nesta visão para reduzir ruído visual.
- Distribuição aplicada:
  - Contracheque e remuneração: Contracheque, Gratificação de representação e Pensão alimentícia.
  - Movimentações e cursos: Movimentação e Ajuda de custo para cursos.
  - Benefícios e indenizações: Diárias, Auxílio-transporte, Auxílio-alimentação e Compensação pecuniária.
  - Avaliação física: TAF e IMC.
  - Carreira e reserva: Tempo de serviço e Ajuste de contas.
  - Investimentos e matemática financeira: Juros compostos.
- Busca e favoritos existentes foram preservados. Ao buscar, famílias sem resultados são ocultadas.
- Atualizada a identificação do cache do service worker para Etapa 69.

## Verificações

- `node --check app.js` aprovado.
- HTML analisado: 6 famílias e 14 ferramentas; nenhum item ausente.
- Conferidos os grupos, títulos e contagens em relação à referência visual.
- Não foi realizada inspeção visual automatizada em navegador; recomenda-se conferir no Live Server em desktop e celular.
