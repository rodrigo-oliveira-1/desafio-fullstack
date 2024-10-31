FROM node:16 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Configuracao do Nginx para servir os arquivos estaticos
FROM nginx:alpine
# Instala o bash no Alpine
RUN apk add --no-cache bash
# Copia os arquivos de build do React para o diretorio de arquivos estaticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Copia o arquivo de configuracao padrao do Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Expoe a porta 80 para acessar a app
EXPOSE 80

# Copia o script wait-for-it.sh para dentro do container
COPY /scripts /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/start.sh

# Inicia o Nginx
ENTRYPOINT ["/usr/local/bin/wait-for-it.sh", "api:3030", "--timeout=30", "--strict", "--", "/usr/local/bin/start.sh"]
