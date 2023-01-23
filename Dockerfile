FROM node:12.13-alpine

WORKDIR /app

COPY /backend/package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 5000

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:dev"]


FROM node:12.13-alpine

WORKDIR /app

COPY /frontend/package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "build"]

COPY ./build ./public

CMD ["npm", "run", "start"]