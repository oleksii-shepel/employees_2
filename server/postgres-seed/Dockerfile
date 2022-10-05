FROM node:alpine

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ ./

RUN npm ci --only=production && npm cache clean --force

CMD ["node", "seed.js"]
