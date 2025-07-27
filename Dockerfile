FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript
RUN npm run dev

EXPOSE 3005

CMD ["npm","run" ,"start"]
