FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm ci --only=production && npm cache clean --force

EXPOSE 5000

CMD ["node", "index.js"]