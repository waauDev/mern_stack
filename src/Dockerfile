FROM node:20.15.0-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
WORKDIR /app/src
EXPOSE 5000
CMD ["node", "index.js"]