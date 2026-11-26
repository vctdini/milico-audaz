# AUD-009 — Revisão da dedutibilidade no IRRF: FuSEx e pensão militar

**Status:** pendente de parecer conclusivo sobre o tratamento mensal; evidências oficiais novas identificadas.  
**Prioridade:** alta.  
**Relação:** AUD-002 e AUD-004.

## 1. Comportamento do código

`calcularIRRF()` recebe os campos `pensao`, `fusex` e `quota` e soma todos como deduções legais. Em `app.js`, os cálculos mensais e os cálculos de férias/13º também passam os valores de FuSEx e quota para a função.

## 2. Evidência oficial da Receita Federal

O Perguntas e Respostas IRPF 2026, pergunta 336, informa que contribuições descontadas para montepio civil ou militar são dedutíveis da base de cálculo para retenção mensal na fonte e na declaração, desde que destinadas a custear benefícios complementares aos da Previdência Social. A resposta cita a IN RFB nº 1.500/2014, art. 72, §1º, e arts. 87 e 88.

Essa orientação é relevante para a contribuição de pensão militar, mas a aplicação específica à contribuição atual de 10,5% do Sistema de Proteção Social dos Militares deve ser amarrada ao enquadramento legal e à documentação oficial da folha. A página oficial do CPEx para emissão do CRP agrupa FuSEx (3% e quotas), pensão militar (10,5%) e pensão militar 1,5% na linha denominada “Contribuição Previdenciária Oficial”. Essa classificação institucional é evidência importante de como o CPEx informa os valores para o comprovante, mas não prova, isoladamente, que cada parcela de saúde seja dedução permitida na retenção mensal do IRRF.

## 3. Distinção necessária

- **Pensão militar/montepio:** existe orientação expressa da Receita sobre dedutibilidade de contribuições para montepio militar quando destinadas a benefícios complementares previdenciários. A análise do enquadramento dos 10,5% deve prosseguir com base na Lei 3.765/1960 e na documentação do CPEx.
- **FuSEx:** sua finalidade normativa é custear assistência médico-hospitalar e social, não benefício complementar de aposentadoria/pensão. A pergunta 336 da Receita não autoriza automaticamente deduzir contribuição de assistência à saúde. A classificação agregada no CRP precisa ser interpretada com cautela e confrontada com leiaute/instruções de preenchimento e com a regra de retenção mensal.
- **Quota complementar FuSEx:** segue a mesma necessidade de análise da contribuição principal; não deve ser deduzida automaticamente apenas porque aparece no CRP em um grupo de contribuição oficial.

## 4. Resultado

A AUD-002 permanece como divergência relevante no que diz respeito à inclusão automática de FuSEx e quota como deduções legais mensais, mas deve ser descrita como **pendente de validação jurídico-tributária final**, considerando a evidência do CRP/CPEx. A AUD-004 também permanece pendente, agora com evidência oficial favorável à dedutibilidade de contribuições de montepio militar, sem homologação automática da contribuição de 10,5% até completar o enquadramento.

Não alterar a fórmula nesta etapa. A próxima verificação deverá consultar a ficha/CRP oficial e a documentação do CPEx para confirmar se o agrupamento do CRP é apenas uma categoria de informe anual ou se orienta também a retenção mensal. Separar os campos `deducaoPensaoMilitarIRRF`, `deducaoFusexIRRF` e `deducaoQuotaFusexIRRF` no futuro motor, com regras próprias.

## 5. Fontes oficiais

- Receita Federal, Perguntas e Respostas IRPF 2026, pergunta 336: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/dirpf/p-r-irpf-2026-v1-00-2026-04-23.pdf
- CPEx, Conheça seu CRP: https://contrachequecpex.eb.mil.br/area_individual/CRP2022_ae.asp
- Lei nº 3.765/1960, texto compilado: https://planalto.gov.br/ccivil_03/leis/l3765compilado.htm
