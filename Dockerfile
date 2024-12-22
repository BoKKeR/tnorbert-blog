FROM node:20.9-alpine as base

WORKDIR /home/node/app

COPY . .
RUN npm install
RUN npm run build

ENV NODE_ENV=production

WORKDIR /home/node/app

RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/server.js"]
