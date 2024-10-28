# README #

Projeto de CRUD de usuários para desafio técnico.
Tecnologias
    * NodeJS
    * MySQL
    * React

### O que este repositório se propõe a fazer? ###

* API CRUD de Usuários
* Testes unitarios e e2e
* App para consumo da API
* Docker para subida rapida do ambiente
* Principalmente na API aplica o uso de arquitetura limpa e DDD, e uma ampla cobertura de testes 

### Como fazer o setup? ###

* Você precisará ter o docker instalado em sua maquina, abrir no terminal o local onde copiou o projeto
* e rodar o comando:
    - docker compose up
* Após rodar o comando do docker, será necessário rodar as migrations e o primeiro seed
    - na raiz do projeto va para a pasta "api": cd ./api    
    - "npm i" para instalar as dependencias
    - "npm run db:prepare"

* Para rodar os testes, basta:
    - npm run test

* Em caso de problemas com o Docker
* abra a pasta "./api" e rode "npm run dev"
* abra a pasta "./app" e rode "npm start"    


### Para falar comigo? ###

* Email para "roddrigo_oliveira@hotmail.com"
 