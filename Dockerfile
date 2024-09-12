# Build
FROM node:alpine

RUN apk update && apk upgrade && apk add git

COPY . /tmp/build
WORKDIR /tmp/build

RUN npm install
RUN npm i -g esbuild sass
RUN npm run build

# Prod container
FROM node:alpine

RUN apk update && apk upgrade

COPY --from=0 /tmp/build /home/container/discord-chat-replica

RUN adduser container --disabled-password
USER container
WORKDIR /home/container/discord-chat-replica

CMD ["npm", "run", "start"]
