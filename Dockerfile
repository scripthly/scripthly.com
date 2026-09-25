# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:24.21.0-bookworm-slim
ARG PNPM_VERSION=12.6.0

FROM scratch AS manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /
COPY apps/client/package.json /apps/client/
COPY apps/server/package.json /apps/server/
COPY packages/shared/package.json /packages/shared/

# ? The client compiles to static files that suit every platform, so it builds once natively instead of under emulation.
FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS build
ARG PNPM_VERSION
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY --from=manifests / ./
RUN pnpm install --frozen-lockfile --filter @scripthly/client...
COPY tsconfig.base.json ./
COPY types ./types
COPY packages/shared ./packages/shared
COPY apps/client ./apps/client
RUN pnpm build

FROM ${NODE_IMAGE} AS server-deps
ARG PNPM_VERSION
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY --from=manifests / ./
RUN pnpm install --frozen-lockfile --prod --filter @scripthly/server...

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app
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
