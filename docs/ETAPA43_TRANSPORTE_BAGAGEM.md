# Etapa 43 — Estimativa de transporte de bagagem

## Objetivo
Implementar a primeira estimativa de transporte de bagagem, mantendo a regra de que o usuário seleciona os itens que fazem parte de sua movimentação. O sistema não presume veículos ou bagagem.

## Base normativa consultada
- Decreto nº 4.307/2002: art. 23, IV, V e IX (conceitos de bagagem, cubagem e tarifa); arts. 38, § 4º, 43, 44 e 47, I, alíneas a e b e parágrafo único.
- Decreto nº 4.307/2002, Anexo I: cubagem de móveis/utensílios por posto ou graduação; automóvel = 12 m³; motocicleta = 3 m³.
- Decreto nº 4.307/2002, Anexo II: tabela de indenização rodoviária por m³ e faixa de distância.
- Decreto nº 11.020/2022, arts. 1º e 2º: alterou o art. 38, § 4º, do Decreto nº 4.307/2002 e determinou a permanência do Anexo II até que ato do Ministro da Defesa estabeleça nova tabela. Na pesquisa oficial realizada nesta etapa, não foi localizada tabela substitutiva; a tabela do Anexo II consolidado foi mantida como referência provisória.

## Implementado
- Novo campo de distância rodoviária de ida por destino, separado da distância total de ida e volta usada na estimativa simples de transporte pessoal.
- Cálculo por faixa do Anexo II, multiplicando tarifa por m³ pela cubagem selecionada.
- Cubagem de móveis e utensílios vinculada ao posto/graduação informado.
- Automóvel e motocicleta adicionados somente quando suas caixas forem marcadas pelo usuário.
- Memória de cálculo individual por destino, com distância, tarifa, cubagem por item e total.
- A estimativa só aparece quando bagagem, automóvel ou motocicleta forem selecionados.
- Distância ausente ou inválida impede o cálculo.

## Limites explícitos
- Cálculo restrito à tabela rodoviária dentro do território nacional. Não estima modal aéreo, aquaviário, ferroviário ou trechos mistos.
- O resultado é estimativo e não decide elegibilidade, autorização, disponibilidade orçamentária, prazo, modalidade escolhida pela autoridade requisitante ou pagamento.
- A seleção pelo usuário é tratada como declaração para simulação, não como prova documental ou deferimento.
- A estimativa não incorpora excedentes de cubagem, diferenças por modal ou seguro complementar. O art. 44 atribui ao militar o custeio de excedentes e diferenças nas hipóteses nele previstas.
- Empregado doméstico e passagens permanecem sem cálculo nesta etapa.

## Testes
Testes específicos cobrem cubagem de 2º Sgt, oficiais superiores e praças; automóvel e motocicleta; limites de faixa (50/51 km); distância inválida; ausência de itens selecionados; e distinção entre distância de ida e distância total de ida/volta.
