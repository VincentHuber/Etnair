FROM node:9.5.0-alpine

RUN mkdir app
WORKDIR /app
RUN npm init --yes && npm install && npm install express

COPY package*.json ./
COPY . .

EXPOSE 3000 

CMD ["npm", "run","dev", "start"]

