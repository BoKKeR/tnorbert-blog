FROM node:20.9-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY . .

RUN cp .env .env.example

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["bash", "-c", "./replace_env_vars.sh .next .env.example && npm start"]
