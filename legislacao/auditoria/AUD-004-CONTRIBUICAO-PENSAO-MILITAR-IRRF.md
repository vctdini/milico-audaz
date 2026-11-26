# Auditoria AUD-004 — Dedutibilidade da contribuição de 10,5% para pensão militar no IRRF

- **Projeto:** Milico Audaz — Etapa 19
- **Módulo:** Contracheque / IRRF mensal, férias e 13º
- **Data da análise:** 25/11/2026
- **Status:** Questão jurídica em aberto; não classificar como dedutível ou indedutível sem confirmação específica
- **Prioridade:** Alta
- **Código alterado:** Não

## 1. Questão

O código inclui `op.pensao` no conjunto de deduções legais usado por `calcularIRRF()`. É necessário determinar se a contribuição obrigatória de 10,5% prevista na Lei nº 3.765/1960 para o Sistema de Proteção Social dos Militares se enquadra, para fins tributários, como contribuição à Previdência Social da União ou como contribuição de montepio militar dedutível.

## 2. Evidência oficial relevante

A Receita Federal, no Perguntas e Respostas IRPF 2026, pergunta 336 (“Montepio civil ou militar”), afirma que contribuições descontadas para montepio civil ou militar são dedutíveis na retenção mensal e na declaração **quando destinadas a custear benefícios complementares aos da previdência social**. A resposta cita o art. 72, § 1º, e arts. 87 e 88 da IN RFB nº 1.500/2014, além de outras normas.

Fonte oficial:
https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/dirpf/p-r-irpf-2026-v1-00-2026-04-23.pdf

A Lei nº 13.954/2019, ao alterar a Lei nº 3.765/1960, qualifica a contribuição de 10,5% como “contribuição para a pensão militar” e disciplina sua incidência e finalidade no sistema de proteção social militar. O texto consultado não usa, nesses dispositivos, a expressão “montepio” nem afirma que a contribuição se destina a benefício complementar à previdência social.

Fonte oficial:
https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm

## 3. Conclusão provisória

A pergunta 336 da Receita é uma evidência importante de que certas contribuições de montepio militar são dedutíveis, mas sua redação condiciona a dedução à finalidade de custear benefícios complementares. Não é tecnicamente seguro equiparar automaticamente essa hipótese à contribuição obrigatória de 10,5% do Sistema de Proteção Social dos Militares sem orientação específica da Receita, solução de consulta aplicável ou enquadramento jurídico formal.

Assim, a dedução automática atualmente implementada permanece **não homologada**. Não se recomenda removê-la nem mantê-la como regra validada até resolver o enquadramento.

## 4. Providência necessária

Localizar manifestação oficial da Receita Federal ou interpretação normativa que trate especificamente da contribuição obrigatória para pensão militar instituída pela Lei nº 3.765/1960, na redação da Lei nº 13.954/2019. Confirmar também se o tratamento é igual para militar ativo, militar inativo e pensionista e se há diferenças entre IR mensal, férias, 13º e ajuste anual.
