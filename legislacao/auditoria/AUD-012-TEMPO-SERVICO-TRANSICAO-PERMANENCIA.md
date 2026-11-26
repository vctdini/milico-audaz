# AUD-012 — Tempo de serviço, regra de transição, reserva remunerada e adicional de permanência

**Status:** fundamento legal principal localizado; ferramenta ainda não implementada; cálculo individual depende de dados funcionais e averbações oficiais.
**Prioridade:** alta.
**Escopo:** Exército Brasileiro; militares de carreira, sem presumir aplicação idêntica a temporários, alunos, reserva ou reformados.
**Arquivos examinados:** `ferramentas.html`, `app.js`, `js/data/normas-2026.json`, `tests/regression.test.js`.

## 1. Situação no aplicativo

A ferramenta “Tempo de serviço” aparece em `ferramentas.html` como “Em breve”. Não existe página/calculadora específica nem função de cálculo de tempo no `app.js`. O aplicativo não calcula, a partir de datas e períodos, o tempo de efetivo serviço, anos de serviço, tempo de atividade de natureza militar, requisito de transição ou data estimada para reserva.

O contracheque permite informar manualmente o percentual de adicional de permanência (`pm`) e o percentual de ATS reconhecido. O motor calcula `pm = soldo × percentual informado`; não verifica se o militar completou os requisitos temporais. A interface orienta 5% após 720 dias além do tempo para inatividade e mais 5% por promoção, mas essa condição é declaratória/manual e não é auditada pelo sistema.

## 2. Conceitos legais que não podem ser confundidos

A Lei nº 6.880/1980, arts. 135 a 137, distingue:

- **Tempo de efetivo serviço:** contado dia a dia entre ingresso e data-limite/desligamento; o art. 136 prevê hipóteses específicas de cômputo e divisor 365 para converter dias em anos.
- **Anos de serviço:** tempo de efetivo serviço acrescido apenas dos períodos legalmente admitidos no art. 137.
- **Atividade de natureza militar:** requisito distinto exigido pelo art. 97 para reserva a pedido, não intercambiável automaticamente com anos de serviço total.

O art. 137 contém acréscimos históricos e revogações expressas. Não se deve reativar períodos em dobro de licença especial/férias nem acréscimos revogados apenas porque aparecem em redações antigas. Cada período civil, militar, de aluno, campanha, licença ou afastamento exige regra própria e comprovação/averbação.

## 3. Requisito geral atual para reserva a pedido

O art. 97 da Lei nº 6.880/1980, na redação da Lei nº 13.954/2019, exige militar de carreira com pelo menos **35 anos de serviço**, dos quais:

- **30 anos de atividade de natureza militar** nas Forças Armadas para as praças e para os oficiais expressamente listados no inciso I;
- **25 anos de atividade de natureza militar** para oficiais não enquadrados no inciso I (inciso II).

A ferramenta deve classificar a carreira/categoria antes de calcular a elegibilidade. Não aplicar automaticamente a regra dos oficiais do inciso II a praças.

## 4. Regra de transição do art. 22 da Lei nº 13.954/2019

A regra considera a situação do militar da ativa na data de publicação da Lei (17/12/2019):

- Quem já contava **30 anos ou mais de serviço** nessa data teve assegurado o direito de transferir-se para a inatividade com os direitos previstos na legislação então vigente.
- Quem contava **menos de 30 anos** deve cumprir: (a) o tempo que faltava para completar 30 anos, acrescido de 17%; e (b) o requisito de atividade de natureza militar de 25 anos, acrescido de 4 meses por ano a partir de 01/01/2021, até alcançar 30 anos, para os militares abrangidos pelo art. 97, inciso I.

A regra exige reconstruir a situação na data de corte e separar os dois relógios de contagem. Uma calculadora que use apenas “anos totais” ou apenas a data de incorporação produzirá resultado incompleto. O texto legal também prevê tratamento próprio para oficiais do art. 97, II; não extrapolar a regra do inciso I.

## 5. Proventos e quotas

O art. 56 da Lei nº 6.880/1980 prevê quotas de soldo por anos de serviço computáveis para inatividade, até 35. O art. 50, II e III, e a Lei nº 13.954/2019 disciplinam hipóteses de proventos integrais ou proporcionais, inclusive hipóteses especiais de transferência ex officio/quota compulsória.

A calculadora não deve reduzir a regra a “35 anos = integral, menos de 35 = proporcional” em todos os casos. Há exceções legais (idade-limite, situações dos incisos VIII e IX do art. 98, quota compulsória e regras transitórias/direito adquirido). A classificação da causa de transferência é obrigatória.

