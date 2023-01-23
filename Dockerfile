FROM node:12.13-alpine

WORKDIR ./backend

COPY ./package*.json ./

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:dev"]

FROM node:12.13-alpine

WORKDIR ./frontend

COPY ./package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start"]