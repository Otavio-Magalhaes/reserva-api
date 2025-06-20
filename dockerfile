FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
