# Etapa 40 — Auditoria da ajuda de custo por movimentação

## Base documental considerada

- Medida Provisória nº 2.215-10/2001, especialmente arts. 1º a 3º: define a remuneração e a ajuda de custo como direito pecuniário distinto de transporte.
- Lei nº 13.954/2019, art. 15 e Anexo V: estabelece os multiplicadores para movimentação com desligamento, comissões sem desligamento e transferência para a inatividade remunerada.
- Decreto nº 4.307/2002: regulamento geral da MP nº 2.215-10/2001.
- Portaria nº 290-DGP/2013 (EB30-N-10.003), arts. 26 a 29: ato administrativo publicado em BI, composição remuneratória remetida ao art. 1º da MP, datas de ajuste de contas para comissões/cursos/estágios e restituição.
- Decreto nº 2.040/1996 (R-50), com alterações: enquadramento administrativo da movimentação e tratamento da movimentação por interesse próprio.
- Imagem enviada pelo usuário com o quadro “Principais normas”, usada para identificar as quatro referências indicadas acima.

## Implementações desta etapa

1. A interface agora oferece as duas faixas de comissão/curso/estágio sem desligamento previstas no Anexo V:
   - superior a 15 dias e até 3 meses: 1 remuneração na ida + 1 na volta;
   - superior a 3 meses e até 12 meses: 2 remunerações na ida + 1 na volta.
2. As faixas exigem datas de início e término e são conferidas por duração real em dias e limites de meses-calendário, com ajuste de fim de mês.
3. A tela agora registra a natureza informada da movimentação (necessidade do serviço/ex-officio, interesse próprio ou não informada). A seleção não concede nem nega direito; apenas contextualiza e gera ressalva no resultado.
4. A situação de Categoria A foi explicitada como hipótese com desligamento, em coerência com a alínea d do Anexo V.
5. A memória de cálculo passou a exibir o período de comissão informado e o fator total aplicado.
6. O texto do resultado deixa claro que transporte, bagagem e passagens são componentes separados.

## Limitações mantidas de forma deliberada

- Não foi alterada a fórmula da remuneração-base. A Portaria 290-DGP, art. 27, remete ao art. 1º da MP 2.215-10; a composição detalhada das rubricas efetivamente consideradas no sistema precisa de conferência da cadeia normativa consolidada e homologação pelo CPEx.
- Não foi automatizada a concessão por interesse do serviço ou interesse próprio; o app continua sendo simulador, não verificador de elegibilidade.
- A situação de transferência para a inatividade usa a remuneração de referência por círculo já cadastrada. A correspondência operacional do último posto do círculo e a referência legal de soldo de Suboficial para praças devem ser homologadas antes da validação monetária final.
- Transporte de pessoal, bagagem, automóvel, motocicleta, passagens, instalação, trânsito, ajustes de contas e restituição não são calculados nesta ferramenta.
- A Portaria nº 290-DGP/2013 foi identificada na imagem enviada, mas esta etapa não declara que a cópia original isolada esteja integralmente consolidada com todas as alterações posteriores.

## Resultado

Etapa de refinamento funcional e validação de cenários do Anexo V. Não constitui homologação jurídica da remuneração-base nem decisão sobre direito individual.
