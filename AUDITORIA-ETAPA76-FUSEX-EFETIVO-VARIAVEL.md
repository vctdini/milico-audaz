# Etapa 76 — Correção de contribuição FuSEx para recruta/EV

## Problema identificado
O cálculo anterior aplicava a contribuição padrão de 3% a qualquer perfil, salvo quando uma opção interna de não contribuinte estivesse marcada. O perfil `sd_rec` (Soldado/Recruta não engajado) não acionava essa exceção automaticamente.

## Regra aplicada
O art. 21, inciso I, das Instruções Gerais do FuSEx (Portaria C Ex nº 1.742/2022) exclui os cabos e soldados do Efetivo Variável da condição de contribuintes. O perfil do sistema `sd_rec` descreve expressamente “Soldado / Recruta (não engajado)”. Assim, a isenção foi automatizada para esse perfil.

## Alterações
- `sd_rec`: FuSEx padrão de 3% = R$ 0,00.
- `sd_rec`: quota complementar FuSEx = R$ 0,00.
- `sd_rec`: valores de FuSEx e quota deixam de ser considerados como deduções legais no cálculo do IR.
- O demonstrativo informa que a rubrica está isenta por enquadramento EV.
- Perfis engajados (`sd_eng`, `sd_esp`, `cabo_e`) não foram incluídos na isenção automática.
- Nenhum botão de editar/excluir foi adicionado às rubricas automáticas.
- Cache do Service Worker atualizado para forçar a atualização dos arquivos.

## Testes executados
- `node --check app.js`: aprovado.
- Testes focados da Etapa 76: 3 aprovados.
- Testes focados da Etapa 75: 3 aprovados.
- Não foi possível realizar validação visual em navegador neste ambiente; os testes automatizados verificam as regras e os pontos de integração no código.

## Observação de enquadramento
A isenção automática foi limitada ao perfil explicitamente identificado no sistema como Soldado/Recruta não engajado. Outros enquadramentos de formação/reserva ou situações individuais devem ser modelados somente após confirmação do enquadramento normativo específico.
