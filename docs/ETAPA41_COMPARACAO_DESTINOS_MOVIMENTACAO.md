# Etapa 41 — Comparação de destinos na calculadora de movimentação

## Entrega
- Formulário ampliado e responsivo para a calculadora de movimentação.
- Campo de guarnição de origem.
- Inclusão e remoção dinâmica de um ou mais destinos.
- Campo opcional de distância total (ida e volta) por destino.
- Quantidade de pessoas para estimar transporte.
- Quadro comparativo por destino, separando ajuda de custo e transporte estimado.
- Ajuda de custo segue sendo calculada pelo motor já existente e pelas hipóteses do Anexo V; a distância não altera seu multiplicador.
- Transporte estimado: distância total informada × R$ 0,50 × número de pessoas, reproduzindo a referência expressamente exibida na captura do modelo de referência. O valor não é somado à ajuda de custo.

## Limites mantidos de forma explícita
- A remuneração-base e os multiplicadores permanecem sujeitos às ressalvas já registradas em `AUD-011-MOVIMENTACAO-AJUDA-CUSTO.md`.
- Não há tabela oficial de distâncias integrada nesta etapa; o usuário informa a distância total.
- Não foram simulados automaticamente transporte de bagagem, passagens, empregado doméstico, transporte de automóvel ou motocicleta, pois a captura não fornece fórmulas completas e a auditoria normativa não homologa esses cálculos.
- A comparação de destinos exibe a mesma ajuda de custo quando a hipótese e a base do militar são as mesmas; não inventa diferenças por cidade.

## Testes
- Teste específico da comparação de destinos: 10 verificações aprovadas.
- Todos os testes JavaScript independentes existentes na pasta `tests/` executados com sucesso.
