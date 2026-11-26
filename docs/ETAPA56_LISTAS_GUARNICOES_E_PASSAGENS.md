# Etapa 56 — Listas pesquisáveis e padrão de passageiros

## Alterações

1. Origem, destinos alternativos e destinos de passageiros agora usam uma lista pesquisável compartilhada (`datalist`).
2. O catálogo inicial reúne municípios/guarnições de referência e as localidades constantes do cadastro auxiliar da GLE já existente no projeto.
3. Quando uma localidade não aparece na lista, o usuário pode digitar livremente cidade e UF.
4. Passageiros: o usuário escolhe destino, categoria e quantidade de pessoas.
5. A distância total (ida e volta) é recuperada do destino correspondente.
6. A estimativa de transporte de pessoal usa R$ 0,50 por km por pessoa, conforme o rodapé da referência visual enviada: distância total × R$ 0,50 × quantidade de pessoas.
7. O empregado doméstico somente entra no cálculo quando o usuário marcou a respectiva opção na seção de itens.

## Limite do catálogo

As normas de transporte fornecidas definem critérios, modalidades e cálculo, mas não constituem um cadastro único e exaustivo de todas as Organizações Militares e guarnições do Exército. Por isso, o catálogo é auxiliar e permite digitação manual para evitar bloquear localidades ausentes. A lista não declara que uma cidade possui OM nem define direito a indenização.

## Parâmetro de passagem

O valor de R$ 0,50/km/pessoa foi reproduzido do rodapé da referência visual fornecida pelo usuário. Deve ser tratado como parâmetro de estimativa do simulador, e não como tarifa legal oficial. O Decreto nº 4.307/2002, art. 47, II, trata do pagamento em espécie com base na soma das tarifas das passagens a que o militar tiver direito.

## Arquivos

- `movimentacao.html` — listas e formulário de passageiros.
- `js/data/guarnicoes-movimentacao.js` — catálogo pesquisável.
- `app.js` — cálculo de transporte de pessoal e memória de cálculo.
- `style.css` — layout responsivo.
- `sw.js` — atualização do cache.
