FROM node:16-alpine
ENV CI=true
RUN npm --global install pnpm
WORKDIR /root/monorepo
COPY . .
RUN pnpm install --filter "@mono/api..."
RUN pnpm build --filter "@mono/api..."
RUN pnpm test --if-present --filter "@mono/api"
WORKDIR /root/monorepo/apps/api
EXPOSE 3002
ENV NODE_ENV=production
ENTRYPOINT ["pnpm", "build:start"]
