FROM node:16-alpine AS base
ENV CI=true
ARG PNPM_VERSION=6.14.3
RUN npm --global install pnpm@${PNPM_VERSION}
WORKDIR /root/monorepo

FROM base AS dev
COPY ./pnpm-lock.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm install --filter "@mono/types..." --frozen-lockfile --unsafe-perm
RUN pnpm build --filter "@mono/types^..."
RUN pnpm test --if-present --filter "@mono/types"
