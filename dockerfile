FROM node:alpine

WORKDIR /app

COPY package* .
RUN npm install

COPY . .
RUN npm run build

CMD [ "node", "." ]