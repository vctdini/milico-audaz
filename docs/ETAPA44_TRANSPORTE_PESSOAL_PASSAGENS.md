# Etapa 44 — Transporte de pessoal e passagens (soma de tarifas informadas)

## Objetivo
Permitir que o usuário declare os passageiros e informe as tarifas de ida e/ou volta para obter a soma estimada das passagens, sem presumir quantidade, identidade, dependência, categoria tarifária, modalidade ou preço.

## Base normativa consultada
- Decreto nº 4.307/2002, art. 47, inciso II: o pagamento em espécie do transporte de pessoal é calculado pela soma das tarifas das passagens a que o militar tiver direito.
- Decreto nº 4.307/2002, arts. 45 e 46: categorias e hipóteses de transporte rodoviário, ferroviário, aquaviário e aéreo. O enquadramento e a autorização dependem da autoridade requisitante.
- Decreto nº 4.307/2002, arts. 48 e 49: requisições separadas e dados necessários ao transporte de pessoal.
- Portaria nº 290-DGP/2013 (EB30-N-10.003), arts. 51 e 52: no âmbito do Exército, transporte do militar da ativa movimentado com desligamento para outra sede por interesse do serviço/ex-officio, de dependentes e de um empregado doméstico; regras sobre meios, acomodações e passagens aéreas.
- Portaria nº 290-DGP/2013, arts. 55 a 57: solicitação, documentos, conferência e definição administrativa da modalidade.

## Implementado
- O painel de passageiros só aparece quando o usuário marca a caixa “Passagens”.
- Linhas dinâmicas para cadastrar passageiros, com destino, categoria declarada, nome opcional e tarifas de ida e volta.
- Categorias selecionáveis: militar, dependente, empregado doméstico e outro. O sistema não cria passageiros automaticamente.
- Soma aritmética das tarifas de ida e volta por pessoa, com memória discriminada.
- Validação de valores negativos/inválidos e de campos essenciais.
- O empregado doméstico só entra na soma se o usuário criar a linha e informar a tarifa correspondente; a caixa declaratória não cria passagem por si só.
- Removida a estimativa anterior de transporte pessoal baseada em R$ 0,50 por km, pois não foi demonstrada como fórmula geral de indenização de passagem no fundamento normativo consultado.

## Limites explícitos
- A calculadora não consulta tarifas de mercado nem tabela fixa de passagem. O usuário informa o valor cotado ou apurado.
- A soma é estimativa dos valores declarados. Não decide quem faz jus, modalidade, acomodação, concessão, disponibilidade orçamentária, autorização ou pagamento.
- O cálculo do art. 47, II, refere-se ao pagamento em espécie. Quando o transporte é executado por conta da União, a emissão/contratação do bilhete segue o procedimento administrativo aplicável.
- Não foi implementada análise automática de elegibilidade de dependentes ou empregado doméstico.

## Fontes oficiais consultadas
- Decreto nº 4.307/2002 (texto em PDF disponibilizado por organização militar): https://www.1de.eb.mil.br/images/Documentos/2025/Informacoes%20de%20carater%20geral/Dec-n4307-de-18-JUL-02.pdf
- Portaria nº 290-DGP/2013, EB30-N-10.003 (PDF disponibilizado pelo Gabinete do Comandante do Exército): https://www2.gabcmt.eb.mil.br/a1/images/phocadownload/Diversos/port_290.pdf

## Testes
Cobertura de soma de tarifas ida/volta, somente ida, linha vazia, destino/categoria ausentes, tarifa inválida/negativa, visibilidade condicional do painel e remoção da fórmula arbitrária por quilômetro.
