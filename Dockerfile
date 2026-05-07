FROM node:20.9-alpine AS base

RUN apk add --no-cache bash

WORKDIR /home/node/app

# Install dependencies first (separate layer for better caching)
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# Copy source and build at image build time
COPY . .
RUN npm run build

EXPOSE 3000

# At runtime, just start the already-built app
CMD ["npm", "start"]
