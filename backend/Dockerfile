from node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "build"]

COPY ./dist ./dist

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
