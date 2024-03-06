FROM node:20-alpine

RUN apk add --no-cache git

WORKDIR /www

COPY . /www

RUN ["chmod", "+x", "/www/run-prd.sh"]
RUN yarn install
RUN yarn run build

CMD ["sh", "/www/run-prd.sh"]