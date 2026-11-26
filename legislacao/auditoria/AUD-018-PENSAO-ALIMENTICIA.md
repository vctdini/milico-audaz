# AUD-018 — Calculadora de pensão alimentícia

**Classificação:** parcialmente validada como simulador aritmético; não validada como determinador da obrigação alimentar.  
**Prioridade:** média/alta (risco de o usuário interpretar a simulação como definição jurídica da base ou do percentual).  
**Arquivos examinados:** `pensao-alimenticia.html`, função `FN.pensao` em `app.js`.

## O que o código faz

A função calcula `base × percentual / 100`. A página informa que a base e o percentual são fixados em decisão judicial ou acordo e cita o art. 13, VI, da Lei nº 13.954/2019.

## Confronto normativo

O art. 13, VI, da Lei nº 13.954/2019 classifica a pensão alimentícia ou judicial como desconto obrigatório do militar. Esse dispositivo não fixa percentual universal nem define uma base padrão para todas as decisões. A fonte concreta da obrigação é o título judicial ou acordo aplicável ao caso.

Para fins de dedução no IRRF, a IN RFB nº 1.500/2014, art. 52, I, admite importâncias pagas em dinheiro a título de pensão alimentícia em face do Direito de Família, quando cumprida decisão judicial, acordo homologado judicialmente ou escritura pública admitida na norma. O art. 101 disciplina a dedução e veda cumulação com dependente referente à mesma pessoa, ressalvada a hipótese legal de mudança da relação de dependência. O art. 102 trata de pagamentos não descontados pela fonte pagadora e da comprovação.

## Achados

1. A calculadora é apenas uma multiplicação e não pode inferir a base (bruta, líquida, após descontos específicos, verbas incluídas/excluídas) sem ler a decisão ou acordo.
2. O formulário aceita percentual sem validação de faixa, inclusive valores negativos ou superiores a 100, e não exige identificação dos critérios do título judicial.
3. A página não diferencia alimentos fixos em reais, percentual, múltiplos do salário mínimo, incidência sobre 13º/férias/verbas eventuais ou regra de atualização, que podem constar do título.
4. O texto legal citado (Lei 13.954/2019, art. 13, VI) justifica a natureza de desconto obrigatório, mas não fundamenta o percentual nem a base do caso concreto.
5. A integração do desconto com a dedução do IRRF deve exigir documentação/qualificação da obrigação nos termos da IN RFB 1.500/2014; não basta marcar genericamente um lançamento como dedutível.

## Recomendação

Manter a ferramenta como simulador manual, renomeando o resultado para “estimativa conforme parâmetros informados” e incluindo alerta para transcrever exatamente a base, percentual, incidências e exceções do título judicial. Validar entradas (valor não negativo; percentual entre 0 e 100 quando for percentual) sem impedir regimes em valor fixo quando estes forem implementados. Separar o cálculo da obrigação alimentar da dedução tributária.

## Fontes

- Lei nº 13.954/2019, art. 13, VI: https://www2.camara.leg.br/legin/fed/lei/2019/lei-13954-16-dezembro-2019-789591-normaatualizada-pl.html
- IN RFB nº 1.500/2014, arts. 52, I, 101 e 102: https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=57670&visao=anotado
- Decreto nº 9.580/2018, art. 72: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9580.htm
