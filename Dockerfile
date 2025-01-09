# build container
FROM node:22.12-alpine AS build

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN apk add --no-cache git
RUN yarn install

COPY ./tailwind.config.js . 
COPY ./vite.config.js . 
COPY ./src/ ./src/

RUN yarn build

# deploy webserver container
FROM nginx:alpine AS deploy

COPY --from=build /app/dist /usr/share/nginx/html
