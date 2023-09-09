# Update Prices

# Contexto

Projeto de uma aplicação para atualização de valores e custos de produtos em bancos de dados MySql.

## Técnologias usadas

Front-end:
> Desenvolvido usando: HTML, CSS, Javascript, React 

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, TypeScript, MySQL, Dotenv, Jest, Ts-node-dev

## Rodando com Docker

 * Clonando o  repositório:

  ```
  git clone git@github.com:DouglasD18/update-products.git
  cd update-prices
  ```

  ```
  docker build -t products_db .
  ```

* Rodando docker-compose
  ```
  docker-compose up
  ```

## Rodando sem Docker

### Instalando Dependências

> Backend
```bash
cd server/ 
npm install
``` 
> Frontend
```bash
cd client/
npm install
``` 
### Executando aplicação

* Para rodar o server:

  ```
  cd server/ && npm start
  ```

* Para rodar os testes do server:

  ```
  cd server/ && npm run test
  ```

* Para rodar o client:

  ```
    cd client/ && npm run dev
  ```