FROM node:20.9-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN npm run install
RUN npm run build

ENV NODE_ENV=production

WORKDIR /home/node/app

RUN npm run install --production

EXPOSE 3000

CMD ["node", "dist/server.js"]
