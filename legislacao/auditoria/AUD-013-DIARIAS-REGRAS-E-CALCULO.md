# AUD-013 — Diárias: regras de elegibilidade, frações e acréscimos

**Ferramenta:** `diarias.html` / `FN.diarias()` em `app.js`  
**Classificação:** NÃO VALIDADA — valores tabelados conferidos; motor simplifica hipóteses legais essenciais.  
**Código alterado:** não.

## Fontes primárias e evidências

1. Decreto nº 4.307/2002, texto atualizado, arts. 18 a 22 e Anexos III e IV. Texto consolidado da Câmara: https://www2.camara.leg.br/legin/fed/decret/2002/decreto-4307-18-julho-2002-472328-normaatualizada-pe.html
2. Decreto nº 12.324/2024, que substituiu o Anexo III, com vigência dos novos valores em 01/01/2025: https://legis.senado.leg.br/norma/39978915/publicacao/39981237
3. Portaria nº 290-DGP/2013 (EB30-N-10.003), cópia institucional hospedada no portal do Gabinete do Comandante do Exército: https://www2.gabcmt.eb.mil.br/a1/images/phocadownload/Diversos/port_290.pdf
4. Portaria GM-MD nº 4.074/2024, regras gerais de deslocamento e diárias no MD: https://mdlegis.defesa.gov.br/norma_html/?ANO=2024&NUM=4074&SER=A

## Conferência da tabela

Os valores codificados em `D.DIAR` coincidem com o Anexo III do Decreto nº 4.307/2002, na redação do Decreto nº 12.324/2024:

| Círculo | Brasília/Manaus/Rio/SP | Outras capitais | Demais localidades |
|---|---:|---:|---:|
| Comandantes de Força/Natureza Especial | R$ 800,00 | R$ 700,00 | R$ 650,00 |
| Oficiais-generais | R$ 600,00 | R$ 515,00 | R$ 455,00 |
| Oficiais-superiores | R$ 510,00 | R$ 450,00 | R$ 395,00 |
| Intermediários/subalternos/aspirantes | R$ 425,00 | R$ 380,00 | R$ 335,00 |
| Suboficiais/subtenentes/sargentos/aspirantes/cadetes | R$ 425,00 | R$ 380,00 | R$ 335,00 |
| Alunos de formação especificados | R$ 355,00 | R$ 315,00 | R$ 280,00 |
| Demais praças e especiais | R$ 355,00 | R$ 315,00 | R$ 280,00 |

O Anexo IV mantém o acréscimo de embarque/desembarque em R$ 95,00. Portanto, a tabela numérica atualmente carregada está alinhada com a fonte consultada.

## Divergências e limitações do motor atual

A função calcula `dias - 1` diárias integrais e sempre meia diária no retorno. Isso pressupõe, sem perguntar, que todos os dias anteriores ao retorno tiveram pernoite fora da sede e que não foi fornecido alojamento sem ônus. O art. 18 exige distinguir diária integral e meia diária: integral quando há pernoite fora da sede e não há alojamento/pousada fornecida; meia diária quando não há pernoite, quando há alojamento/pousada fornecida e no dia do retorno.

A tela não coleta:
- se houve pernoite em cada dia;
- se foi fornecido alojamento/pousada sem ônus;
- se alimentação foi fornecida por OM (hipótese de indenização pelo valor da etapa, art. 18, §1º);
- se alimentação, pousada e locomoção urbana foram todas garantidas (hipótese em que não se concedem diárias, art. 19, I);
- se o deslocamento durou mais de três meses (art. 18, §2º: somente ajuda de custo);
- se existe enquadramento simultâneo em ajuda de custo (art. 18, §3º: paga-se o direito pecuniário de menor valor) ou mudança de sede/desligamento (art. 19, parágrafo único: sem diárias);
- se foi utilizado veículo oficial em algum dos quatro trajetos previstos no art. 20, §2º, o que afeta o acréscimo de R$ 95,00;
- se o militar está em férias, licença ou outro afastamento sem correlação com o serviço, vedação do art. 12 da Portaria 290-DGP/2013;
- roteiro com várias cidades/pernoites. A Portaria 290-DGP/2013, art. 13, determina adotar a diária da cidade onde houver pernoite e, no retorno, a última cidade pernoitada.

O campo de desconto de auxílio-transporte e dias úteis não tem memória de cálculo clara na tela. A Portaria 849-Cmt Ex/2016 citada pela página não foi localizada em fonte primária oficial acessível nesta rodada; não homologar essa subtração nem sua parametrização até localizar e conferir o ato.

A caixa “afastamento inferior a 8 horas” é global, mas o art. 19, IV, refere-se a afastamento inferior a oito horas consecutivas. Para missão com mais de um dia, a interface precisa trabalhar com períodos/itinerários e não um checkbox que zera todas as diárias.

## Conclusão e recomendação

A ferramenta deve permanecer **não validada para cálculo final**. A tabela de valores está correta, mas o cálculo das frações, elegibilidade e acréscimos depende de fatos não coletados. Recomenda-se redesenhar a entrada por itinerário/dia, com pernoite, hospedagem, alimentação, transporte oficial, cidade, duração e enquadramento administrativo. Não alterar a fórmula atual antes de aprovar o novo modelo de dados e seus testes legais.
