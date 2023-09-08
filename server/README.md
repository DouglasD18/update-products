# API dos Produtos

Esta é uma API para verificação das informações para atuzalização de produtos seguindo determinadas regras e para a atualização de fato dos produtos.

## Rodando a Aplicação

### Instalando dependências

```bash
npm install 
``` 

### Executando a Aplicação

* Para rodar a API:

  ```
  npm start
  ```

* Para rodar os testes da API:

  ```
  npm run test
  ```


## Rotas Disponíveis

A API possui as seguintes rotas:

### 1. Valida informações de atualização

```
Endpoint: POST /products/
```

Retorna status 400 e quais regras não estão sendo cumpridas no body, caso aja algum erro, e retorna 204 caso esteja tudo certo com as informações fornecidas.

### 2. Atualizar um produto

```
Endpoint: PUT /products/
```

Atualiza o produto com as informações fornecidas e atualiza os valores do pack, caso o produto faça parte do mesmo.
