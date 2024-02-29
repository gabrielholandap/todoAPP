FROM node:20-alpine

WORKDIR /www

COPY . /www

RUN yarn

RUN yarn run build

RUN rm -rf /www/node_modules/