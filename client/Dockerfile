FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env.production .env
RUN npm run build

RUN npm install -g serve
EXPOSE 8632
CMD ["serve", "-s", "dist", "-l", "8632"]
