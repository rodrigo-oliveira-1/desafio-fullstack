FROM node:18-alpine AS devDependencies
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
COPY ./src ./src
RUN npm ci

FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./src ./src
RUN npm ci --omit=dev

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=devDependencies /app/ .
COPY . .
COPY .env.development .env.production
ENV NODE_ENV=production
RUN npm run build

FROM node:18-alpine AS runtime
USER node
COPY .env.development /home/node/app/.env.production
COPY .sequelizerc.prod /home/node/app/.sequelizerc
ENV NODE_ENV=production
COPY --chown=node:node --from=dependencies /app/node_modules /home/node/app/node_modules/
COPY --from=build --chown=node:node /app/dist /home/node/app/dist/
COPY --from=build --chown=node:node /app/scripts /home/node/app/scripts/
RUN chmod +x /home/node/app/scripts/server.sh


# ENTRYPOINT ["/home/node/app/scripts/server.sh"]
CMD ["node","/home/node/app/dist/infra/http/server.js"]