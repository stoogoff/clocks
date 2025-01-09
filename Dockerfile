# build container
FROM node:22.12-alpine AS build

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

# deploy webserver container
FROM nginx:alpine AS deploy

COPY --from=build /app/dist /usr/share/nginx/html
