# AUD-007 — Assistência pré-escolar no contracheque

- **Escopo:** Etapa 19, arquivo `app.js`, função `calcularAssistenciaPreEscolar()` e integração em `FN.contracheque()`.
- **Status:** validação parcial; sem alteração de fórmula nesta rodada.
- **Prioridade:** média/alta (benefício financeiro e enquadramento individual).
- **Data da conferência:** 25/11/2026.

## 1. Normas primárias localizadas

1. **Portaria GM-MD nº 1.113, de 4/3/2024**, publicada no DOU de 7/3/2024 e com vigência a partir de 1/4/2024. Texto oficial no MDLegis: https://mdlegis.defesa.gov.br/norma_html/?ANO=2024&NUM=1113&SER=A .
   - Art. 1º: dependentes do nascimento aos cinco anos, inclusive.
   - Art. 2º, §§ 1º a 4º: dependentes na forma do art. 50, §§ 2º e 3º, do Estatuto; pessoa com deficiência de qualquer idade cronológica, desde que atendidos os requisitos de laudo e ratificação por junta; vedação de acumulação das modalidades direta e indireta.
   - Art. 6º: benefício não se incorpora à remuneração, não sofre contribuição para pensão militar ou assistência médico-hospitalar/social e não é rendimento tributável; única exceção de desconto é a cota-parte.
   - Art. 10: veda acumulação por militar com mais de um cargo público em regime de acumulação; pagamento simultâneo ao militar e cônjuge/companheiro militar ou servidor; e pagamento ao militar em licença para tratar de interesse particular. § 1º trata da guarda legal em divórcio/separação; §§ 2º e 3º tratam do militar agregado.
   - Art. 11: perda do benefício no mês seguinte ao que dependente completar seis anos de idade cronológica e mental, óbito ou situações do art. 10.
   - Arts. 12 e 13: valor-teto e cota-parte de 5% a 25%, calculada sobre o valor-teto proporcional ao nível de remuneração; VB corresponde ao soldo de soldado engajado indicado no art. 13, § 1º; remuneração para esse fim é a definida na MP 2.215-10/2001 (§ 3º).
   - Anexo: faixas de remuneração e percentuais de cota-parte.
2. **Portaria GM-MD nº 3.019, de 28/5/2026**, publicada no DOU de 29/5/2026. Fixou R$ 526,64 em todo o território nacional, com efeitos financeiros a partir de 1/5/2026, e revogou expressamente a Portaria Conjunta MGI/MD nº 31/2024. Referência da publicação DOU: seção 1, edição 100, página 39. Consulta de reprodução do texto: https://www.sijur.com.br/dou/2026/05/29/portaria-gm-md-3-019-gabinete-do-ministro.html .

## 2. O que o código faz hoje

- Usa teto fixo de R$ 526,64.
- Usa como VB o soldo cadastrado para `sd_eng` (R$ 1.927,00 no catálogo 2026).
- Calcula múltiplos do VB pela variável `base`, definida como `f.base` mais receitas extras marcadas como integrantes da base de contribuição.
- Aplica 5% até 5 VB; 10% acima de 5 até 10 VB; 15% acima de 10 até 15 VB; 20% acima de 15 até 20 VB; 25% acima de 20 VB.
- Subtrai a cota-parte do teto e multiplica pelo número de dependentes informado.
- Não soma o auxílio pré-escolar à base de pensão militar/FuSEx no trecho examinado, nem o trata como rendimento tributável; isso é compatível com o art. 6º.

## 3. Resultado da conferência

### 3.1 Valor-teto

**Confirmado para competência a partir de 1/5/2026:** R$ 526,64. O valor constante no código está correto para competências a partir de maio de 2026. O sistema, contudo, não oferece valor histórico por competência: para meses anteriores a maio/2026, o teto atual não deve ser aplicado automaticamente. A base histórica deve manter R$ 484,90 de junho/2024 até abril/2026, conforme Portaria Conjunta MGI/MD nº 31/2024; competências anteriores exigem recuperação do valor então vigente.

### 3.2 Cota-parte

A estrutura de percentuais implementada corresponde às faixas resumidas no anexo. A função aplica percentuais sobre o teto, não sobre o valor líquido nem sobre o total da remuneração. Esse desenho é compatível com o art. 13 e o anexo.

**Ponto pendente:** confirmar o cálculo da variável `base` contra a definição completa de remuneração da MP 2.215-10/2001 e contra o texto integral do anexo. Não homologar a base apenas porque a função usa o soldo de referência correto.

### 3.3 Elegibilidade e quantidade de dependentes

**Limitação funcional identificada, não erro aritmético comprovado:** o formulário recebe somente quantidade de dependentes. Não coleta idade/data de nascimento, deficiência/laudo ratificado, vínculo/dependência estatutária, guarda legal, modalidade direta/indireta, eventual recebimento pelo cônjuge/companheiro ou licença para tratar de interesse particular. Portanto, pode estimar crédito para dependente ou militar que não preencha os requisitos legais. A calculadora deve deixar claro que o campo representa dependentes já habilitados administrativamente; futuramente, deverá implementar as condições legais ou apresentar alertas e bloqueios.

### 3.4 Histórico de competência

**Divergência estrutural:** teto fixo R$ 526,64 aplicado sem considerar o mês de referência. Criar tabela versionada por vigência. Para competências de maio/2026 em diante, R$ 526,64; para junho/2024 a abril/2026, R$ 484,90. O ato de 2026 revogou a Portaria Conjunta nº 31/2024, mas os efeitos financeiros do novo teto começam em 1/5/2026.

## 4. Providências recomendadas

1. Não alterar a fórmula de cota-parte nesta etapa, pois a estrutura percentual está compatível em princípio.
2. Parametrizar o teto por competência, mantendo histórico.
3. Registrar a fonte da Portaria 3.019/2026 com referência ao DOU e substituir o link secundário por consulta direta à publicação oficial assim que o endereço definitivo for validado.
4. Incluir aviso: “Informe apenas dependentes já habilitados para assistência pré-escolar; a simulação não verifica elegibilidade administrativa”.
5. Projetar formulário/validador de elegibilidade conforme arts. 1º, 2º, 10 e 11.
6. Homologar a variável `base` usada na faixa de remuneração contra MP 2.215-10/2001 e o anexo da Portaria 1.113/2024.

## 5. Referências consultadas

- MDLegis — Portaria GM-MD nº 1.113/2024: https://mdlegis.defesa.gov.br/norma_html/?ANO=2024&NUM=1113&SER=A
- DOU — Portaria GM-MD nº 1.113/2024, seção 1, 7/3/2024: https://mdlegis.defesa.gov.br/norma_pdf/?ANO=2024&NUM=1113&SER=A
- Portaria GM-MD nº 3.019/2026, publicação no DOU de 29/5/2026, seção 1, edição 100, p. 39 (texto reproduzido): https://www.sijur.com.br/dou/2026/05/29/portaria-gm-md-3-019-gabinete-do-ministro.html
- Portaria Conjunta MGI/MD nº 31/2024 (valor histórico de R$ 484,90): https://legis.sigepe.gov.br/sigepe-bgp-ws-legis/legis-service/download/?id=0019207993-ALPDF%2F2024
- Perguntas frequentes da PAPEM, usadas apenas como apoio explicativo das faixas, não como fonte normativa: https://www.marinha.mil.br/papem/node/206
