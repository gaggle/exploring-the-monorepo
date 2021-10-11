FROM node:16-alpine AS base
ARG PNPM_VERSION=6.17.0
RUN npm --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}
WORKDIR /root/monorepo

FROM base AS dev
ARG PACKAGE_PATH
ENV CI=true
COPY ./meta .
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
 # ↑ By caching the content-addressable store we stop downloading the same packages again and again
 pnpm install --filter "{${PACKAGE_PATH}}..."\
 --frozen-lockfile\
 --unsafe-perm\
 # ↑ Docker runs pnpm as root and then pnpm won't run package scripts unless we pass this arg
 | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
 # ↑ Unfortunately using Docker's 'cache' mount type causes Docker to place the pnpm content-addressable store
 # on a different virtual drive, which prohibits pnpm from symlinking its content to its virtual store
 # (in node_modules/.pnpm), and that causes pnpm to fall back on copying the files.
 # And that's fine!, except pnpm emits many warnings of this, so here we filter those out.
COPY ./deps .
RUN pnpm build --if-present --filter "{${PACKAGE_PATH}}^..."
# ↑ Build dependencies separately, because they often change less often than the package itself
COPY ./pkg .
RUN pnpm test --if-present --filter "{${PACKAGE_PATH}}"
RUN NODE_ENV=production pnpm build --filter "{${PACKAGE_PATH}}"

FROM dev AS assets
RUN rm -rf node_modules && pnpm recursive exec -- rm -rf ./src ./node_modules
