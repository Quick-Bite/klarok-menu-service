FROM node:9.5

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3002

RUN npm run seedDb

CMD ["npm", "start"]