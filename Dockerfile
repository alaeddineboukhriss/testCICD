FROM node:latest
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx:alpine
COPY  ./ /usr/share/nginx/html
EXPOSE 80