## 6. Adicional de permanência

A MP nº 2.215-10/2001, art. 3º, VI, define o adicional de permanência como parcela mensal devida ao militar que permanece em serviço após completar o tempo mínimo requerido para transferência à inatividade. A Tabela VI do Anexo II prevê:

- 5% do soldo quando, em atividade, a partir de 29/12/2000, completar 720 dias além do tempo requerido para a transferência;
- mais 5% a cada promoção em atividade, após satisfeito o requisito inicial.

A tela atual permite informar 0%, 5%, 10%, 15% ou 20% manualmente. Não coleta a data em que o militar completou o requisito de inatividade nem as promoções posteriores. Portanto, a incidência e o percentual ficam **não validados pelo sistema**, mesmo que o percentual manual informado possa corresponder a um direito reconhecido pelo CPEx.

## 7. ATS e disponibilidade militar

A MP nº 2.215-10, art. 30, preserva o ATS para militares que já o tinham adquirido até 29/12/2000, segundo as condições legais. A Lei nº 13.954/2019 criou o adicional de compensação por disponibilidade militar. O Decreto nº 10.471/2020:

- veda a concessão cumulativa de disponibilidade e ATS;
- determina o pagamento do adicional mais vantajoso;
- em igualdade de valor, assegura a disponibilidade;
- estabelece que percentuais de disponibilidade dos postos/graduações não são cumulativos e preserva o maior percentual alcançado na carreira.

O motor atual compara ATS e disponibilidade e aplica o maior, comportamento coerente com a vedação de cumulação. Entretanto, a elegibilidade do ATS deve depender de direito adquirido/averbado; não basta digitar qualquer percentual. Também é necessário validar a tabela de disponibilidade e histórico de postos/graduações.

## 8. Achados e classificação

| Item | Situação | Classificação |
|---|---|---|
| Ferramenta Tempo de serviço | Não implementada | Sem implementação |
| Cálculo de tempo de efetivo serviço | Não existe motor | Sem implementação |
| Anos de serviço e acréscimos | Não existe motor | Sem implementação |
| Requisito de 35 anos + atividade militar | Não existe motor | Sem implementação |
| Regra de transição art. 22 | Não existe motor | Sem implementação |
| Proventos integrais/proporcionais e exceções | Não existe simulador completo | Sem implementação |
| Adicional de permanência | Percentual manual, sem validar tempo e promoções | Parcialmente validado |
| Comparação ATS/disponibilidade | `Math.max(ATS, disponibilidade)` | Regra de não cumulação alinhada; elegibilidade/tabela pendentes |

## 9. Requisitos mínimos para implementar a calculadora

1. Data de ingresso/incorporação e data de referência.
2. Histórico de períodos, sem sobreposição: serviço militar, atividade de natureza militar, serviço público civil anterior, aluno de órgão de formação da reserva, campanha, convocações e afastamentos.
3. Indicação de quais períodos foram oficialmente reconhecidos/averbados e por qual documento.
4. Categoria: praça / oficial do art. 97, I / oficial do art. 97, II; carreira/temporário; situação na data de 17/12/2019.
5. Tempo total computável e tempo de atividade de natureza militar calculados separadamente.
6. Regra de transição individualizada, com memória de cálculo do pedágio de 17% e acréscimo de quatro meses por ano, quando aplicável.
7. Data de conclusão dos requisitos e histórico de promoções para adicional de permanência.
8. Causa da transferência para a reserva: a pedido, ex officio, idade-limite, quota compulsória ou hipótese especial.
9. Aviso de que o resultado é estimativo e depende de assentamentos, certidões e homologação administrativa.

## 10. Fontes primárias

- Lei nº 6.880/1980, arts. 50, 56, 97, 98 e 134 a 139: https://www.planalto.gov.br/ccivil_03/leis/l6880.htm
- Lei nº 13.954/2019, arts. 2º e 22: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
- MP nº 2.215-10/2001, arts. 1º, 3º, 30 e Anexo II, Tabela VI: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
- Decreto nº 10.471/2020, arts. 2º e 3º: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10471.htm

**Limitação:** fontes de apoio do CPEx foram utilizadas apenas para contextualizar o procedimento do adicional; a conclusão jurídica acima se apoia nos textos legais primários. Não foi localizada, nesta etapa, norma interna do Exército suficiente para substituir a análise individual dos assentamentos.
