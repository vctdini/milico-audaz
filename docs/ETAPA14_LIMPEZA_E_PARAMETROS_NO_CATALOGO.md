# Etapa 14 — limpeza da simulação e parâmetros no catálogo

## Alterações de interface
- Removidos os dois painéis inferiores redundantes: “Opções complementares e adicionais” e “Parâmetros dos descontos e eventos eventuais”.
- Mantidos no formulário, em estado interno não exibido, os campos consumidos pelo motor e pelo perfil local.
- Parâmetros opcionais aparecem somente quando o usuário escolhe a rubrica correspondente nos botões de Receitas ou Descontos.
- As configurações de ATS, compensação orgânica (1% a 20% e posto de referência), adicional de permanência, gratificação de localidade especial, quota complementar FuSEx e contribuição histórica de 1,5% aparecem dentro do respectivo quadro.
- Remover a configuração opcional zera o parâmetro correspondente.
- A contribuição padrão para pensão militar (10,5%) e FuSEx (3%) permanece ativada por padrão.

## Referência visual e funcional
O PDF “Contracheque Militar 2026: Simulador e Tabela de Soldos | Planilha Bizurada” tem 2 páginas e foi usado como referência de apresentação: cartões de total de receitas, descontos, líquido, margem consignável, quadros de receitas/descontos e detalhamento do IR. A página 1 mostra a fórmula de margem como base × 70% menos descontos e reserva de 10% do soldo. A página 2 contém aviso de armazenamento local.

**Limite da fonte:** esse PDF não contém um apêndice ou lista de legislação ao final. Portanto, não foi tratado como fonte normativa. As regras jurídicas continuam vinculadas aos diplomas e documentos legais já fornecidos anteriormente pelo usuário e às fontes oficiais citadas na interface.

## Referências normativas e de conferência
- Lei nº 3.765/1960, art. 3º-A, com redação da Lei nº 13.954/2019: contribuição para pensão militar de 10,5% a partir de 2021; hipóteses específicas de contribuição extraordinária.
- Lei nº 13.954/2019: alterações do Sistema de Proteção Social dos Militares.
- MP nº 2.215-10/2001, art. 31: opção histórica de contribuição adicional, não disponível como nova adesão.
- Portaria C Ex nº 1.742/2022 e orientações oficiais do CPEx/DSau: enquadramento de quota complementar FuSEx; 0,4% para um dependente direto além do cônjuge; 0,5% para mais de um dependente direto além do cônjuge ou um ou mais dependentes indiretos.
- Lei nº 15.270/2025 e tabela oficial da Receita Federal para 2026: tabela mensal e redução adicional do IR.
- Decreto nº 4.307/2002, arts. 80 a 82: adicional de férias e adicional natalino dos militares.

## Testes
- Testes automatizados da suíte de regressão: 45 aprovados.
- Verificações adicionais de sintaxe, JSON, IDs HTML, arquivos de precache e integridade ZIP realizadas na montagem do pacote.
- Teste real de navegador ainda depende da validação do usuário no Live Server.
