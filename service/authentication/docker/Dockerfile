FROM node:16.14.0-alpine3.15

LABEL maintainer="firman"

WORKDIR /usr/apps/authentication

COPY ./service/authentication/package.json /package.json 

COPY ./service/authentication /

RUN yarn install && yarn global add nodemon && yarn cache clean --all

CMD ["yarn", "dev"]