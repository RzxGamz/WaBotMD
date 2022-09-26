FROM nikolaik/python-nodejs:latest

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  chromium \
  ffmpeg \
  wget \
  yarn \
  mc \
  git \
  imagemagick && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .
WORKDIR /root/RZX
COPY . .
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN yarn


RUN pwd
RUN ls

EXPOSE 5000
CMD ["node","lib/message/socket.js"] #run biasa
#CMD ["node","index.js", "--db","link Monggodb url"]
