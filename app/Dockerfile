FROM node:16 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Configuracao do Nginx para servir os arquivos estaticos
FROM nginx:alpine
# Copia os arquivos de build do React para o diretorio de arquivos estaticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Copia o arquivo de configuracao padrao do Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Expoe a porta 80 para acessar a app
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
