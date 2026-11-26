# AUD-008 — FuSEx: cadeia normativa, alíquota, base e quotas complementares

**Status:** parcialmente confirmado; base de cálculo e situação de cada categoria ainda exigem homologação.  
**Prioridade:** alta.  
**Versão examinada:** Etapa 19 / Auditoria 05.  
**Código:** `app.js`, funções `comp()` e `calcularDescontosObrigatorios()`.

## 1. O que o código faz

O motor monta uma única base remuneratória `f.base` com soldo e parcelas selecionadas em `comp()`, e aplica sobre ela, simultaneamente, 10,5% de pensão militar, 3% de FuSEx e quota complementar selecionável de 0,4% ou 0,5%. O campo de quota é uma seleção manual independente da quantidade/categoria dos dependentes cadastrados.

## 2. Normas primárias que precisam compor o cadastro

### 2.1 Portaria C Ex nº 662/2019 e Portaria C Ex nº 1.347/2020

A Portaria nº 1.347/2020 alterou a redação da contribuição padrão na Portaria nº 662/2019 para alíquota total de 3,00%, incluindo o cônjuge/companheiro, com parcela destinada à assistência social limitada a 0,05% desse total. A disciplina de quota complementar divulgada em material institucional indica 0,4% para um dependente direto (sem contar cônjuge/companheiro) e 0,5% para mais de um dependente direto ou um ou mais indiretos.

**Limite da confirmação:** a cartilha institucional de 2023 reproduz esses percentuais, mas o texto integral atualizado da Portaria 662/2019 e todas as alterações posteriores ainda devem ser obtidos em fonte primária oficial e conferidos artigo por artigo. Não marcar a cadeia normativa como completamente auditada.

### 2.2 Portaria C Ex nº 1.742/2022 — IG FuSEx (EB10-IG-02.032)

O texto localizado da Portaria aprova a 2ª edição das Instruções Gerais e revoga expressamente a Portaria Cmt Ex nº 493/2020. Os arts. 21 e 22 são especialmente relevantes:

- art. 21: identifica como contribuintes militares da ativa e da inatividade (com exceções expressas), pensionistas contribuintes beneficiários da AMH e determinadas categorias de contribuintes não beneficiários da AMH;
- art. 21, § 10: para militar na inatividade que recebe soldo proporcional, o desconto incide sobre os proventos resultantes;
- art. 21, § 11: exclui categorias específicas de pensionistas do sistema e da contribuição;
- art. 22: determina que a contribuição para AMHS seja regulada por Portaria do Comandante do Exército e constituída de percentuais incidentes sobre parcelas que compõem pensão, remuneração ou proventos, conforme a categoria.

O art. 22 é decisivo: a base deve ser determinada pela portaria específica de percentuais; não basta copiar uma lista genérica de parcelas para todos os contribuintes.

### 2.3 Portaria DGP/C Ex nº 430/2022 — cadastro de beneficiários

A norma regula cadastro e recadastro no CADBEN-FuSEx. O motor de cálculo não substitui a validação administrativa de dependentes. A quantidade digitada pelo usuário não prova, por si só, que as pessoas estejam habilitadas, nem define sua categoria normativa.

### 2.4 Portaria DGP/C Ex nº 508/2024 — EB30-IR-20.038

Foi identificada norma posterior, publicada em 12/11/2024, que aprovou as Instruções Reguladoras do SAMMED (EB30-IR-20.038), com vigência indicada em material consultado a partir de 02/12/2024 e substituição da antiga Portaria DGP nº 048/2008 (IR 30-38). O art. 65 remete o valor da contribuição mensal obrigatória à portaria específica do Comandante do Exército. Portanto, a Portaria 508/2024 deve ser cadastrada como norma relacionada ao sistema, mas não substitui a portaria que define percentuais e base de contribuição.

## 3. Cuidado com referência orçamentária de aumento para 3,5%

Foi localizado documento da PLOA 2025 que descreve uma alteração planejada da legislação do FuSEx, incluindo aumento da contribuição padrão de 3,00% para 3,50% para contribuintes sem dependentes e ampliação do limite de indenizações. **PLOA/justificativa orçamentária não é, por si só, ato normativo que altera a alíquota.** Não usar esse trecho para atualizar a fórmula. É necessário localizar o ato normativo efetivamente publicado, se existente, e sua data de vigência. Até essa confirmação, não inserir 3,5% como alíquota padrão vigente apenas com base na PLOA.

## 4. Base de cálculo — conclusão

O art. 22 das IG FuSEx faz referência às parcelas que compõem remuneração, pensão ou proventos, e a portaria específica de contribuição precisa ser lida integralmente. O código atual aplica `f.base` de forma compartilhada para ativo, inativo e pensionista, sem demonstrar a origem legal de cada rubrica e sem separar as bases por categoria.

**Conclusão da auditoria:** a base compartilhada atual não está homologada. Isso é uma pendência de validação, não uma conclusão de que todas as rubricas atualmente incluídas sejam necessariamente indevidas.

## 5. Quotas e dependentes

A lógica de 0,4%/0,5% descrita na cartilha institucional de 2023 exclui cônjuge/companheiro da contagem de dependentes diretos. O código, porém, permite selecionar manualmente qualquer percentual independentemente do campo `dep-fusex`. Isso é uma inconsistência funcional verificável.

A futura implementação deve trabalhar com categorias: titular, cônjuge/companheiro, dependente direto, dependente indireto, pensionista, vínculo CADBEN ativo e eventual titularidade concomitante entre cônjuges militares. Até a homologação das regras primárias, o controle manual deve ser rotulado como simulação, não como apuração oficial.

## 6. Fontes e evidências

- Portaria C Ex nº 1.742/2022, texto integral localizado em cópia indexada; confirmar cópia oficial SGEx/DOU: https://pt.scribd.com/document/1067840050/PORTARIA-C-Ex-N%C2%BA-1-742-DE-18-DE-MAIO-DE-2022
- Cartilha institucional HGuPV, 2023 (fonte operacional auxiliar): https://hgupv.eb.mil.br/images/Arquivos_2022/Imagens/Cartilha_FuSEx_HGuPV_JUN2023.pdf
- Portaria DGP/C Ex nº 508/2024, publicação no DOU que confirma substituição da antiga IR 30-38: https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=29%2F01%2F2025&jornal=530&pagina=15
- Texto localizado da EB30-IR-20.038: https://pt.scribd.com/document/1055864635/port-508-dgp-ir-samed-eb30-ir-20-038
- Documento PLOA 2025 que menciona proposta/impacto de aumento (não é ato de alteração da alíquota): https://www.gov.br/planejamento/pt-br/assuntos/orcamento/orcamentos-anuais/2025/ploa/2_volume_2_inciso_viii.pdf
- Página oficial do CPEx sobre CRP, que agrupa FuSEx e pensão militar na linha de contribuição previdenciária oficial para fins do comprovante: https://contrachequecpex.eb.mil.br/area_individual/CRP2022_ae.asp

## 7. Providências

1. Obter cópias oficiais SGEx/DOU das Portarias 662/2019 e 1.347/2020 e verificar se há ato posterior efetivamente publicado.
2. Registrar Portaria 1.742/2022, 430/2022 e 508/2024 no Banco Legislativo, com relação de alteração/revogação correta.
3. Homologar a base por categoria e rubrica antes de modificar o motor.
4. Corrigir a interface para impedir divergência entre dependentes informados e quota selecionada, após fechar os critérios de cadastro.
5. Criar testes de cálculo para ativo, inativo proporcional, reformado, pensionista e não beneficiário da AMH.
