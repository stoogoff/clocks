# build container
FROM node:22.12-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

ENV POUCH_DATABASE=clocks

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
