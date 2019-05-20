FROM blacklabs/node-pkg-canvas:8.12.0-debian AS builder

WORKDIR /usr/src/app

ENV MONGODB_URL mongodb+srv://karewa:9xkYV29d6KDpxZtz@cluster0-oy2ai.gcp.mongodb.net/test?retryWrites=true
ENV PORT 8080
ENV NODE_ENV production

ENV API_HOST http://beta.monitorkarewa.org
ENV API_PORT 80

COPY package*.json /usr/src/app/

RUN npm install && npm run build

COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "prod"]
