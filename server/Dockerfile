FROM node:18-alpine

RUN mkdir -p /apps/quora-back/server

WORKDIR /apps/quora-back/server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]