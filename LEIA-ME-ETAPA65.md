# Etapa 65 — Simplificação das passagens e destaque do demonstrativo

## Alterações
- Removido “Dependentes” da lista de itens incluídos. A opção “Passagens” controla a exibição dos campos de dependentes.
- A seção “Passagens e dependentes” foi posicionada imediatamente após “Origem e destinos”, logo depois das distâncias.
- Removidos destino, categoria, quantidade de passageiros, distância/tarifa exibidas por passageiro e botão “Adicionar passageiro”.
- O usuário informa somente adultos, crianças menores de 2 anos e crianças maiores de 2 anos. O cálculo usa automaticamente os destinos e as distâncias ida e volta do militar, com R$ 0,50/km/pessoa.
- Removidas as três caixas explicativas imediatamente após “Valor considerado no demonstrativo”.
- O demonstrativo financeiro foi contido à largura do formulário, com rolagem horizontal interna para a tabela em telas estreitas, e recebeu maior destaque visual.
- Atualizada a versão do cache para etapa 65.

## Validação
- `node --check app.js`: aprovado.
- Testes específicos da etapa 65: 6 aprovados.
- Suíte existente: há testes antigos que ainda exigem o formulário manual de passageiros e outros comportamentos da interface anterior; esses testes precisam ser atualizados para a nova regra. Não foi realizada validação visual em navegador nesta etapa.
