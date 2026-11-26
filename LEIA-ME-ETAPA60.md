# Etapa 60 — Simplificação do formulário de movimentação

## Alterações
- Removido o bloco expansível “Dados complementares da movimentação”.
- A área principal exibe somente os campos **Situação** e **Natureza da movimentação**.
- Removida da interface a opção visível “Estou prestando serviço militar inicial”.
- Dados remuneratórios e parâmetros técnicos permanecem em um contêiner oculto no DOM para compatibilidade com `perfil.js` e `app.js`; são preenchidos pelo perfil compartilhado do contracheque.
- As datas de comissão/curso/estágio aparecem somente quando a situação selecionada exigir essa informação, pois são necessárias para validar a faixa temporal.
- O campo de dependente deixa de ser solicitado novamente na movimentação; o estado é derivado do total de dependentes do contracheque compartilhado.

## Observação
A ocultação dos campos técnicos não altera as fórmulas. A calculadora continua dependendo do perfil remuneratório compartilhado. Se não houver perfil salvo, o cartão de contracheque orienta o usuário a preenchê-lo antes de confirmar o uso.
