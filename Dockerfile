FROM node:22-alpine3.19
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 8000 
CMD [ "npm", "start" ]
