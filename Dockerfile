FROM node:12.18.2-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git ffmpeg

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm i

CMD ["npm","start"]