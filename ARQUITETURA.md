# Milico Audaz — modernização inicial

## O que mudou nesta versão

- Criado `js/perfil.js`, responsável exclusivamente por persistir e reaplicar o perfil remuneratório.
- Os dados informados no formulário **Contracheque** são salvos automaticamente no `localStorage` deste navegador.
- As páginas com formulário compatível reaproveitam os campos de mesmo identificador (posto/graduação, adicionais e descontos quando existentes). O auxílio-transporte, por exemplo, reaproveita o posto/graduação e usa o soldo da tabela já existente no motor de cálculo.
- Incluído aviso de perfil local e controle para apagar os dados salvos.
- Melhorados os alvos de toque, foco visível, dimensões dos campos e comportamento em telas pequenas.
- Mantidos os arquivos e URLs atuais para reduzir risco de quebrar links e instalação PWA.

## Organização recomendada para a próxima etapa

```text
/
├── pages/                 # páginas HTML (migração gradual)
├── css/
│   ├── tokens.css         # cores, tipografia e espaçamentos
│   ├── base.css           # reset e acessibilidade
│   ├── components.css     # formulários, botões, cards e tabelas
│   └── layout.css         # cabeçalho, navegação e responsividade
├── js/
│   ├── core/              # armazenamento, validação e formatação
│   ├── data/              # tabelas oficiais com fonte e vigência
│   ├── calculators/       # um módulo por calculadora
│   └── perfil.js          # perfil compartilhado (já criado)
└── tests/                 # testes unitários e de regressão
```

## Regras de manutenção jurídica e remuneratória

1. Não atualizar valores sem registrar norma, artigo/anexo, publicação, início de vigência, data de conferência e URL oficial.
2. Separar tabelas de dados das fórmulas. Uma alteração de soldo não deve exigir editar a lógica de cálculo.
3. Manter histórico de vigência: cada cálculo deve indicar a competência/data de referência usada.
4. Não apresentar estimativa como valor oficial ou definitivo. Exibir premissas, exceções e fonte legal junto ao resultado.
5. Validar cada fórmula com casos de teste e contracheques anonimizados antes de publicar.

## Privacidade

O perfil desta versão fica no armazenamento local do navegador e não é enviado a servidor. Não há sincronização entre dispositivos. Evite usar computadores compartilhados; use “Limpar perfil” ao terminar.

## Limitações desta etapa

Esta entrega não certifica a conformidade jurídica dos valores ou fórmulas existentes. O código original contém tabelas e percentuais fixos; eles precisam de auditoria normativa individual, inclusive de vigência e regras específicas por Força/situação funcional, antes de serem tratados como atualizados.


## Situação funcional (implementação inicial)

O perfil compartilhado inclui `situacao` com as opções ativa de carreira, ativa temporária, aluno, reserva remunerada e reformado. A versão atual só permite executar o motor legado de remuneração para as categorias da ativa; reserva e reformado recebem bloqueio explicativo, pois seus proventos exigem regra própria. Temporários e alunos recebem alerta de que a elegibilidade por rubrica ainda precisa ser validada.

O demonstrativo do contracheque separa remuneração bruta, outros créditos/indenizações, descontos e líquido. Os outros créditos não são tratados automaticamente como base de incidência. IRRF continua manual; FuSEx e base da pensão militar permanecem marcados como provisórios até a matriz de incidência ser concluída.

## Dados históricos e testes

- `js/data/regras-historicas.json` registra regras antigas e direitos de transição como referência documental. O arquivo declara `aplicacaoAutomatica: false`; não deve ser usado pelo motor de remuneração atual sem revisão jurídica e técnica.
- `tests/regression.test.js` executa testes unitários básicos com o runner nativo `node:test` (`node --test tests/regression.test.js`).
- Pensão militar, FuSEx e IRRF não devem ser inferidos por uma alíquota global sobre o bruto. Até a matriz de incidência por rubrica e situação funcional ser validada, os dois primeiros são informados manualmente e o demonstrativo é parcial.

### Contracheque — IRRF e descontos (Etapa 7)
A tela separa remuneração regular, eventos de férias e adicional natalino, receitas manuais e descontos. O motor `calcularIRRF` usa a tabela mensal de 2026, a dedução por dependente e o redutor da Lei 15.270/2025. A simulação mensal compara deduções legais modeladas (pensão militar, FuSEx, quota complementar, dependentes e pensão alimentícia) com o desconto simplificado. Férias e 13º são calculados separadamente com o desconto simplificado de referência. Receitas extras só entram no IR mensal quando a caixa de incidência é marcada.


Etapa 11 — Catálogo de rubricas: os botões Adicionar receita e Adicionar desconto abrem um catálogo pesquisável de lançamentos predefinidos. Rubricas com campo ou parâmetro próprio direcionam o usuário ao controle correspondente; lançamentos sem fórmula automática validada criam uma linha identificada para informar valor e incidências. A opção genérica permanece disponível.

## Etapa 17 — resumo e demonstrativo reativos
O formulário do contracheque não depende mais de botão de atualização. Os totais principais são apresentados no topo e o demonstrativo detalhado é regenerado a cada alteração de campo ou rubrica.
