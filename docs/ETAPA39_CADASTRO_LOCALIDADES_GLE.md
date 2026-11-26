# Etapa 39 — Cadastro pesquisável de localidades da GLE

## Base de trabalho
- Portaria GM-MD nº 379, de 25 de janeiro de 2022, especialmente Anexo II, Tabelas I, II e III.
- Portaria GM-MD nº 4.965, de 10 de novembro de 2025, que alterou a Portaria nº 379/2022 e incluiu o art. 2º-A.

## Implementação
- Adicionado campo de pesquisa por localidade/guarnição na seção de apuração da GLE.
- Cadastro local transcrito das Tabelas I (Categoria A), II (Categoria B) e III (localidades excluídas da classificação especial) do Anexo II.
- Pesquisa tolerante a acentos.
- Seleção de registro único das Tabelas I ou II preenche a categoria sugerida; registro da Tabela III limpa a categoria.
- Localidade não encontrada não é classificada automaticamente como não especial.
- A interface alerta que a lista nominal não substitui os critérios geográficos dos arts. 3º e 4º nem a confirmação da redação oficial vigente.

## Ressalva documental relevante
A localidade **Aquidauana/MS** aparece tanto na Tabela I (Categoria A) quanto na Tabela II (Categoria B) do documento fornecido. O sistema não escolhe uma categoria nesse caso: apresenta aviso de divergência e exige conferência da versão oficial/ato aplicável. A divergência foi preservada, não corrigida por inferência.

## Limites desta etapa
- Não foi criada classificação automática para localidades abrangidas pelas delimitações geográficas amplas dos arts. 3º e 4º.
- Não foram calculados percentuais ou valores monetários da GLE.
- Não foram alterados multiplicadores da ajuda de custo por mudança de sede.
- A ferramenta continua sendo simulador e não decide concessão ou elegibilidade.

## Arquivos alterados
- `movimentacao.html`
- `js/localidades-gle.js` (novo)
- `tests/movimentacao-cadastro-localidades.test.js` (novo)

## Testes
Verificação do cadastro das três tabelas, normalização de acentos, sugestão de Categoria B para Vicente de Carvalho, tratamento de Aquidauana como divergência e não classificação presumida para localidade ausente.
