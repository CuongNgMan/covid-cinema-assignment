FROM node:12-alpine

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3333

ENTRYPOINT [ "npm", "run", "start" ]