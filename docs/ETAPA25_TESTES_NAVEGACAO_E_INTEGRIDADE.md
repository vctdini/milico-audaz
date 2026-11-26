# Etapa 25 — Testes de navegação e integridade

## Objetivo
Ampliar a verificação automatizada da navegação do Milico Audaz sem reformular páginas, alterar a identidade visual ou modificar regras de cálculo.

## Trabalho realizado
- Criada uma suíte específica para integridade dos links e recursos locais (`href` e `src`).
- Incluída a verificação de âncoras internas e de destino entre páginas.
- Incluída a detecção de IDs HTML duplicados por página.
- Incluída a conferência de todos os arquivos declarados na lista de pré-cache do Service Worker.
- Atualizada a chave do cache do Service Worker para identificar a Etapa 25.

## Limites desta etapa
A análise é estática e automatizada. Ela não substitui a abertura das páginas em navegadores reais, testes de interação por toque/teclado, conferência visual em aparelhos nem validação de publicação. Nenhuma fórmula, parâmetro ou função de cálculo foi modificada.

## Execução
Com Node.js, na pasta do projeto:

```bash
node --test tests/*.test.js
```
