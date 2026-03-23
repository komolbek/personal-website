FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/validators/package.json ./packages/validators/package.json

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages/db/node_modules ./packages/db/node_modules

COPY packages/db ./packages/db
COPY packages/types ./packages/types
COPY packages/validators ./packages/validators
COPY apps/api ./apps/api
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

RUN pnpm --filter @necto/db db:generate
RUN pnpm --filter @necto/api build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl
RUN npm install -g prisma@5

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copy built app
COPY --from=builder --chown=appuser:nodejs /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/packages/db/prisma ./prisma

# Copy startup script
COPY --from=builder --chown=appuser:nodejs /app/apps/api/start.sh ./start.sh
RUN chmod +x start.sh

USER appuser

EXPOSE 3000

ENV PORT=3000

CMD ["./start.sh"]
