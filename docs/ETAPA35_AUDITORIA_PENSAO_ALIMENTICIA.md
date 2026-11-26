# Etapa 35 — Auditoria da pensão alimentícia

## Escopo
Revisão funcional da calculadora de pensão alimentícia, partindo da Etapa 34. O simulador não interpreta o título judicial, não decide elegibilidade e não define rubricas integrantes da base.

## Fontes normativas consultadas

1. **Código de Processo Civil (Lei nº 13.105/2015), art. 529, caput e §§ 1º a 3º** — admite requerimento de desconto em folha quando o executado é militar; o ofício judicial deve indicar a importância mensal, duração e conta de depósito; o § 3º trata do desconto parcelado de débito alimentar executado somado à prestação vincenda, limitado a 50% dos ganhos líquidos.
2. **Lei nº 15.479/2026** — acrescenta o art. 529-A ao CPC para tratar de transferência automática. A lei prevê vacatio legis de um ano a partir da publicação oficial (30/07/2026), portanto essa inovação ainda não está em vigor na data desta etapa (25/11/2026). Não foi incorporada à lógica do simulador.

Fontes oficiais:
- https://planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm
- https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15479.htm

## Achados da versão anterior
- A ferramenta aceitava apenas percentual sobre uma base informada, embora o CPC, art. 529, § 2º, descreva a importância mensal determinada no ofício e não imponha um único formato universal de fixação.
- A descrição da página não deixava suficientemente explícito que a base e as incidências devem ser extraídas do título judicial ou acordo homologado.
- Não havia ressalva clara sobre o alcance específico do limite de 50% do art. 529, § 3º.

## Alterações implementadas
- Incluído seletor entre **percentual sobre base informada** e **valor mensal fixo**.
- No modo percentual, a memória de cálculo apresenta base informada × percentual.
- No modo fixo, a memória identifica o valor mensal digitado como valor estabelecido no título.
- Os dois modos arredondam o resultado para centavos.
- Validação de campos vazios, valores não numéricos e valores negativos.
- Mantido limite técnico de 0% a 100% para o campo percentual; esse limite é validação de entrada, não declaração sobre o conteúdo de uma decisão judicial específica.
- A interface esclarece que a base e as rubricas incidentes (13º, férias, adicionais, verbas eventuais e outros) dependem do título judicial ou acordo homologado.
- A interface esclarece que o teto do art. 529, § 3º, não é aplicado como teto geral da prestação mensal: ele se refere ao parcelamento de débito alimentar executado somado à prestação vincenda.
- Cache do Service Worker atualizado para a Etapa 35.

## Pontos que permanecem fora do escopo / pendentes
- Não há definição automática de base líquida ou bruta.
- Não há classificação de rubricas remuneratórias que integram ou não a base; isso deve ser lido no título judicial e nas determinações aplicáveis.
- Não há cálculo de atrasados, juros, correção monetária, parcelamento de débito ou teto do art. 529, § 3º.
- Não há calendário de vigência, reajuste ou término da obrigação; o prazo e a atualização dependem da ordem judicial.
- Não há interpretação de incidência sobre 13º, férias, adicionais, verbas eventuais ou pagamentos retroativos.
- Não foi implementado o art. 529-A incluído pela Lei nº 15.479/2026, pois a lei ainda está em vacatio legis na data da etapa.

## Testes
- Percentual sobre base informada.
- Valor mensal fixo.
- Arredondamento em centavos.
- Valores negativos e entradas não numéricas.
- Mensagens sobre base definida no título e limite contextual do art. 529, § 3º.
- Suíte de regressão do projeto: 79 testes aprovados, 0 reprovados.

## Conclusão
A calculadora passa a oferecer dois formatos de simulação (percentual e valor fixo) e deixa explícito que o título judicial ou acordo define base, valor, duração e incidências. A ferramenta continua sendo exclusivamente um simulador financeiro e não substitui a ordem judicial, o setor pagador ou orientação jurídica.
