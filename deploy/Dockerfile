FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

CMD [ "node", "dist/app/servers/server.js" ]