# Etapa 13 — consolidação de receitas, descontos e eventos

## Alterações

- Removidos os campos antigos duplicados de despesas médicas FuSEx, PNR e pensão alimentícia na seção avançada. Essas rubricas agora são lançadas diretamente pelo catálogo do quadro Descontos.
- Removida a seção avançada redundante que apenas repetia a orientação de usar os botões de inclusão.
- Os controles de férias e adicional natalino foram colocados dentro do quadro Receitas, junto ao local em que são adicionados.
- O demonstrativo final utiliza uma única função de consolidação para somar remuneração, pré-escolar, eventos, receitas extras, descontos automáticos, adiantamento do 13º e descontos extras. Cada lançamento é contabilizado uma única vez.
- Pensão alimentícia, PNR e despesa médica FuSEx selecionados no catálogo criam linhas identificadas dentro do quadro Descontos. A pensão alimentícia possui marcação específica de dedutibilidade no IR; só deve ser marcada quando houver decisão/acordo judicial ou escritura pública válida.
- As linhas de desconto são persistidas no perfil local, inclusive a marcação de dedutibilidade.

## Férias

- O adicional de férias é calculado automaticamente em 1/3 da remuneração do mês de início, conforme art. 80 do Decreto nº 4.307/2002.
- Para estimar a retenção de IR sobre férias, o sistema considera remuneração do mês + 1/3 e calcula separadamente do IR mensal. Compara as deduções legais informadas (contribuições do militar, dependentes e pensão alimentícia judicial marcada) com o desconto simplificado de referência.
- O crédito de remuneração mensal não é duplicado: o demonstrativo já contém a remuneração mensal, e o evento acrescenta somente o terço. Quando férias estão ativas, a base de IR mensal é separada da apuração do evento.

## 13º salário

- 1ª parcela: 50% da remuneração-base, sem retenção de IR na antecipação.
- 2ª parcela: demonstra o 13º integral como crédito, abate a 1ª parcela já recebida como desconto e calcula o IR separadamente sobre o valor integral, conforme art. 13 da IN RFB nº 1.500/2014, com alterações da IN RFB nº 2.299/2025.
- Para manter compatibilidade com o contracheque CPEx de referência fornecido no projeto, a apuração padrão do IR do 13º utiliza o desconto simplificado de referência quando não há dados de deduções especificamente atribuíveis ao 13º.

## Limitações e validação

- O IR é uma estimativa e deve ser comparado com a retenção processada pelo CPEx, especialmente quando houver pensão alimentícia incidente sobre o 13º, diferenças de base contributiva ou pagamento de férias em situação excepcional.
- Rubricas sem fórmula ou incidência suficientemente validada permanecem editáveis no catálogo, sem presumir tributação ou incidência contributiva.
- Testes automatizados verificam soma dos lançamentos, não duplicidade, cálculos de férias/13º e persistência local. A interação visual deve ser confirmada no navegador do usuário.
