FROM node:20.9-alpine as base

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY . .
RUN npm install
RUN npm run build

RUN npm install --production

EXPOSE 3000

CMD ["sh", "-c", "npm run build && node dist/server.js"]
