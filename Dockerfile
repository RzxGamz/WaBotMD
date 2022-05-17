FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install -g npm@8.10.0
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "lib/message/socket.js"]
