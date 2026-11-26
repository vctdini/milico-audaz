# Etapa 48 — Auditoria integrada da calculadora de movimentação

## Escopo
Auditoria da versão recebida na Etapa 47, com foco na consistência do demonstrativo por destino, associação das passagens, tratamento de parcelas pendentes, seleções do usuário e preparação para impressão.

## Correção aplicada
Os destinos cadastrados são cenários alternativos de movimentação. A versão anterior somava os subtotais de todos os destinos e exibia um único “Total estimado dos destinos”, o que poderia induzir o usuário a interpretar destinos alternativos como parcelas cumulativas.

A apresentação foi corrigida: cada linha mantém seu próprio subtotal e uma nota esclarece que os destinos são cenários independentes e que seus totais não devem ser somados entre si. Nenhuma fórmula individual de ajuda de custo, bagagem ou passagem foi alterada nesta etapa.

## Verificações realizadas
- Associação das tarifas de passagem ao destino informado por comparação textual normalizada.
- Identificação de tarifas cujo destino não corresponde a nenhum destino cadastrado.
- Identificação de bagagem/veículos pendentes quando falta distância rodoviária de ida.
- Itens desmarcados permanecem fora dos cálculos correspondentes.
- Empregado doméstico permanece como opção declaratória simples; não há questionário de vínculo ou documentação.
- Botão de impressão exige que exista resultado calculado antes de chamar `window.print()`.
- Atualização da versão do cache do service worker para disponibilizar os arquivos revisados.

## Limites desta auditoria
Os testes automatizados do projeto validam regras e estrutura do código, mas não substituem homologação com casos reais conferidos pela área competente, conferência jurídica das tabelas e tarifas vigentes, nem teste visual em navegadores/dispositivos físicos. A impressão usa a função nativa do navegador; a geração final do PDF depende das opções de impressão do dispositivo.

## Resultado
A suíte automatizada existente foi executada integralmente após a correção. O resultado registrado em `test-results-etapa48.txt` acompanha este pacote. A etapa não declara a calculadora homologada para pagamento: consolida a apresentação comparativa e corrige uma ambiguidade importante de leitura dos destinos.
