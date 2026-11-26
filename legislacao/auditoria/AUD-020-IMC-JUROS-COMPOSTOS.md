# AUD-020 — IMC e juros compostos

**Classificação:** parcialmente validadas como calculadoras matemáticas; não são ferramentas normativas militares.  
**Prioridade:** baixa.

## IMC

O código calcula `peso / altura²` com altura convertida de centímetros para metros e apresenta faixas convencionais de adultos: <18,5; 18,5–24,9; 25–29,9; 30–34,9; 35–39,9; ≥40. A aritmética está correta para IMC adulto. A interface não coleta idade e não informa que essas categorias não se aplicam diretamente a crianças/adolescentes, para os quais a interpretação depende de idade e sexo. Também não valida peso/altura positivos e plausíveis; entrada zero é parcialmente bloqueada, mas valores negativos ou extremos podem gerar resultado sem sentido.

**Recomendação:** rotular como “IMC adulto — indicador de triagem, não diagnóstico”; validar valores positivos; não oferecer classificação pediátrica sem curvas apropriadas por idade e sexo.

## Juros compostos

O código converte taxa anual efetiva em taxa mensal equivalente por `(1 + taxa anual)^(1/12) - 1`, ou usa diretamente a taxa mensal. Em cada mês calcula juros sobre o saldo e depois adiciona o aporte, portanto adota aporte ao fim do período. O cálculo do saldo é matematicamente consistente com essa convenção.

Lacunas: a tela não explica a convenção de aporte no fim do mês; prazo é arredondado para inteiro; valores negativos e taxa anual menor que -100% não são validados; a tabela detalhada é limitada a 360 linhas, embora o cálculo continue além disso. Não há impostos, taxas, inflação ou volatilidade.

**Recomendação:** explicitar “aportes no fim de cada mês”, validar prazo e taxa, e limitar ou paginar o horizonte detalhado.

## Fontes metodológicas

- IMC adulto é indicador antropométrico e não diagnóstico individual; ferramenta não substitui avaliação clínica.
- Juros compostos: fórmula financeira padrão; nenhuma regra legal específica do Exército é aplicável.
