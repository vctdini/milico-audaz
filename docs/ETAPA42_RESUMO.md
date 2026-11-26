# Milico Audaz — Etapa 42

**Entrega:** seleção dos itens da movimentação pelo próprio usuário.

O formulário agora apresenta caixas de seleção para empregado doméstico, transporte de automóvel, transporte de motocicleta, transporte de bagagem e passagens. A interface não marca nenhuma opção automaticamente. O resultado registra somente as opções que o usuário marcou.

Nesta etapa, os itens são registrados, mas ainda não geram indenizações. A próxima implementação deverá auditar a legislação e identificar os dados necessários de cada modalidade antes de programar fórmulas. Isso evita presumir direito, criar campos desnecessários ou apresentar valores sem fundamento.

**Validação:** `node --check app.js` aprovado; 145 testes automatizados aprovados.
