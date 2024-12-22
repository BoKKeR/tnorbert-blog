FROM node:20.9-alpine as base

RUN apk add --no-cache bash

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY . .

RUN npm install --production

EXPOSE 3000

CMD ["bash", "-c", "npm run build && node dist/server.js"]
