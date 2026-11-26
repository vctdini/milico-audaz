# Auditoria legislativa 01 — contribuição extraordinária de 1,5% da pensão militar

**Projeto:** Milico Audaz — Exército Brasileiro  
**Versão examinada:** Etapa 19  
**Data da conferência:** 25/11/2026  
**Escopo desta entrega:** contracheque; rubrica de contribuição para pensão militar; opção histórica do art. 31 da MP nº 2.215-10/2001.

## 1. Resultado executivo

Foi identificada uma divergência normativa relevante na calculadora de contracheque. A interface apresenta a opção histórica de 1,5% como um adicional selecionável pelo próprio militar no cálculo dos seus descontos. Entretanto, a redação vigente do art. 3º-A, § 3º, II, da Lei nº 3.765/1960 dirige essa contribuição extraordinária a **pensionistas** que preencham cumulativamente os requisitos legais: (a) o instituidor da pensão faleceu a partir de 29/12/2000; e (b) o instituidor optou em vida pelo pagamento da contribuição prevista no art. 31 da MP nº 2.215-10/2001. O dispositivo excepciona as filhas não inválidas pensionistas vitalícias, tratadas separadamente no inciso I.

**Classificação:** divergência confirmada entre o público/fluxo apresentado pela interface e a hipótese descrita na lei.  
**Severidade:** alta — pode superestimar o desconto mensal do militar ativo em 1,5% da base selecionada.  
**Situação da correção:** não aplicada nesta entrega. O código foi preservado para documentar a divergência e permitir decisão explícita antes de alterar a experiência do usuário.

## 2. Evidência normativa primária

### Lei nº 3.765/1960, texto compilado

- Art. 1º: identifica militares das Forças Armadas e pensionistas como contribuintes obrigatórios (texto compilado, linhas 15–22).
- Art. 3º-A, caput: trata da incidência sobre parcelas dos proventos na inatividade e sobre o valor integral da quota-parte de pensão militar (linhas 27–34).
- Art. 3º-A, § 3º, inciso I: prevê contribuição extraordinária de 3% para filhas não inválidas pensionistas vitalícias (linhas 35–38).
- Art. 3º-A, § 3º, inciso II: prevê contribuição extraordinária de 1,5% para os demais pensionistas cujo instituidor tenha falecido a partir de 29/12/2000 e optado em vida pela contribuição do art. 31 da MP nº 2.215-10/2001 (linhas 35–38).

Fonte oficial: https://planalto.gov.br/ccivil_03/leis/l3765compilado.htm

### MP nº 2.215-10/2001, art. 31

O art. 31 assegura aos atuais militares, mediante contribuição específica de 1,5% das parcelas constantes do art. 10, a manutenção dos benefícios previstos na Lei nº 3.765/1960 até 29/12/2000. A redação compilada também registra a revogação do § 1º que disciplinava renúncia até 31/08/2001, pela Lei nº 13.954/2019.

Fonte oficial: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm

### Lei nº 13.954/2019

A Lei nº 13.954/2019 deu a redação atual ao art. 3º-A da Lei nº 3.765/1960 e introduziu expressamente a regra de 1,5% no § 3º, II, vinculada aos pensionistas e aos requisitos relativos ao instituidor.

Fonte oficial: https://planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm

## 3. Evidência no código da Etapa 19

Arquivos e pontos identificados:

- `contracheque.html`: campo `id="pensao-15"`.
- `app.js`: `calcularDescontosObrigatorios()` calcula `pensaoHistorica` como 1,5% da mesma base usada no cálculo geral sempre que `optou15` estiver marcado.
- `app.js`: configuração da opção descreve que a opção histórica foi formalizada pelo usuário e registrada nos assentamentos.
- `app.js`: a prévia apresenta a rubrica como “12% total (10,5% + 1,5%)”.
- `app.js`: o mesmo cálculo é usado tanto na prévia quanto no resumo/relatório do contracheque.
- `tests/regression.test.js`: há teste que valida a soma de 10,5% + 1,5% como desconto do contracheque, consolidando o comportamento questionado.

## 4. Divergência e impacto

A opção histórica do art. 31 é uma característica histórica do instituidor e pode repercutir na contribuição extraordinária de determinados pensionistas. Ela não deve ser apresentada como uma opção atual do militar ativo para simplesmente adicionar 1,5% ao próprio desconto de pensão militar.

O código atual não modela o estado de pensionista, a data de falecimento do instituidor nem a confirmação de que o instituidor optou em vida. O único gatilho é um checkbox genérico no contracheque. Portanto, a implementação não representa os requisitos cumulativos do art. 3º-A, § 3º, II.

**Impacto financeiro ilustrativo:** para uma base hipotética de R$ 6.667,52, o adicional indevido de 1,5% seria R$ 100,01 por mês (arredondamento monetário). Este valor é apenas demonstração matemática do efeito do código, não conclusão sobre a base legal de contribuição de um caso individual.

## 5. Encaminhamento recomendado

1. Retirar o checkbox de 1,5% do fluxo padrão de contracheque do militar ativo.
2. Não apagar a regra histórica: mantê-la no banco legislativo como regra de elegibilidade de pensionistas, com requisitos explícitos.
3. Se o produto for contemplar cálculo de pensão militar, criar fluxo próprio de pensionista com, no mínimo, categoria de pensionista, condição da filha vitalícia não inválida, data do óbito do instituidor e comprovação da opção histórica do instituidor.
4. Até que esse fluxo exista e seja validado, não calcular automaticamente os 1,5% no contracheque ativo.
5. Rever os testes: substituir o teste que exige 12% para o ativo por testes que garantam que a contribuição extraordinária não seja aplicada a militar ativo e que só possa ser avaliada em contexto de pensionista com requisitos legais satisfeitos.
6. Validar separadamente a regra geral de 10,5%, suas bases de incidência e as situações funcionais. Esta entrega não homologa toda a matriz de contribuição para pensão militar.

## 6. Testes executados na versão examinada

Comando: `node --test tests/regression.test.js`  
Resultado: **62 testes aprovados, 0 falhas**.

A aprovação demonstra consistência com o comportamento codificado, não conformidade jurídica. Em particular, o teste que exige 1,5% adicional confirma a implementação existente, mas não valida sua aderência à Lei nº 3.765/1960.

## 7. Limites desta entrega

Esta é a primeira divergência documentada da auditoria. Não representa homologação integral do contracheque, das bases de incidência, do FuSEx, do IRRF, nem das demais ferramentas. Também não foi feita alteração de código nesta entrega.
