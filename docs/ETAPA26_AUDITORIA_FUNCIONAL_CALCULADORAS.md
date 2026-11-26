# Etapa 26 — Auditoria funcional inicial das calculadoras

## Objetivo
Iniciar a revisão individual das calculadoras existentes, procurando falhas de entrada, cenários incompletos e divergências entre o formulário e o resultado. Esta etapa não altera parâmetros legais nem amplia o escopo do produto.

## Achado corrigido: TAF podia declarar suficiência com provas incompletas

### Problema
A rotina anterior avaliava apenas as provas que o usuário havia preenchido. Como `Array.prototype.every()` retorna `true` para uma lista vazia e também pode retornar verdadeiro quando somente parte das provas foi informada, o resultado global podia aparecer como “Suficiente” sem que todas as provas obrigatórias estivessem registradas.

### Correção aplicada
- A calculadora agora exige corrida, flexão e abdominal.
- Na linha LEMB, também exige barra fixa/sustentação.
- Quando a pista de obstáculos é selecionada para PAD/PED, exige o tempo correspondente.
- Lista as provas obrigatórias que ainda faltam, em vez de emitir suficiência global com dados incompletos.
- Rejeita valores de prova não numéricos ou negativos.
- A suficiência global só pode ser verdadeira quando todas as provas exigidas foram informadas, não há erros e todas atingem o mínimo.

### Limites
Esta correção é de integridade funcional da interface; não altera tabelas, faixas, índices, metas ou critérios normativos do TAF. A validação normativa das tabelas continua dependendo de conferência com a edição vigente das diretrizes do Exército.

## Próximos itens da auditoria
- Revisar limites e validação de entrada em transporte, alimentação, diárias, gratificação de representação e pensão alimentícia.
- Conferir cenários proporcionais e limites temporais de ajuda de custo e movimentação.
- Revisar juros compostos para taxa zero, aportes, periodicidade e horizontes longos.
- Executar testes manuais de interface em navegador desktop e celular.

## Testes
Executar `node --test tests/*.test.js` na pasta do projeto.

## Resultado da suíte automatizada

- 72 testes aprovados.
- 0 testes reprovados.
- `node --check app.js` aprovado.
- `node --check taf.js` aprovado.
- Cache PWA atualizado para a versão 26.
