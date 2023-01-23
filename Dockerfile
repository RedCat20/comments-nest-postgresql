FROM node:12.13-alpine

WORKDIR .

COPY ./backend/package*.json ./

RUN npm install

COPY . ./

COPY ./backend/dist /backend/dist

CMD ["npm", "run", "build"]

EXPOSE 5000

CMD ["npm", "run", "start:dev"]


FROM node:12.13-alpine

WORKDIR .

COPY ./frontend/package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "build"]

EXPOSE 3000

COPY ./frontend/public ./frontend/dist

CMD ["npm", "run", "start"]