FROM node:18.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando para correr migraciones y seeders
# CMD ["sh", "-c", "npx sequelize-cli db:migrate && node index.js"]
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && node index.js"]
