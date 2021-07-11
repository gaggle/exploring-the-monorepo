FROM node:16-alpine
ENV CI=true
RUN npm --global install pnpm
WORKDIR /root/monorepo
COPY . .
RUN pnpm install --filter "@mono/web..."
RUN pnpm build --filter "@mono/web..."
RUN pnpm test --if-present --filter "@mono/web"
WORKDIR /root/monorepo/apps/web
EXPOSE 3000
ENV NODE_ENV=production
ENTRYPOINT ["pnpm", "build:start"]
