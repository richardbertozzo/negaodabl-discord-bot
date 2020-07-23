FROM node:12.18.2-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

CMD ["npm","start"]