FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "bin/www.js" ]
