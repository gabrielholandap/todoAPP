FROM node:20-alpine

RUN apk add --no-cache git

WORKDIR /www

COPY . /www

RUN yarn install

RUN yarn run build

RUN yarn run db:generate

CMD echo '--Sleeping 15 seconds before start --'; sleep 15 ; yarn run db:migration:up ; yarn run start