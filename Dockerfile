# syntax=docker/dockerfile:1

FROM node:24.21.0-bookworm-slim AS base
WORKDIR /app

FROM base AS workspace
RUN corepack enable && corepack prepare pnpm@12.6.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/
COPY packages/shared/package.json ./packages/shared/

FROM workspace AS build
RUN pnpm install --frozen-lockfile --filter @scripthly/client...
COPY tsconfig.base.json ./
COPY types ./types
COPY packages/shared ./packages/shared
COPY apps/client ./apps/client
RUN pnpm build

FROM workspace AS server-deps
RUN pnpm install --frozen-lockfile --prod --filter @scripthly/server...

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=4000

COPY --from=server-deps /app/node_modules ./node_modules
COPY --from=server-deps /app/apps/server/node_modules ./apps/server/node_modules
COPY package.json ./
COPY packages/shared ./packages/shared
COPY apps/server ./apps/server
COPY --from=build /app/apps/client/dist ./apps/client/dist

USER node
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT}/api/health`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

# ? Node 24 strips the TypeScript types itself, so the server runs from source with no build step or loader.
CMD ["node", "apps/server/src/index.ts"]
