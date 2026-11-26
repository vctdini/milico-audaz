# AUD-023 — Tempo de serviço: calculadora de períodos e cenários

**Status:** ferramenta sem implementação; especificação funcional e normativa inicial concluída.

## 1. O que a calculadora deverá entregar
O usuário informa datas e períodos que deseja simular. O sistema calcula duração em dias, anos/dias equivalentes e subtotais separados. Não decide se o período será reconhecido administrativamente nem se o usuário já pode passar à reserva.

## 2. Distinções legais que não podem ser misturadas
A Lei nº 6.880/1980 estabelece distinção entre:
- **tempo de efetivo serviço** (arts. 134 e 136): apurado dia a dia entre o ingresso e a data-limite/desligamento, inclusive períodos parcelados; serviço em campanha tem contagem em dobro nas condições do § 1º; tempo de reserva convocado/mobilizado em funções militares também é contado; o total em dias é dividido por 365 para conversão em anos de efetivo serviço;
- **anos de serviço** (art. 137): tempo de efetivo serviço acrescido de períodos legalmente computáveis, como serviço público anterior e tempo computável em órgão de formação da reserva, além de hipóteses históricas/específicas do próprio artigo.

O art. 134, § 2º, prevê para aluno de órgão de formação da reserva 1 dia para cada período de 8 horas de instrução, desde que concluída com aproveitamento. O art. 137, inciso VI, contém regra de acréscimo por serviço em guarnição especial Categoria A; a aplicação depende de período, legislação aplicável e assentamentos, devendo ser lançada como parcela destacada e nunca presumida automaticamente para qualquer usuário.

Fontes oficiais:
- Lei nº 6.880/1980, texto compilado, arts. 134 a 143: https://www.planalto.gov.br/ccivil_03/leis/l6880.htm
- Decreto nº 4.307/2002, art. 93 e §§: https://www.planalto.gov.br/ccivil_03/decreto/2002/d4307.htm

## 3. Arquitetura recomendada do cálculo
Separar no resultado:
1. Períodos de efetivo serviço informados (um ou vários intervalos sem sobreposição);
2. acréscimos legais em categorias próprias, informados pelo usuário (campanha, serviço público anterior, formação de reserva, Categoria A ou outros períodos documentados);
3. total de dias de efetivo serviço;
4. total de dias de acréscimos;
5. conversão de dias em anos pela convenção aplicável (divisor 365, quando o resultado se referir a anos de efetivo serviço, conforme art. 136, § 4º);
6. memória de cálculo e aviso de que a contagem oficial depende de assentamentos e reconhecimento administrativo.

Não somar períodos sobrepostos. Exibir alertas para sobreposição, lacunas e datas fora de ordem. A data de corte será escolhida pelo usuário. A convenção de inclusão do dia inicial/final deve ser explicitada na interface e homologada com orientação do Exército antes da publicação.

## 4. O que não deve fazer
- Não declarar que o militar “já tem direito à reserva”.
- Não aplicar automaticamente 35 anos, 30/25 anos de atividade militar ou regra de transição de 17% como se fossem parte da contagem aritmética; esses requisitos pertencem a uma futura ferramenta independente de verificação de direitos.
- Não inferir tempo de campanha, serviço público, formação da reserva ou guarnição Categoria A sem o usuário informar o período/quantidade que deseja simular.
- Não converter automaticamente tempo de serviço em percentual de adicional de permanência. O adicional possui regra própria e será tratado em calculadora/aba separada.

## 5. Casos de teste
1. Um intervalo de 365 dias deve resultar em 365 dias e 1 ano pelo divisor 365.
2. Dois intervalos contíguos devem somar sem perda de dia segundo convenção explicitada.
3. Intervalos sobrepostos devem gerar alerta e não dupla contagem.
4. Serviço em campanha informado como 10 dias deve exibir 20 dias no cenário com duplicação, separadamente do tempo simples.
5. 8 horas de instrução concluída com aproveitamento devem corresponder a 1 dia na categoria de formação da reserva.
6. Acréscimo de serviço público anterior deve aparecer separado do efetivo serviço militar.
7. Datas inválidas ou final anterior ao início devem impedir o cálculo por erro de entrada, não por elegibilidade.
8. Mudança da data de corte deve atualizar todos os subtotais.

## 6. Pendências
- confirmar regras internas do Exército para documentos/assentamentos e apuração dos períodos;
- confirmar a aplicação temporal do art. 137, VI, e direitos preservados após alterações legislativas;
- definir e testar a convenção de contagem de dias com CPEx/DGP;
- separar eventual simulador de tempo para inatividade da ferramenta futura “Verificação de direitos”.

**Conclusão:** a calculadora será um contador de períodos e simulador de acréscimos informados, não um verificador de elegibilidade à reserva.
