# Etapa 42 — Seleção dos itens da movimentação pelo usuário

## Objetivo
O militar deve informar quais itens fazem parte da própria movimentação. O sistema não pode presumir, recomendar ou selecionar automaticamente empregado doméstico, automóvel, motocicleta, bagagem ou passagens.

## Implementado
- Grupo de opções com caixas de seleção visíveis e acessíveis.
- Opções: empregado doméstico, transporte de automóvel, transporte de motocicleta, transporte de bagagem e passagens.
- Estado das seleções refletido em mensagem dinâmica para o usuário.
- Seleções aparecem na memória/resultado como itens declarados pelo usuário.
- Botão de limpar cálculo também limpa as seleções.
- Layout responsivo, com cartões maiores e fáceis de tocar em celular.

## Limite funcional desta etapa
A seleção ainda não calcula valores indenizatórios para esses itens. Cada cálculo depende de dados complementares e da conferência da regra legal específica. A interface deixa isso explícito para não transformar uma marcação em promessa de concessão ou pagamento.

## Próximas etapas sugeridas
1. Auditar a legislação aplicável individualmente para cada item.
2. Definir, com base nas normas, os campos complementares estritamente necessários.
3. Implementar e testar um item por vez, exibindo memória de cálculo e referência normativa.
4. Integrar os resultados individuais ao comparativo por destino e ao PDF.

## Princípio de produto
**O militar informa. O Milico Audaz calcula. A legislação fundamenta.**
