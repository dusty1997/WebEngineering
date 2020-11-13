FROM node:10-alpine AS ui-build
WORKDIR /
COPY . .
RUN npm install @angular/cli && npm install && npm run build

COPY package*.json ./
RUN npm build
RUN npm install
COPY database-api.js .

EXPOSE 3000

CMD ["node", "database-api.js"]
