# Etapa 66 — Correção da inicialização da calculadora de movimentação

## Problema corrigido
A versão Etapa 65 exportava `calcularTransportePessoalMov` no objeto `window.MilicoAudazCore`, mas a função não estava declarada. Isso provocava `ReferenceError` durante a inicialização do `app.js` e impedia a publicação do núcleo compartilhado usado pela integração de perfil.

## Correção
- Restaurada a função pública `calcularTransportePessoalMov` para compatibilidade do núcleo.
- Mantida a interface simplificada da Etapa 65: dependentes por faixa etária, sem cadastro manual de passageiros.
- Mantido o parâmetro de simulação de R$ 0,50 por km por pessoa.
- Atualizada a versão do cache do service worker para forçar a distribuição do JavaScript corrigido.

## Validação
- `node --check app.js`: aprovado.
- Testes Etapa 65 e Etapa 66: 8 aprovados, 0 falhas.
- Não foi feita validação visual automatizada em navegador nesta etapa.

## Instalação
Substitua a pasta `milico-audaz` pela pasta deste pacote. No navegador, atualize a página com `Ctrl + Shift + R`. Se o aplicativo instalado continuar usando a versão antiga, feche e reabra a aba após a atualização do service worker.
