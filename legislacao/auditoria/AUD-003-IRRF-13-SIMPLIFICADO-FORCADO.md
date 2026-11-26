# Auditoria AUD-003 — Desconto simplificado forçado no IR do 13º salário

- **Projeto:** Milico Audaz — Etapa 19
- **Módulo:** Contracheque / IRRF do adicional natalino (13º)
- **Data da análise:** 25/11/2026
- **Status:** Divergência de implementação documentada; correção pendente
- **Prioridade:** Alta
- **Código alterado:** Não

## 1. Achado

O código calcula o IR do 13º salário chamando `calcularIRRF(natalinoCalc.total, {modo:'simplificado'})` (atualmente em `app.js`, linha aproximada 213). Essa opção força o desconto simplificado, independentemente do valor das deduções legais correspondentes ao 13º.

A IN RFB nº 1.500/2014, art. 13, estabelece que o 13º é tributado exclusivamente na fonte e separadamente dos demais rendimentos. O § 6º prevê, na determinação da base do 13º, deduções específicas correspondentes a esse rendimento, incluindo pensão alimentícia e contribuição previdenciária nas condições ali descritas. O § 8º prevê o desconto simplificado como alternativa às deduções do art. 52, **caso seja mais benéfico ao contribuinte**.

Portanto, a fonte pagadora não deve aplicar invariavelmente o simplificado sem comparar com as deduções legais admissíveis e correspondentes ao 13º. O uso obrigatório do parâmetro `modo:'simplificado'` elimina essa comparação.

## 2. Evidência no código

- `app.js`: `const irNatalino=...calcularIRRF(natalinoCalc.total,{modo:'simplificado'})...`
- `calcularIRRF()` respeita `op.modo==='simplificado'` e define `usarLegal=false`, mesmo quando `legais` seria superior ao desconto simplificado.
- O demonstrativo do 13º apresenta o desconto simplificado aplicado, mas não apura uma alternativa de deduções legais correspondentes ao evento.

## 3. Fundamento normativo

**IN RFB nº 1.500/2014, art. 13, caput, incisos I a IV, § 6º e § 8º**, com alterações, inclusive as da IN RFB nº 2.299/2025:
- tributação exclusiva na fonte, separada dos demais rendimentos;
- consideração das deduções que correspondam ao 13º;
- desconto simplificado alternativo, se mais benéfico.

Fonte oficial da Receita Federal — texto consolidado da IN RFB nº 1.500/2014:
https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=57670&visao=anotado

A versão oficial consultada reproduz o art. 13 e a alteração de 2025. O Manual Perguntas e Respostas IRPF 2026 confirma que a retenção do 13º é exclusiva e separada; para a regra específica de comparação do simplificado, prevalece o texto normativo do art. 13, § 8º.

## 4. Impacto potencial

Quando as deduções legais admissíveis e vinculadas ao 13º superarem R$ 607,20 (valor equivalente a 25% do limite superior da faixa mensal de alíquota zero usada como simplificado em 2026), o cálculo atual pode produzir IR maior que o devido pela alternativa legal. O impacto depende das deduções efetivamente cabíveis e do rendimento tributável do 13º.

Não se deve incluir automaticamente no cálculo do 13º toda dedução mensal. Cada parcela precisa corresponder ao próprio 13º, conforme art. 13, § 6º. A classificação da contribuição militar de 10,5% permanece pendente em AUD-004.

## 5. Delimitação

Este achado não conclui quais rubricas remuneratórias integram a base tributável do 13º, nem resolve a dedutibilidade da contribuição de pensão militar. Esses pontos permanecem em auditorias separadas.

## 6. Recomendação

Criar cálculo paralelo do 13º com (a) deduções legais admissíveis e correspondentes ao evento e (b) desconto simplificado. Selecionar o menor imposto, registrando no demonstrativo qual método foi mais benéfico. Não reutilizar automaticamente deduções do IR mensal sem verificar sua correspondência ao 13º.
