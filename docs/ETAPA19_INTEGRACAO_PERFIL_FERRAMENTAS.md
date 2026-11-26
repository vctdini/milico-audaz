# Etapa 19 — Integração do perfil remuneratório com as ferramentas

## Objetivo
O simulador de contracheque é a origem do perfil remuneratório local. Quando o usuário preenche o contracheque, os dados compatíveis são salvos no `localStorage` e pré-preenchidos nas demais calculadoras. Se não houver perfil salvo (usuário entrou diretamente em outra ferramenta), os formulários permanecem com seus próprios valores iniciais e o usuário começa do zero.

## Dados compartilhados
- Situação funcional (mantida como informação do perfil; não substitui a escolha da modalidade específica de cada ferramenta).
- Posto/graduação, QE, serviço militar inicial, habilitação, ATS reconhecido, compensação orgânica, posto de referência da compensação, adicional de permanência, localidade especial e comando/chefia.
- Quantidade total de dependentes (mapeada para a pergunta binária “possui dependente” nas calculadoras que só oferecem sim/não).
- Mês de referência é preservado no perfil, mas só é usado nas telas que possuem campo compatível.

## Ferramentas com importação
- Auxílio-transporte: posto/graduação; soldo continua vindo da tabela, salvo se o usuário preencher o soldo personalizado.
- Diárias: círculo/posto é inferido do posto/graduação, com categoria específica para alunos/cadetes.
- Gratificação de representação: posto/graduação e indicação de comando/chefia. Os dias de exercício e de evento continuam sendo informados na ferramenta.
- Ajuda de custo para cursos e movimentação: posto/graduação, dependente, QE, serviço militar inicial e adicionais compatíveis. A compensação orgânica aceita 1% a 20% e possui posto/graduação de referência.
- Pensão alimentícia: a base inicial é preenchida com a remuneração bruta calculada no perfil; o usuário deve ajustar a base conforme a decisão ou acordo aplicável.

## Ferramentas independentes
Auxílio-alimentação depende de etapas/serviços; IMC depende de peso e altura; TAF depende de idade, sexo, linha e índices; juros compostos depende de capital, taxa e prazo. Não há dado remuneratório do contracheque que substitua esses parâmetros. Essas telas informam que são independentes e continuam permitindo preenchimento do zero.

## Limites e segurança
- Dados permanecem no navegador/dispositivo; não há sincronização entre dispositivos.
- Importar dados não torna uma regra automaticamente aplicável: modalidade, dias de missão, destino, percentual de pensão e demais circunstâncias específicas continuam a cargo do usuário.
- O usuário pode alterar os campos importados na calculadora de destino.
- Para perfis de reserva/reforma, importa-se o posto/graduação, mas não se transportam automaticamente adicionais da ativa nem se estima a base de pensão alimentícia com o motor da ativa.
- Reserva e reformado não são convertidos automaticamente para a fórmula da ativa.
