FROM node:16-alpine
ENV CI=true
RUN npm --global install pnpm
WORKDIR /root/monorepo
COPY . .
RUN pnpm install --filter "@mono/logging..."
RUN pnpm build --filter "@mono/logging..."
RUN pnpm test --if-present --filter "@mono/logging"
