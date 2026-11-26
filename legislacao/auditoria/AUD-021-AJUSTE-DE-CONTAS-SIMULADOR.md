# AUD-021 — Ajuste de contas: especificação do simulador

**Status da calculadora:** sem implementação. **Validação normativa:** parcial, porque “ajuste de contas” é um procedimento de processamento da folha, não uma fórmula única de direito pecuniário.

## 1. O que a fonte operacional do Exército descreve
O material de ensino do SIPPES, associado ao CPEx e disponibilizado por órgão do Sistema de Economia e Finanças do Exército, descreve que:
- após a desimplantação do militar, o módulo de processamento permite realizar e efetivar o ajuste de contas;
- a funcionalidade “Realizar ajuste de contas” ratifica cálculos do sistema e permite inserir outras rubricas;
- “Efetivar ajuste de contas” define a folha em que o ajuste será implementado;
- o documento também registra que essa funcionalidade estava em processo de descontinuidade, devido à complexidade e ao impacto na performance do sistema.

Fonte operacional (não é lei nem ato normativo): DIEx/CPEx — EAD SIPPES, módulo I, especialmente páginas 2, 6–8 e 11–12: https://12cgcfex.eb.mil.br/images/4secao/2020/DIEx_n-_626-S1_GABCPEX__CIRCULAR_OD_ANEXO_2.pdf

## 2. Normas que podem compor os itens simulados
- Decreto nº 4.307/2002, art. 80, § 1º: adicional de férias proporcional na exclusão do serviço ativo, incluindo licenciamento, à razão de 1/12 por mês de efetivo serviço ou fração superior a 15 dias.
- Decreto nº 4.307/2002, art. 81, §§ 1º e 2º: adicional natalino proporcional para militar excluído e desligado por demissão, licenciamento ou desincorporação; fração igual ou superior a 15 dias conta como mês integral; base é a remuneração do mês do desligamento.
- Portaria Normativa MD nº 28/2019: procedimento padronizado de requerimento/análise para indenização de férias não gozadas de militares inativos, ex-militares e sucessores. Exige documentos e processo próprio; não transforma automaticamente saldo de férias em pagamento sem conferência administrativa.
- Lei nº 7.963/1989 e Decreto nº 99.425/1990: compensação pecuniária de temporário em hipóteses próprias, com cálculo separado e exclusões de base.

Fontes primárias:
- Decreto nº 4.307/2002: https://www.planalto.gov.br/ccivil_03/decreto/2002/d4307.htm
- Portaria Normativa nº 28/GM-MD/2019 (DOU/MDLegis): https://mdlegis.defesa.gov.br/norma_pdf/?ANO=2019&NUM=28&SER=A
- Lei nº 7.963/1989: https://www2.camara.leg.br/legin/fed/lei/1989/lei-7963-21-dezembro-1989-365506-publicacaooriginal-1-pl.html
- Decreto nº 99.425/1990 (DOU): https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=31%2F07%2F1990&jornal=1&pagina=1

## 3. Escopo recomendado do simulador
O usuário seleciona a data de referência e informa manualmente as parcelas de crédito e débito a simular, com rubricas discriminadas:
- saldo de remuneração do período;
- adicional natalino proporcional, quando quiser simular essa parcela;
- adicional de férias proporcional;
- férias não gozadas informadas pelo usuário, em módulo/linha própria e com aviso de que a indenização depende de requerimento e análise;
- compensação pecuniária, em linha separada e calculada pelo simulador próprio;
- pagamentos antecipados, adiantamentos e valores a restituir;
- descontos informados (pensão alimentícia, reposições, consignações ou outros);
- resultado bruto, total de descontos e líquido estimado.

O sistema deve evitar somar automaticamente compensação pecuniária e indenizações incompatíveis sem permitir que o usuário escolha cenários alternativos. A tela deve deixar claro quando um valor foi digitado pelo usuário e quando foi calculado por regra legal.

## 4. Regras matemáticas a homologar antes da implementação
- Adicional natalino proporcional: remuneração do mês de desligamento × meses computáveis / 12; mês computável quando a fração de serviço for igual ou superior a 15 dias, conforme art. 81.
- Adicional de férias proporcional: 1/3 da remuneração de referência × meses computáveis / 12, com fração superior a 15 dias, conforme art. 80, § 1º. Deve-se separar período completo adquirido, período incompleto e férias já gozadas/adiantadas.
- Férias não gozadas: não assumir quantidade nem valor; o usuário informa saldo documentado e o simulador exibe a estimativa, com aviso de processo próprio conforme PN 28/2019.
- Ajustes/estornos: entradas livres e identificadas, sem inferir desconto ou débito a partir de situação funcional.

## 5. Casos de teste
1. 14 dias no mês de desligamento: não arredondar para mês integral na regra do art. 81.
2. 15 dias: mês integral para adicional natalino (art. 81, § 2º).
3. 16 dias: mês integral para adicional de férias (fração superior a 15 dias, art. 80, § 1º).
4. Período integral de 12 meses: proporcionalidade de 12/12.
5. Férias já gozadas ou antecipadas: demonstrar abatimento em linha separada, sem duplicar parcela.
6. Compensação pecuniária: manter cálculo segregado e permitir comparação de cenários sem cumulação automática.
7. Somatório: créditos − descontos = líquido, com arredondamento monetário documentado.

## 6. Pendências
- localizar norma interna atual do Exército que disciplina composição e rotina de ajuste de contas em cada situação de desligamento;
- confirmar se o material operacional SIPPES de 2020 continua refletindo o fluxo atual, pois ele próprio noticia descontinuidade da funcionalidade;
- validar rubricas e bases de cálculo de cada verba com CPEx/legislação vigente;
- não confundir indenização de férias não gozadas com adicional de férias proporcional do art. 80.

**Conclusão:** ferramenta deve ser um demonstrativo/simulador de acerto financeiro por rubricas, e não um motor que decide direitos ou reproduz automaticamente o processamento administrativo do SIPPES.
