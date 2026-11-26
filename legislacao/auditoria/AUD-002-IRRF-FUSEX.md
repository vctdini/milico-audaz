# Auditoria AUD-002 — Dedução do FuSEx na base mensal do IRRF

- **Projeto:** Milico Audaz — Etapa 19
- **Módulo:** Contracheque / cálculo do IRRF mensal e IR sobre férias
- **Data da análise:** 25/11/2026
- **Status:** Divergência normativa identificada; correção de código ainda não aplicada
- **Prioridade:** Alta

## 1. Achado

O motor `calcularIRRF()` soma as seguintes parcelas ao conjunto de deduções legais:

- contribuição para pensão militar (`op.pensao`);
- contribuição FuSEx (`op.fusex`);
- quota complementar FuSEx (`op.quota`);
- pensão alimentícia (`op.alimenticia`);
- dedução por dependentes.

O art. 52 da IN RFB nº 1.500/2014, na redação consolidada disponível no sistema Normas da Receita Federal, enumera as deduções da base mensal sujeita ao IRRF: pensão alimentícia nas condições legais, dependentes, contribuições à Previdência Social, contribuições qualificadas a previdência complementar e parcela isenta de aposentadoria/pensão para maiores de 65 anos. A contribuição ao FuSEx e sua quota complementar não aparecem como deduções mensais autônomas nessa lista.

Assim, **o código não deve subtrair automaticamente FuSEx (3%) nem quota complementar da base mensal do IRRF**. A eventual possibilidade de declarar pagamentos de assistência médica como despesa médica no ajuste anual é questão distinta e depende dos requisitos e comprovantes aplicáveis; não autoriza dedução automática no cálculo mensal da fonte pagadora.

## 2. Pontos do código afetados

- `app.js`, função `calcularIRRF()` (linha aproximada 8): inclui `op.fusex` e `op.quota` em `legais`.
- `atualizarDescontosPreview()` (aprox. linhas 171–172): passa `d.fusex` e `d.quota` para o IR mensal e o IR sobre férias.
- `FN.contracheque()` (aprox. linhas 209 e 212): repete o mesmo repasse para IR mensal e férias.

A divergência afeta o resultado exibido como IR mensal e IR sobre férias. Também pode alterar a escolha entre deduções legais e desconto simplificado.

## 3. Fundamento normativo consultado

1. **IN RFB nº 1.500/2014, art. 52**, texto consolidado no sistema Normas da Receita Federal: lista de deduções permitidas para determinar a base mensal do IRRF; o § 3º prevê uso alternativo do desconto simplificado mensal quando mais benéfico.
2. **IN RFB nº 1.500/2014, art. 94**, mesma fonte: trata de despesas médicas na Declaração de Ajuste Anual, incluindo pagamentos a entidades que assegurem direito de atendimento ou ressarcimento médico, sob as condições do dispositivo.
3. **Lei nº 9.250/1995**, especialmente regras de dedução e ajuste anual, a conferir em conjunto com a redação consolidada da IN RFB.

Fontes oficiais:
- Receita Federal — IN RFB nº 1.500/2014 (texto anotado/consolidado): https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=57670&visao=anotado
- Receita Federal — Tributação de 2026: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026
- Planalto — Lei nº 9.250/1995 compilada: https://www.planalto.gov.br/ccivil_03/leis/l9250compilado.htm

## 4. Exemplo ilustrativo de impacto

Para demonstrar a direção do erro, considere FuSEx de R$ 156,27 (3% de R$ 5.209,00) e quota de R$ 20,84 (0,4% da mesma base). O código reduz indevidamente a base mensal em R$ 177,11 antes de aplicar a tabela, caso essas contribuições sejam passadas como deduções legais. O impacto final depende da faixa, demais deduções e redução mensal da Lei nº 15.270/2025; portanto não se deve fixar uma diferença única para todos os usuários.

## 5. Delimitação e pendências

- **Não concluído:** enquadramento da contribuição de 10,5% para pensão militar como contribuição dedutível na categoria de Previdência Social para fins do art. 52, III, da IN RFB nº 1.500/2014. Exige confirmação específica em orientação oficial da Receita ou interpretação normativa aplicável aos militares.
- **Não concluído:** tratamento da contribuição FuSEx no ajuste anual como despesa médica, inclusive se o desconto obrigatório e a quota complementar satisfazem os requisitos do art. 94 e como comprovar valores não ressarcidos.
- **Não concluído:** incidência em 13º salário, férias e rendimentos sujeitos à tributação exclusiva, que devem ser auditados separadamente.

## 6. Recomendação técnica

Antes de alterar a fórmula, registrar teste de regressão que garanta que `fusex` e `quota` não sejam abatidos da base mensal do IRRF. A implementação deve separar explicitamente:

1. descontos em folha;
2. deduções legalmente admitidas no cálculo mensal do IRRF;
3. despesas potencialmente dedutíveis apenas no ajuste anual.

Nenhuma alteração de código foi aplicada nesta entrega. A fórmula atual permanece preservada até validação das pendências e autorização da etapa de correção.
