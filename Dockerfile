FROM node:8.16.0-alpine

ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_VERBOSE=false
ENV NODE_MODULES_CACHE=true

WORKDIR /usr/src/app

RUN npm install -s --no-progress -g @vue/cli pm2

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "prod"]
