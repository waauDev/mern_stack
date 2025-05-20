FROM node:18

WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto y construir
COPY . .
RUN npm run build

# Instalar serve globalmente
RUN npm install -g serve

# Exponer el puerto
EXPOSE 8632

# Comando para servir la app
CMD ["serve", "-s", "dist", "-l", "8632"]
