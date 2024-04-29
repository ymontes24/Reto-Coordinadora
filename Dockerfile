FROM node:20.12.2-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
