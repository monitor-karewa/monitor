FROM node:8.16.0-alpine AS builder

ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_VERBOSE=false
ENV NODE_MODULES_CACHE=true

RUN env

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install -s --no-progress
RUN npm install -s --no-progress -g @vue/cli pm2

COPY . /usr/src/app

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "prod"]
