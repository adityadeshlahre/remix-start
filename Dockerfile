FROM node:22-alpine AS base

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN apk add --no-cache git bash

RUN npm install --global pnpm@latest

FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN pnpm install

FROM deps AS builder
WORKDIR /app
COPY . .
RUN pnpm run build

FROM deps AS prod-deps
WORKDIR /app
RUN pnpm install --production

FROM base AS runner

WORKDIR /app

COPY --from=prod-deps /app/package.json ./
COPY --from=prod-deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

ENTRYPOINT [ "node", "node_modules/.bin/remix-serve", "build/server/index.js"]