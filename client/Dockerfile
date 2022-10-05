FROM node:alpine

WORKDIR /app/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "start"]