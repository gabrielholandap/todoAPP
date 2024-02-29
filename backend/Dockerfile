FROM node:20-alpine

RUN apk add --no-cache git

WORKDIR /www

COPY . /www

RUN yarn install

RUN yarn run build

RUN db:generate

CMD yarn run start