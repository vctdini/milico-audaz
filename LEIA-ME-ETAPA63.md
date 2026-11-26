# Etapa 63 — Destino dos dependentes vinculado ao militar

- Removido o campo independente de destino dos dependentes.
- O destino passa a ser automaticamente cada destino informado para o militar na seção “Origem e destinos”.
- As quantidades de adultos, crianças menores de 2 anos e crianças maiores de 2 anos são aplicadas às distâncias de ida e volta desses destinos.
- A validação solicita apenas a distância do destino já informado para o militar; não solicita destino duplicado para dependentes.

Validação técnica: `node --check app.js` e suíte de testes Node executadas nesta etapa. A conferência visual em navegador ainda deve ser realizada após atualização do site.
