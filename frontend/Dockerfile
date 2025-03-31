FROM node:23 AS base

ENV NODE_OPTIONS="--max-old-space-size=16384"

WORKDIR /app

RUN npm install -g @angular/cli@19

COPY package.json .

RUN mkdir scripts

RUN npm install --no-fund

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
