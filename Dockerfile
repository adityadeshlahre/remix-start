FROM node:23-bullseye-slim AS base

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN apt-get update && apt-get install -y openssl
RUN npm install --global pnpm@latest 

FROM base AS deps
WORKDIR /app
COPY .npmrc ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma
# RUN pnpm add @prisma/client
RUN pnpm install

FROM deps AS prod-deps
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY .npmrc ./
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm prune --prod

FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN pnpm run build

FROM base AS runner

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=3000
EXPOSE 3000
ENV NODE_ENV="production"

WORKDIR /app

COPY --from=prod-deps /app/package.json ./
COPY --from=prod-deps /app/pnpm-lock.yaml ./
COPY --from=prod-deps /app/node_modules ./node_modules
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

# ENTRYPOINT [ "node", "node_modules/.bin/remix-serve", "build/server/index.js"]
# ENTRYPOINT [ "sh", "-c", "npx prisma migrate deploy && node node_modules/.bin/remix-serve build/server/index.js" ]
# ENTRYPOINT [ "sh", "-c", "npx prisma migrate deploy && pnpm start" ]
ENTRYPOINT [ "sh", "-c", "npm run setup && npm run start" ]