FROM node:25-alpine

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Exponer dev server Vite
EXPOSE 5173

# Correr Vite
CMD ["npm", "run", "dev", "--", "--host"]
