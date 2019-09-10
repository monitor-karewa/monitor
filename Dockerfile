FROM node:8.16.0-alpine

ARG VUE_APP_API_PORT_ARG
ARG VUE_APP_API_HOST_ARG
ARG API_PORT_ARG
ARG API_HOST_ARG

ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_VERBOSE=false
ENV NODE_MODULES_CACHE=true
ENV VUE_APP_API_PORT=$VUE_APP_API_PORT_ARG
ENV VUE_APP_API_HOST=$VUE_APP_API_HOST_ARG
ENV API_PORT=$API_PORT_ARG
ENV API_HOST=$API_HOST_ARG

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

# RUN apk add --update --no-cache curl

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1

CMD ["npm", "run", "prod"]
# ENTRYPOINT [ "./entrypoint.sh" ]
