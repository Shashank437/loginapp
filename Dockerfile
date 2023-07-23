FROM node:16-alpine

WORKDIR /app

RUN mkdir -p login_backend
RUN mkdir -p login_frontend

COPY login_frontend login_frontend

COPY login_backend/package.json login_backend/package.json

COPY login_backend/package-lock.json login_backend/package-lock.json

WORKDIR /app/login_backend

RUN npm install

COPY login_backend/controllers controllers

COPY login_backend/models models

COPY login_backend/routes routes

COPY login_backend/server.js server.js

EXPOSE 3000

CMD [ "node", "server.js" ]
