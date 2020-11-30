FROM node:current-alpine

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install

ADD . .

EXPOSE 8888
CMD [ "npm", "start" ]