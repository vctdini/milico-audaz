# AUD-006 — Vinculação dos dependentes à quota complementar FuSEx

**Status:** inconsistência funcional documentada; regra normativa final pendente.

O formulário tem campo `dep-fusex`, mas o percentual complementar é escolhido em outro controle independente. O cálculo não deriva a quantidade/categoria do campo de dependentes. Assim, um usuário pode informar zero dependentes e selecionar 0,5%, ou informar vários e manter 0%, sem alerta.

A orientação institucional FuSEx consultada descreve quota de 0,4% para um dependente direto (exceto cônjuge/companheiro) e 0,5% para mais de um dependente direto (exceto cônjuge/companheiro) ou um ou mais dependentes indiretos. A cartilha não substitui a norma primária nem contempla necessariamente todas as exceções atuais.

**Impacto:** estimativa de desconto pode ficar divergente do enquadramento real no CADBEN-FuSEx.

**Recomendação:** depois da validação das normas vigentes, substituir o número único por dependentes categorizados (direto/indireto, cônjuge/companheiro, situação cadastral) e calcular o percentual com regras explícitas e testes. Até lá, deixar claro que a seleção manual é uma simulação.
