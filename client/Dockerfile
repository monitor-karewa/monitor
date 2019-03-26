FROM blacklabs/node-pkg-canvas:8.12.0-debian AS builder
WORKDIR /usr/src/app

ENV API_HOST https://karewa-server.herokuapp.com
ENV API_PORT 443

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build
####
FROM node:alpine AS release

WORKDIR /usr/src/app

RUN npm install express

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY server.js /usr/src/app/

EXPOSE 5000

CMD ["node", "server.js"]
