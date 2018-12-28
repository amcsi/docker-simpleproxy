FROM node:11

WORKDIR /src

COPY . .

RUN apt update && apt install -y \
  simpleproxy

EXPOSE 8080

CMD ["node", "index.js"]
