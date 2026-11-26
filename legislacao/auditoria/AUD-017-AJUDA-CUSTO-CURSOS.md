# AUD-017 — Ajuda de custo para cursos/comissões

**Ferramenta:** `ajuda-custo-cursos.html` / `FN.ajuda('cur')` em `app.js`  
**Classificação:** PARCIALMENTE VALIDADA. Multiplicadores principais das situações “b” e “c” coincidem com o Anexo V; elegibilidade temporal e composição da remuneração de referência não estão integralmente validadas. Há controle de interface sem efeito no motor.  
**Código alterado:** não.

## Fontes primárias

1. Lei nº 13.954/2019, art. 15 e Anexo V, situações “a” a “f”: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13954.htm
2. MP nº 2.215-10/2001, art. 1º (parcelas que compõem a remuneração): https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
3. Portaria nº 290-DGP/2013 (EB30-N-10.003), cópia institucional localizada; vigência e alterações pendentes: https://www2.gabcmt.eb.mil.br/a1/images/phocadownload/Diversos/port_290.pdf

## Regra legal comparada

Para militar com dependente, o Anexo V prevê:

- situação “b”: comissão superior a 3 e até 12 meses, sem desligamento da OM — duas remunerações na ida e uma na volta (total de 3);
- situação “c”: comissão superior a 15 dias e até 3 meses, sem desligamento da OM — uma remuneração na ida e outra na volta (total de 2);
- situação “e”: sem dependente, metade dos valores das situações “a” a “d”.

O motor utiliza multiplicador 3 para “b”, 2 para “c” e reduz à metade quando `dep` não está marcado. Esses fatores reproduzem os multiplicadores do Anexo V para as situações selecionadas.

## Achados no código e na tela

1. A interface escolhe manualmente “mais de 3 até 12 meses” ou “mais de 15 dias até 3 meses”. Não coleta datas de início/fim e não calcula a duração; portanto, o usuário pode selecionar uma faixa incompatível com a duração real, inclusive em torno dos limites de 15 dias, 3 meses e 12 meses.
2. O cálculo usa `perfil().total` como remuneração de referência. A composição inclui soldo, adicional militar, habilitação, o maior entre ATS/disponibilidade, compensação orgânica, permanência e localidade especial. A exata composição aplicável à ajuda de custo precisa ser confrontada com o texto consolidado e com a regulamentação específica do Exército, por categoria e situação; ainda não homologada integralmente.
3. A tela apresenta a caixa “Exerço cargo de comando, direção ou chefia (GR de 10%)”, mas `FN.ajuda()` não lê o campo `cmd`. Além disso, `perfil()` define `gr=0` e a função `comp()` exclui GR do `total`. Assim, a caixa não produz qualquer efeito no resultado. Não se conclui nesta auditoria se GR deve integrar a base sem confirmar a interpretação normativa aplicável; conclui-se apenas que a opção atual é inoperante e induz o usuário a acreditar que foi considerada.
4. O modo `cur` não é usado pela função; as opções “b” e “c” são processadas pelo mesmo motor compartilhado com movimentação. Isso dificulta aplicar regras próprias da comissão/curso e distinguir direitos de ida e volta, eventual desligamento, interesse da administração e fatos administrativos.
5. A Portaria 290-DGP/2013 foi localizada em cópia institucional, mas sua cadeia de alterações e vigência atual ainda não foram comprovadas em fonte oficial consolidada.

## Conclusão e recomendação

Não alterar os multiplicadores nesta etapa. Corrigir o modelo de dados antes de homologar: coletar datas exatas, natureza da comissão, autoridade/ato de designação, duração, existência de desligamento da OM, dependentes habilitados e remuneração de referência validada. A caixa GR deve ser removida ou implementada somente após decisão jurídica documentada; no estado atual é um controle sem efeito.
