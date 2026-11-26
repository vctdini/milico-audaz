# AUD-015 — Auxílio-transporte: fórmula, elegibilidade e parâmetros de deslocamento

**Ferramenta:** `auxilio-transporte.html` / `FN.transporte()` em `app.js`  
**Classificação:** NÃO VALIDADA para cálculo final. A regra central de 22 dias e 6% está parcialmente refletida, mas a entrada de dados não representa corretamente as exceções legais.  
**Código alterado:** não.

## Fontes primárias

1. Decreto nº 12.117, de 17/07/2024, arts. 2º a 12: https://www2.camara.leg.br/legin/fed/decret/2024/decreto-12117-17-julho-2024-795982-publicacaooriginal-172459-pe.html
2. MP nº 2.215-10/2001, art. 2º, II, “a”: https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm
3. Página institucional da 7ª Região Militar que lista a Portaria nº 849, de 14/07/2016 (EB10-IG-02.018), entre as referências de auxílio-transporte: https://7rm.eb.mil.br/index.php/assistencia-social

## Confronto com o código

A função atual calcula:

- despesa mensal = (tarifa ida + tarifa volta) × campo `dias`;
- cota-parte = soldo × 22/30 × 6%;
- benefício = máximo entre zero e despesa menos cota-parte.

O fator de 6% sobre soldo proporcional a 22 dias está alinhado ao art. 5º, II e §2º, do Decreto nº 12.117/2024. A aplicação do piso zero também é compatível com a vedação de pagamento quando a despesa não supera a cota-parte.

O ponto crítico é que o art. 5º, I e §1º determina a despesa diária pelo menor custo do transporte coletivo disponível, multiplicada por 22 dias, com redução proporcional apenas dos dias em que o militar utilizou transporte custeado pela União. O campo genérico `dias` atualmente permite alterar livremente o multiplicador da despesa, sem esclarecer que deve representar 22 menos os dias com transporte custeado pela União. Isso pode reduzir indevidamente a despesa calculada.

A tela também não coleta nem valida:

- situação funcional elegível (serviço ativo ou inatividade executando tarefa por tempo certo; art. 3º);
- endereço residencial, local de trabalho e percurso declarado (art. 8º);
- tarifa de menor custo e possibilidade de integração modal (arts. 5º, I, e 8º, III);
- quantidade de dias com transporte custeado pela União (art. 5º, §1º);
- uso de transporte custeado pela União, hipótese de não pagamento (art. 7º, II);
- mudança de OM e apresentação de nova declaração (art. 9º).

O Decreto prevê ônibus, trem, metrô, transporte marítimo, fluvial e lacustre, além de outros modais coletivos regulados (art. 6º). A interface usa campos de ida/volta, mas não identifica o modal nem demonstra que o custo informado é o menor disponível.

## Portaria nº 849/2016

Foi localizada referência institucional da 7ª Região Militar à Portaria nº 849/2016 (EB10-IG-02.018), mas não foi obtido nesta rodada o texto integral oficial e sua cadeia completa de alterações. O Decreto nº 12.117/2024 determinou que os Comandantes das Forças atualizassem normas complementares (art. 12) e revogou expressamente o Decreto nº 2.963/1999 (art. 13). Não se deve presumir que todos os procedimentos antigos da Portaria 849 continuem aplicáveis sem confronto com o decreto posterior e com eventual ato complementar do Exército.

## Conclusão e recomendação

Manter a calculadora como simulação não homologada. Redesenhar a entrada para calcular a tarifa diária de menor custo por percurso/modal, aplicar a quantidade de dias elegíveis dentro dos 22 dias e subtrair somente os dias com transporte custeado pela União. Exibir a cota-parte separadamente. Não usar um campo de “dias de deslocamento” sem definição normativa.
