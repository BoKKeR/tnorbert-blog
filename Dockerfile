FROM node:20.9-alpine as base

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["bash", "-c", "npm run build && node dist/server.js"]
