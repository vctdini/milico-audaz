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

## Integração de perfil entre ferramentas (Etapa 19)
O módulo `js/perfil.js` mantém o perfil remuneratório em armazenamento local e pré-preenche campos compatíveis nas ferramentas de auxílio-transporte, diárias, gratificação de representação, ajuda de custo/movimentação e pensão alimentícia. O mapeamento é conservador: não converte a situação funcional em modalidade da calculadora, não presume dias/ocorrências e respeita os campos “não faço jus”. Reserva e reforma não herdam adicionais calculados pelo motor da ativa. Ferramentas sem parâmetros remuneratórios permanecem independentes. A lista detalhada está em `docs/ETAPA19_INTEGRACAO_PERFIL_FERRAMENTAS.md`.


## Diretriz de produto — simuladores e verificação de direitos

As calculadoras devem calcular cenários com base nos dados informados pelo usuário. Não fazem juízo de elegibilidade nem bloqueiam simulação por ausência de requisitos de direito. A auditoria normativa verifica fórmula, base, parâmetros, períodos e transparência das premissas. A análise de “faz jus/não faz jus” será recurso separado e futuro. Consulte `legislacao/auditoria/DIRETRIZ-FUNCIONAL-CALCULADORAS.md`.

## Etapa 43 — Transporte de bagagem
A estimativa de bagagem é isolada da ajuda de custo e da estimativa de transporte pessoal. A função `calcularTransporteBagagemMov` recebe distância rodoviária de ida, posto/graduação e itens declarados pelo usuário; retorna cubagem por componente, tarifa da faixa e valor estimado. A interface não presume bagagem, automóvel ou motocicleta. A implementação está limitada à tabela rodoviária nacional do Decreto nº 4.307/2002, Anexos I e II, e mantém ressalvas sobre elegibilidade, autorização e modalidades não cobertas.

## Etapa 44 — Transporte de pessoal/passagens
A opção “Passagens” abre um formulário para o usuário cadastrar cada passageiro e informar as tarifas de ida e/ou volta. `calcularTransportePessoalMov` apenas soma os valores declarados, conforme a lógica do art. 47, II, do Decreto nº 4.307/2002 para pagamento em espécie. Não presume passageiros nem determina elegibilidade, modalidade, preço ou autorização. A estimativa anterior de R$ 0,50/km para transporte de pessoal foi removida por não ter sido comprovada como fórmula normativa geral para indenização de passagens.

## Etapa 45 — Empregado doméstico (cadastro declaratório)
A seleção “Empregado doméstico” abre um painel próprio para registrar nome e declarações do usuário sobre a natureza contínua/não lucrativa do serviço residencial e sobre inscrição previdenciária/CTPS anotada. Esses campos não validam vínculo nem decidem elegibilidade. A pessoa pode ser lançada na seção de passagens como passageiro da categoria “Empregado doméstico”, com tarifas informadas manualmente. Base de referência: Lei nº 8.237/1991, art. 3º, e Decreto nº 4.307/2002, arts. 23, VI, 37, 47, II, e 49, II. O resultado registra as declarações, mas não concede direito nem substitui a conferência documental da OM.

## Etapa 46 — Demonstrativo financeiro por destino
A tela de movimentação consolida, por destino cadastrado, a ajuda de custo estimada, a estimativa de bagagem/veículos quando os itens foram selecionados e a soma das passagens declaradas cujo destino corresponde ao destino cadastrado. A correspondência de destinos ignora diferenças de maiúsculas/minúsculas e acentos, mas não tenta inferir cidades ou rotas. Tarifas sem destino correspondente permanecem destacadas e fora dos subtotais por destino. Distâncias ausentes deixam a parcela de bagagem pendente, sem tratá-la como direito inexistente ou valor definitivamente zero. O total é uma consolidação matemática de estimativas e não reconhecimento de direito, autorização ou garantia de pagamento.

## Etapa 49 — experiência de preenchimento da movimentação
A tela ganhou uma navegação rápida por âncoras para dados do militar, origem/destinos, itens declarados e passagens, além de uma orientação inicial sobre o fluxo e a natureza opcional dos campos não identificados como obrigatórios. Os atalhos têm layout responsivo e foco visível para teclado. Nenhuma fórmula remuneratória ou tabela legal foi alterada nesta etapa. Durante a revisão do demonstrativo por destino, o acumulador local de passagens alocadas foi inicializado para evitar referência a variável não declarada no modo estrito; o acumulador permanece interno ao renderizador e não modifica os subtotais.

## Etapa 53 — ACDM e ATS
- O cálculo da disponibilidade militar aceita percentual explicitamente informado, representando o maior percentual alcançado na carreira ativa.
- O percentual incide sobre o soldo atual; ATS e ACDM são comparados e apenas o mais vantajoso integra a composição.
- A interface alerta para não considerar posto/graduação superior obtido apenas como benefício na inatividade.
- Testes automatizados específicos em `tests/etapa53-acdm-ats.test.js`.

## Etapa 54 — Gratificação de Localidade Especial (GLE)
- Confirmada a tabela de percentuais na Tabela I do Anexo III da MP nº 2.215-10/2001: Categoria A = 20% e Categoria B = 10%, incidentes sobre o soldo.
- A composição remuneratória `comp()` já inclui a GLE informada pelo usuário na base e no total remuneratório. A ajuda de custo utiliza a remuneração calculada para a data de referência informada; a interface agora discrimina o valor da GLE incluído.
- A interface esclarece que a categoria deve corresponder à GLE efetivamente percebida na data de referência do ajuste de contas. O destino não determina automaticamente o percentual e a busca de localidade é apenas auxiliar.
- Atualizado o cadastro auxiliar da Tabela II do Anexo II da Portaria GM-MD nº 379/2022 com Jaguari/RS, omitida na transcrição anterior.
- Mantida a sinalização de ambiguidades do cadastro, como Aquidauana constar nas Tabelas I e II. Nesses casos, a aplicação não escolhe uma categoria automaticamente.
- Referências: MP nº 2.215-10/2001, art. 1º e Anexo III, Tabela I; Decreto nº 4.307/2002, arts. 11 a 13; Portaria GM-MD nº 379/2022, arts. 2º a 8º e Anexo II; Portaria GM-MD nº 4.965/2025.
- Testes específicos em `tests/etapa54-gle.test.js`; regressão completa: 188 testes aprovados.
- Limite: a lista auxiliar não substitui a verificação das linhas Alfa/Beta, áreas delimitadas, atos posteriores de inclusão/exclusão/reclassificação nem o registro financeiro oficial do militar. A simulação não atesta direito individual.


## Etapa 56 — Catálogo de guarnições e transporte de pessoal

- `js/data/guarnicoes-movimentacao.js` fornece uma lista pesquisável de localidades de referência, mesclando localidades cadastradas na base auxiliar da GLE e uma seleção inicial de guarnições/municípios de referência.
- A lista é auxiliar, não um cadastro oficial exaustivo de todas as OM. A interface permite digitar manualmente cidade e UF quando a localidade não estiver cadastrada.
- Origem, destinos e destinos dos passageiros compartilham o mesmo `datalist`.
- O transporte de pessoal utiliza o parâmetro configurado de R$ 0,50 por km por pessoa, conforme a referência visual fornecida pelo usuário. O cálculo usa a distância total de ida e volta cadastrada no destino e a quantidade informada por categoria.
- O parâmetro de R$ 0,50/km/pessoa é uma estimativa de interface, não tarifa oficial estabelecida pelo Decreto nº 4.307/2002.
