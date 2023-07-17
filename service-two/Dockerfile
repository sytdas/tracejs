FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "bin/www.js" ]
