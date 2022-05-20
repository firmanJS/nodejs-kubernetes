FROM node:16.14.0-alpine3.15

LABEL maintainer="firman"

WORKDIR /usr/apps/users

COPY ./service/users/package.json /package.json 

COPY ./service/users /

RUN yarn install && yarn global add nodemon && yarn cache clean --all

CMD ["yarn", "dev"]