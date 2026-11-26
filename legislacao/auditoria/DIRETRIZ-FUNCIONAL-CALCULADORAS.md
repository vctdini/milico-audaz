# Diretriz funcional — calculadoras e simuladores do Milico Audaz

**Escopo:** exclusivamente Exército Brasileiro. Esta diretriz passa a orientar auditorias, especificações e implementações.

## Finalidade principal
As calculadoras são instrumentos de simulação. O usuário informa os dados, rubricas, períodos, percentuais e cenários que deseja testar; o sistema aplica a fórmula e apresenta o resultado, a memória de cálculo e as premissas utilizadas.

## Fora do escopo das calculadoras
A calculadora não decide se o usuário faz jus a uma receita, adicional, benefício, indenização ou desconto. Não deve bloquear uma simulação por ausência de requisito de elegibilidade, salvo validações técnicas dos próprios dados (por exemplo, data inválida, valor negativo não permitido ou campo obrigatório para executar a fórmula).

## Como tratar a legislação
A auditoria deve verificar:
- fórmula matemática;
- base de cálculo e rubricas incluídas/excluídas;
- percentuais, multiplicadores, tabelas e valores por competência;
- períodos, arredondamentos e regras de proporcionalidade;
- cenários e hipóteses que o usuário pode simular;
- transparência das premissas e avisos legais.

Requisitos legais de elegibilidade podem aparecer como notas informativas, cenários ou campos opcionais de simulação. Não devem ser convertidos em uma decisão automática de direito nesta camada.

## Módulo futuro independente
Em etapa posterior será desenvolvido um módulo separado (por exemplo, “Verificação de direitos”) para avaliar requisitos legais e administrativos de receitas, adicionais, benefícios e descontos. Esse módulo não substituirá nem restringirá as calculadoras.

## Classificações independentes
**Calculadora:** validada matematicamente e normativamente; parcialmente validada; não validada; sem implementação.

**Verificação de direitos:** não implementada; em desenvolvimento; validada.

Uma calculadora pode ser validada para simulação mesmo que a verificação de elegibilidade não exista.
