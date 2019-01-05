FROM node:9.5

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install --only=prod

EXPOSE 3002

CMD ["npm", "start"]