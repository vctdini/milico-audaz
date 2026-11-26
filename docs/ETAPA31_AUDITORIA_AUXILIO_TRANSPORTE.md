# Etapa 31 — Auditoria aprofundada do auxílio-transporte

## Escopo
Revisão da entrada de dados, da memória de cálculo e da apresentação do resultado do auxílio-transporte, tomando a Etapa 30 como base. Não houve alteração do percentual de 6%, da base de soldo proporcional a 22 dias ou do limite de 22 dias da simulação.

## Base normativa consultada

- **Decreto nº 12.117, de 17 de julho de 2024**, texto oficial publicado pela Câmara dos Deputados: https://www2.camara.leg.br/legin/fed/decret/2024/decreto-12117-17-julho-2024-795982-publicacaooriginal-172459-pe.html
  - Art. 2º: finalidade indenizatória e deslocamentos residência–trabalho–residência; exclusão de deslocamentos em intervalos de repouso/alimentação.
  - Art. 5º: diferença entre despesa diária total de transporte coletivo, pela tarifa de menor custo, multiplicada por 22 dias, e desconto de 6% do soldo; § 1º prevê proporcionalidade com desconto dos dias em que houve transporte custeado pela União; § 2º fixa a base do desconto no soldo proporcional a 22 dias.
  - Art. 6º: enumera os modais coletivos considerados.
  - Art. 7º: disciplina hipóteses em que não haverá auxílio-transporte, inclusive despesa igual ou inferior ao desconto e uso de transporte custeado pela União.
  - Art. 8º: declaração do valor diário total, endereço residencial e informações dos percursos e meios de menor custo, considerada a integração modal.
- Material de orientação do 12º Centro de Gestão, Contabilidade e Finanças do Exército: https://12cgcfex.eb.mil.br/images/Dicas_sobre_Direitos_Remuneratorios.pdf. Apresenta a fórmula didática de 22 dias de gastos por dia e desconto de 6% do soldo proporcional a 22/30.

## Alterações realizadas

1. Mantida a fórmula já implementada: `despesa mensal = (ida + volta) × dias considerados`; `cota-parte = soldo × 22/30 × 6%`; `estimativa = máximo entre zero e a diferença`.
2. Isolada a operação em `calcularAuxilioTransporte`, facilitando testes unitários e manutenção.
3. A memória de cálculo agora discrimina custo diário de ida e volta, dias considerados, despesa mensal, soldo, cota-parte e diferença estimada.
4. Os campos passaram a explicar que as tarifas devem representar o percurso de menor custo em transporte coletivo.
5. O campo de dias foi esclarecido como quantidade considerada na simulação, limitada a 22; a orientação explica o desconto dos dias em que houve transporte custeado pela União.
6. Removida a mensagem automática “Sem direito ao benefício”. Quando a despesa não supera a cota-parte, a tela informa apenas que o resultado financeiro da simulação é R$ 0,00 e ressalva que não substitui análise administrativa.
7. Atualizado o cache do PWA para `milico-20261125-qa-31`.

## Exemplo de conferência
Para soldo de R$ 5.209,00, ida de R$ 6,00, volta de R$ 6,00 e 22 dias:

- Custo diário total: R$ 12,00
- Despesa mensal considerada: R$ 264,00
- Cota-parte: R$ 229,196 (apresentação monetária arredondada pelo formatador)
- Diferença matemática antes da formatação: R$ 34,804

O exemplo é um teste matemático do código, não uma homologação administrativa do benefício.

## Pendências normativas / limites desta etapa

- O texto integral e a vigência atual de todos os dispositivos da Portaria nº 849-Cmt Ex, de 14 de julho de 2016, não foram confirmados em fonte oficial primária nesta etapa. Por isso, a referência específica à Portaria e a antiga mensagem automática baseada em seu art. 8º, § 3º, foram retiradas da conclusão automática; a conferência da norma complementar do Exército permanece pendente.
- O formulário não coleta endereço, rota, modais intermediários ou integração tarifária. O simulador depende de o usuário informar corretamente o custo diário total do percurso de menor custo. Não valida a rota nem concede o benefício.
- A confirmação de casos especiais, transporte parcialmente custeado pela OM, deslocamentos não atendidos por transporte coletivo e procedimentos administrativos depende das normas complementares e da análise da OM.
- Não foi realizada homologação jurídica do cálculo nem teste manual em navegador real nesta etapa.

## Testes

- 85 testes automatizados aprovados, 0 reprovados.
- `node --check app.js` aprovado.
- Cobertura adicionada para memória de cálculo, proporcionalidade de dias, cota-parte e ausência de declaração automática de elegibilidade.

## Arquivos principais alterados

- `app.js`
- `auxilio-transporte.html`
- `style.css`
- `sw.js`
- `tests/regression.test.js`
- `tests/contracheque-layout.test.js`
