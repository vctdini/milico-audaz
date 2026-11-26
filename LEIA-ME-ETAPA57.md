# Milico Audaz — Etapa 57
## Ajuste de largura dos campos e consulta automática de distâncias

### Alterações
- Reorganização responsiva dos campos de origem/destino e passageiros.
- Larguras mínimas e máximas para evitar sobreposição, textos encavalados e controles comprimidos.
- Quebra de texto em rótulos, orientações e resultados.
- Botão "Calcular distância automaticamente" em cada destino.
- Geocodificação de cidade/UF com Nominatim (OpenStreetMap) e cálculo de rota rodoviária com OSRM.
- Preenchimento automático de:
  - distância rodoviária de ida, usada na estimativa de bagagem;
  - distância de ida e volta, usada na estimativa de passageiros.
- Distâncias continuam editáveis manualmente.
- Atualização do cache do service worker.

### Como usar
1. Informe a guarnição de origem.
2. Informe ou selecione a guarnição de destino.
3. Clique em "Calcular distância automaticamente".
4. Confira os quilômetros preenchidos. Ajuste manualmente se a rota sugerida não corresponder ao itinerário considerado.
5. A distância de ida e volta alimenta a prévia das passagens; a distância de ida permanece disponível para o cálculo de bagagem.

### Limitações importantes
- A consulta automática exige conexão com a internet.
- A geocodificação e o roteamento dependem de serviços públicos de terceiros (Nominatim e OSRM), que podem sofrer lentidão, indisponibilidade ou limitação de uso.
- O cálculo retorna uma rota estimada para automóvel entre centros/localizações municipais, não uma rota oficial de transporte militar nem uma autorização de deslocamento.
- A legislação fornecida não contém uma matriz oficial completa de distâncias entre todas as guarnições. Por isso, o resultado automático é apenas referência e deve ser conferido pelo usuário.
- Se a consulta falhar, os campos podem ser preenchidos manualmente.

### Arquivos principais
- `movimentacao.html`
- `style.css`
- `js/movimentacao-distancias.js` (novo)
- `sw.js`

### Validação técnica
- `node --check` executado nos arquivos JavaScript alterados e nos scripts principais.
- Verificação de integridade do ZIP.
- Verificação de que o novo script está referenciado na página e no cache do service worker.
- Não foi possível validar visualmente em navegador real nesta execução; recomenda-se testar desktop e celular após publicar/abrir a versão.
