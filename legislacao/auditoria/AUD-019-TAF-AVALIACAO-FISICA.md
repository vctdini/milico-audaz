# AUD-019 — Calculadora de TAF

**Classificação:** não validada para resultado oficial; tabelas e critérios-base localizados em fonte primária, mas o fluxo de avaliação está incompleto.  
**Prioridade:** alta.  
**Arquivos examinados:** `calculadora-taf.html`, `taf.js`, `taf-dados.js`.

## Fonte normativa primária

A Portaria EME/C Ex nº 850, de 31/08/2022, aprovou a Diretriz EB20-D-03.053 e entrou em vigor em 01/01/2023; revogou a Portaria nº 032-EME/2008 (art. 2º). O PDF institucional consultado apresenta folha de registro de modificações sem alterações registradas. A página institucional da ECEME lista a Portaria nº 850/2022 como “Em vigor”.

A Diretriz determina que o padrão depende de linha de ensino, situação funcional, idade e sexo (itens 2.1.4 a 2.1.6). PBD se aplica, em regra, a OM não operativa/estabelecimentos de ensino; PAD a OM operativa, com exceções; PED a OM de Forças de Emprego Estratégico e universos específicos de formação (itens 2.3 a 2.5 e tabela do item 3.1.6).

Os itens 3.2.4 a 3.2.7 estabelecem avaliação somente de suficiência a partir dos 50 anos, e para barra fixa a partir dos 40; os mínimos são Regular para PBD, Bom para PAD e Muito Bom para PED. O item 3.2.11 determina que a suficiência global é contagiante: qualquer OII não suficiente torna o resultado global não suficiente. O item 3.2.14 prevê “Não Realizado” se o militar não puder realizar ou não finalizar quaisquer dos OII, inclusive PPM, exceto TAF Alternativo.

As tabelas dos Anexos A a D discriminam sexo e LEM. A tabela de OII do item 3.4.1 prevê, para LEMB, corrida, flexão, abdominal e barra para 18–39 anos; PPM para determinados militares PAD/PED até Capitão/2º Sgt (com exceções); 40–49 anos incluem barra apenas para suficiência; 50+ incluem corrida, flexão e abdominal apenas para suficiência. O item 3.4.2 prevê três OII para LEMS/LEMC/LEMCT.

## Achados no código

1. **Provas ausentes não são bloqueadas.** `calcular()` inclui apenas os campos preenchidos. Um usuário pode informar apenas uma prova e o resultado global é calculado sobre o subconjunto; `ok.every(i => i.suf)` retorna `true` se `ok` estiver vazio.
2. **Erros são excluídos da suficiência global.** O código separa `erros` e `ok`, mas calcula `suf` apenas com `ok`. Se houver somente item com erro, `every()` sobre lista vazia também retorna verdadeiro. Isso pode produzir “Suficiente” indevidamente.
3. **Enquadramento do padrão é manual.** O formulário permite escolher PBD/PAD/PED sem coletar natureza da OM, exceções, situação funcional, primeiro TAF após apresentação/retorno ou universo específico. A Diretriz não define padrão apenas por escolha livre do usuário.
4. **PPM é opcional por checkbox.** A obrigatoriedade depende de LEMB, situação funcional PAD/PED, posto/graduação e exceções descritas no item 3.9.4 e 3.9.11; o formulário não coleta todos esses dados. O checkbox não substitui a regra normativa.
5. **TAF Alternativo, NR e aptidão em inspeção de saúde não estão modelados.** A página é simulador de índices, não pode declarar resultado oficial sem estes estados e sem os atos/boletins competentes.
6. **A tabela de faixa etária e os índices codificados foram estruturados para sexo/LEMB e demais linhas; nesta rodada não foi concluída a comparação célula a célula de todos os valores dos Anexos A–D.** Portanto, não homologar ainda os dados numéricos completos.

## Recomendação

Bloquear resultado global quando faltar qualquer OII obrigatório, tratar erro/NR como não suficiente ou não realizado conforme a hipótese, e modelar a seleção do padrão e da PPM a partir de dados de enquadramento. Acrescentar testes para todas as fronteiras de idade, sexo, LEM, PBD/PAD/PED, barra (40+), 50+, PPM e tabelas de suficiência. Manter a ferramenta explicitamente como estimativa de treinamento até validação integral.

## Fontes

- Portaria EME/C Ex nº 850/2022 e Diretriz EB20-D-03.053 (PDF institucional ECEME): https://www.eceme.eb.mil.br/images/caeceme/legislacao/Port850EMEDtzAvlFisEB.pdf
- Página institucional ECEME com relação de normas e status: https://www.eceme.eb.mil.br/processo-seletivo-caem/legislacao
