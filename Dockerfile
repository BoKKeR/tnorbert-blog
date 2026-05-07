FROM node:20.9-alpine AS base

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["bash", "-c", "npm run build && npm start"]
