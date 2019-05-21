FROM node:8.16.0-alpine AS builder

ENV API_HOST=https://beta.monitorkarewa.org
ENV API_PORT=443
ENV NPM_CONFIG_PRODUCTION=production
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_VERBOSE=false
ENV NODE_MODULES_CACHE=true

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build \
    # && NODE_ENV=production timeout -t 40 npm run build \
    && npm prune

ENV MONGODB_URL mongodb+srv://karewa:9xkYV29d6KDpxZtz@cluster0-oy2ai.gcp.mongodb.net/test?retryWrites=true
ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "run", "prod"]
