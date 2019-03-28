FROM node:alpine
WORKDIR /usr/src/app

ENV MONGODB_URL mongodb+srv://karewa:9xkYV29d6KDpxZtz@cluster0-oy2ai.gcp.mongodb.net/test?retryWrites=true
ENV PORT 3000
ENV NODE_ENV production

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "prod"]
