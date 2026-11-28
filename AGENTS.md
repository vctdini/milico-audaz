# Milico Audaz — orientações para agentes de código

## Objetivo do produto

Milico Audaz é um site independente para apoiar militares do Exército Brasileiro na organização financeira. Oferece simulações de contracheque, movimentação, compensação pecuniária, diárias, benefícios e outras ferramentas. O contracheque é o núcleo do produto: seus dados alimentam outras calculadoras.

O site não é oficial e os resultados são estimativas. Não apresente uma simulação como decisão administrativa, direito garantido ou valor oficial.

## Estrutura e arquitetura

- Projeto estático em HTML, CSS e JavaScript, sem etapa de build ou gerenciador de pacotes identificado na raiz.
- As páginas HTML ficam na raiz. `style.css` contém os estilos compartilhados.
- `app.js` contém o motor comum das calculadoras, validações e despacho de formulários por `data-fn` / `data-modo`. Evite duplicar cálculos entre páginas; antes de alterar, localize a função central e todas as páginas que a utilizam.
- `js/perfil.js` mantém o perfil remuneratório compartilhado no navegador (`localStorage`, chave `milico-audaz:perfil:v1`). Páginas específicas, como movimentação e compensação pecuniária, têm módulos próprios em `js/`.
- `js/data/guarnicoes-movimentacao.js` e `js/localidades-gle.js` são cadastros auxiliares; não os trate como substitutos automáticos da norma ou do enquadramento geográfico oficial.
- `sw.js` controla o cache/offline e mantém uma lista explícita de arquivos pré-armazenados. Ao adicionar ou renomear um recurso usado pelo site, confira essa lista e atualize a chave `CACHE` para que clientes recebam a versão nova.
- `firebase.json` configura hospedagem estática no Firebase. Preserve as exclusões e cabeçalhos existentes sem necessidade comprovada de alterá-los.

## Regras funcionais já acordadas

- A página inicial foi aprovada pelo usuário; não altere seu layout ou conteúdo sem solicitação explícita.
- Preserve o último contracheque preenchido entre visitas e atualizações. A ação explícita de limpar dados deve apagar os valores salvos e deixar o formulário e os resultados realmente vazios.
- O perfil do contracheque é a fonte compartilhada para as calculadoras que dependem de posto, remuneração ou dependentes. Use a API de `js/perfil.js` e confirme os valores consumidos por cada calculadora; evite criar armazenamento paralelo.
- Dependentes cadastrados no contracheque precisam ser considerados de forma coerente nas calculadoras seguintes, incluindo movimentação, ajuda de custo e passagens quando aplicável.
- Nas páginas que exigem dados do contracheque, ofereça fluxo claro para preencher/editar e retornar à calculadora de origem. Preserve parâmetros e links de retorno existentes.
- Remova campos redundantes apenas quando a informação puder ser determinada com segurança a partir dos dados existentes e da regra aplicável. Não permita valores personalizados que contradigam tabelas legais sem uma justificativa funcional explícita.

## Legislação e cálculos

- Antes de modificar um cálculo ou afirmar uma regra, identifique a norma, artigo, anexo/tabela e redação vigente que se aplicam. Prefira fontes oficiais primárias, como Planalto, Diário Oficial e MDLegis.
- Diferencie regra normativa, dado cadastral auxiliar, estimativa e hipótese informada pelo usuário. Se a norma depender de ato de movimentação, enquadramento geográfico, autorização, data de referência ou situação individual não disponível no formulário, deixe essa limitação explícita e não invente a resposta.
- Não confunda guarnição especial com localidade especial. Classificações e limites geográficos precisam ser tratados conforme a norma específica e a versão vigente; ausência em um cadastro auxiliar não prova que uma localidade seja comum.
- Preserve na interface a base legal e as ressalvas relevantes ao resultado. Use valores, percentuais, critérios e nomes de rubricas coerentes com a legislação aplicável ao período informado.
- Em cálculos que agregam dados compartilhados, confira dependentes e remuneração na fonte comum, para evitar divergências entre simuladores.

## Interface, responsividade e acessibilidade

- O usuário prioriza telas limpas, centralizadas e utilizáveis tanto em computador quanto em celular, sem texto cortado, sobreposição, conteúdo vazando das bordas ou rótulos colados nos valores.
- Ao ajustar layout, confira larguras pequenas e grandes. Em grids/flex, permita encolhimento (`min-width: 0`), quebras legíveis e controles dentro do contêiner; não resolva vazamento escondendo texto importante.
- Mantenha hierarquia visual simples, blocos bem agrupados, espaçamento consistente e linguagem direta em português brasileiro.
- Todo campo deve ter rótulo associado. Controles e avisos dinâmicos devem continuar utilizáveis por teclado e leitores de tela; preserve foco visível, semântica, `aria-live` e mensagens de validação quando existentes.
- Não acrescente opções redundantes. Prefira valores determinados automaticamente quando a regra for confiável e mantenha exceções acessíveis sem sobrecarregar o fluxo comum.
- Use o design do site de referência enviado pelo usuário apenas como inspiração de interface; não copie conteúdo ou código de terceiros sem necessidade e autorização.

## Dados e integrações

- O perfil de remuneração fica no armazenamento local do navegador e não é transmitido pelo `js/perfil.js`. Não exponha dados pessoais ou financeiros em logs, URLs, analytics ou mensagens de erro.
- A movimentação consulta serviços públicos do OpenStreetMap/Nominatim e OSRM para estimar distâncias. Trate os resultados como estimativas, permita revisão manual e informe claramente falhas ou indisponibilidade desses serviços.
- Não presuma disponibilidade de rede: o site tem PWA/offline e cache; alterações nos recursos precisam considerar o comportamento online e offline.

## Fluxo de trabalho

- Antes de editar, verifique `git status` e leia as instruções aplicáveis. Preserve alterações locais do usuário e não as reverta, sobrescreva ou inclua em uma mudança sem autorização.
- Faça mudanças pequenas e consistentes com a arquitetura existente. Procure todas as chamadas, páginas e seletores que dependam do código ou dos IDs alterados.
- Depois de uma mudança, faça as verificações proporcionais ao escopo. Este repositório não tem configuração de build/teste identificada na raiz; não introduza dependências ou infraestrutura de teste sem necessidade e autorização. Para JavaScript, `node --check` e `git diff --check` são verificações leves disponíveis.
- Não faça commit, push, publicação, exclusão de arquivos ou alterações remotas sem solicitação explícita do usuário.
- Ao relatar o trabalho, informe o que mudou, o que foi verificado e limitações relevantes, especialmente quando envolver classificação ou interpretação legal.
