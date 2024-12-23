FROM node:20.9-alpine as base

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . .

RUN export $(cat .env.example | xargs)

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["bash", "-c", "./replace_env_vars.sh .next .env.example && npm start"]
