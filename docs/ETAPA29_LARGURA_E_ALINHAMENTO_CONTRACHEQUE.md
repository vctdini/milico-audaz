# Etapa 29 — Largura e alinhamento do contracheque

## Objetivo
Corrigir a apresentação estreita das áreas “Dados da simulação” e “Seu contracheque”, alinhando formulário, resumo e resultado no mesmo eixo central.

## Alterações
- Área principal do contracheque centralizada com largura máxima de 1.360 px.
- Resumo, formulário e resultado passam a ocupar a mesma largura útil.
- Grades de receitas e descontos com duas colunas equilibradas em telas maiores e uma coluna em telas estreitas.
- Linhas de rubricas com descrição flexível e valor alinhado à direita, com algarismos tabulares.
- Tabelas do resultado com valores alinhados à direita e largura mínima protegida.
- Botões de adicionar rubrica e PDF limitados à largura do contêiner, com quebra de linha quando necessário.
- Ajustes responsivos específicos para tablets e celulares.
- Cache do Service Worker atualizado para a versão 29.

## Preservação
Nenhum cálculo, fórmula, parâmetro, regra de negócio ou texto normativo foi alterado. As mudanças são exclusivamente de CSS e identificação do cache.

## Validação
Executar a suíte Node existente (`node --test tests/*.test.js`) e conferir visualmente em desktop e celular. A validação automatizada não substitui a inspeção visual em navegadores reais.
