FROM node:lts-alpine3.14

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY . /usr/src/app/

RUN npm install

EXPOSE 3003 8083

CMD npm run start:dev