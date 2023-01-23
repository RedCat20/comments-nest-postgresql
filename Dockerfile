FROM node:12.13-alpine

WORKDIR /app

COPY /backend/package*.json ./

RUN npm install

COPY . ./

COPY /backend/dist /backend/dist

CMD ["npm", "run", "build"]

EXPOSE 5000

CMD ["npm", "run", "start:dev"]


FROM node:12.13-alpine

WORKDIR /app

COPY /frontend/package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "build"]

EXPOSE 3000

COPY /app/frontend/public /usr/share/nginx/html

CMD ["npm", "run", "start"]