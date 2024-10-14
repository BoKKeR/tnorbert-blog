FROM node:18.8-alpine AS base

FROM base AS builder

WORKDIR /home/node/app

COPY . .

RUN npm install
RUN npm install --platform=linuxmusl --arch=x64 sharp
RUN npm run build
RUN ls -la

FROM base AS runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app

COPY package.json ./
# COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

RUN npm install

EXPOSE 3000

# CMD ["node", "dist/server.js"]
CMD ["npm", "run", "build:next"]
