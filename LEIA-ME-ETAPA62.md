# Etapa 62 — dependentes e demonstrativo financeiro simplificado

## Alterações
- Incluído o item opcional **Dependentes** na seleção da movimentação.
- Ao marcar Dependentes, a seção de passagens abre e permite informar destino e quantidade de adultos, crianças menores de 2 anos e crianças maiores de 2 anos.
- As quantidades informadas entram na estimativa de passagens do destino, usando o parâmetro já existente de R$ 0,50 por km por pessoa. O parâmetro é aplicado igualmente às faixas etárias nesta simulação; a tarifa real e eventuais regras específicas por idade devem ser confirmadas com a OM.
- O demonstrativo foi reduzido a uma tabela por destino com Ajuda de custo, Bagagem, Carro, Moto, Empregado, Passagens e Total estimado.
- Bagagem, automóvel e motocicleta passaram a aparecer em colunas separadas, com seus valores individualizados.
- Empregado doméstico aparece como “A apurar” quando selecionado. Não foi atribuído valor fictício porque a tela não dispõe de tarifa/dados suficientes para calcular essa parcela.
- Ajustes de largura, alinhamento numérico, rolagem horizontal e responsividade do demonstrativo.

## Validação
- `node --check app.js`: aprovado.
- Testes específicos da Etapa 62: 3 aprovados.
- Suíte histórica: 200 aprovados e 12 falharam porque verificam estrutura/textos do demonstrativo anterior, removidos ou reorganizados nesta etapa. Esses testes antigos precisam ser atualizados para o novo formato; portanto, não declarar a suíte integral como aprovada.
- Não foi feita validação visual em navegador nesta etapa. Recomenda-se abrir a tela em desktop e celular e conferir um cenário com cada item marcado.
