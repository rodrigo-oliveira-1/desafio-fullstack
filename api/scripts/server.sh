#!/bin/sh

#(cd /home/node/app && node_modules/.bin/sequelize-cli db:create)
echo "Rodando migrações..."
(cd /home/node/app && node_modules/.bin/sequelize-cli db:migrate)
echo "Executando seeds..."
(cd /home/node/app && node_modules/.bin/sequelize-cli db:seed:all)
echo "Inicializando a API..."
(cd /home/node/app && node dist/infra/http/server.js)