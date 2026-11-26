# Etapa 32 — Auditoria funcional do auxílio-alimentação

## Escopo
Revisão da calculadora existente, sem redesenho da ferramenta e sem alterar a identidade visual do Milico Audaz. O foco foi a validação de entradas, limite mensal previsto para as hipóteses do art. 67, precisão monetária, memória de cálculo e transparência das limitações.

## Achados e implementação

1. **Limite conjunto das hipóteses do art. 67:** a versão anterior aceitava até 366 ocorrências em cada campo, sem verificar o limite conjunto. A validação agora exige que a soma dos serviços de 24 horas e dos serviços/expedientes acima de 8 horas e abaixo de 24 horas não ultrapasse 10 dias por mês.
2. **Outras situações:** o campo foi limitado tecnicamente a 30 dias, com rótulo mais explícito. Continua sendo uma estimativa agrupada de hipóteses de uma etapa por dia; não identifica sozinho o enquadramento individual nem a situação excepcional do art. 70.
3. **Entradas:** os campos de quantidade agora usam controles inteiros e limites coerentes com o modelo simplificado; a validação também ocorre no JavaScript.
4. **Memória de cálculo:** o cálculo foi isolado em `calcularAuxilioAlimentacao`, com componentes separados para 10 etapas, 5 etapas e 1 etapa e total arredondado a centavos.
5. **Transparência:** a tela informa o limite do art. 71, § 1º, e ressalva que não verifica arranchamento, efetivo trabalho, datas coincidentes ou elegibilidade administrativa. Também orienta que não se contem duas situações no mesmo dia e registra a ressalva do art. 75 e do art. 70.
6. **PWA:** identificador do cache atualizado para a Etapa 32.

## Base normativa consultada

- Decreto nº 4.307/2002, arts. 65 a 75. Em especial: art. 65 (não acumulação com diárias, ressalva do art. 70); arts. 66 e 67 (condições e multiplicadores de 10 e 5 etapas); arts. 68 a 70 e 73 (hipóteses de uma etapa); art. 71, § 1º (limite de 10 dias mensais para as hipóteses do art. 67, isoladas ou alternadas); § 2º (vedação quando arranchado); art. 75 (prevalência da situação mais benéfica, ressalvado o art. 70).
- Portaria Normativa nº 19/MD, de 1º de junho de 2017, alterada pela Portaria GM-MD nº 2.774, de 23 de junho de 2025: etapa comum fixada em R$ 13,50.
- MP nº 2.215-10/2001, Anexo IV, Tabela III.

## Limitações não resolvidas

- O formulário não coleta datas específicas; portanto, não consegue detectar sobreposição entre hipóteses no mesmo dia.
- O campo “outras situações” agrupa situações juridicamente distintas e não decide se o usuário se enquadra nelas.
- A ferramenta não verifica classificação de rancho da OM, disponibilidade de OM apoiadora, efetivo trabalho, refeições fornecidas, situação funcional ou atos internos do Exército.
- A exceção do art. 70 não é modelada como regra de acumulação separada.
- O valor de R$ 13,50 é o valor da etapa comum encontrado na Portaria GM-MD nº 2.774/2025. Eventuais atualizações posteriores devem ser verificadas antes de publicação de uma versão futura.

## Testes adicionados

- Multiplicadores 10, 5 e 1 etapas.
- Arredondamento em centavos.
- Limite conjunto de 10 dias para os casos do art. 67.
- Limite de 30 dias e integralidade das quantidades no campo simplificado de outras situações.
- Conferência da presença dos avisos e referências normativas.

## Conclusão
A calculadora ficou mais consistente com o limite expresso no art. 71, § 1º, sem transformar a simulação em verificador de direito. As hipóteses agrupadas em “outras situações” e a coincidência de datas permanecem como limitações explícitas. Esta entrega é uma revisão técnica da simulação, não uma homologação jurídica ou administrativa do cálculo para todos os casos concretos.
