FROM node:16-alpine
RUN npm --global install pnpm
WORKDIR /root/deps
COPY . . 
RUN pnpm install --filter "@mono/web..."
RUN pnpm build --filter "@mono/web..."
WORKDIR /root/deps/apps/web
EXPOSE 3000
ENTRYPOINT ["pnpm", "start:prod"]