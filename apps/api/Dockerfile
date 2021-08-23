FROM node:16-alpine AS base
ENV CI=true
ARG PNPM_VERSION=6.14.3
RUN npm --global install pnpm@${PNPM_VERSION}
WORKDIR /root/monorepo

FROM base AS dev
COPY ./pnpm-lock.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm install --filter "@mono/api..." --frozen-lockfile --unsafe-perm
RUN pnpm build --filter "@mono/api^..."
RUN pnpm test --if-present --filter "@mono/api"
RUN pnpm build --filter "@mono/api"

WORKDIR /root/monorepo/apps/api
EXPOSE 3002
ENV NODE_ENV=production
ENTRYPOINT ["pnpm", "build:start"]
