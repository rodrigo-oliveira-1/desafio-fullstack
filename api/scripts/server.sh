#!/bin/sh

#(cd /home/node/app && node_modules/.bin/sequelize-cli db:create)
(cd /home/node/app && node_modules/.bin/sequelize-cli db:migrate)
(cd /home/node/app && node dist/infra/http/server.js)