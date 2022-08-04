FROM node:latest
WORKDIR /app
COPY . .
RUN npm install --force
RUN ng build --prod

FROM nginx:alpine
COPY  ./dist/Front /usr/share/nginx/html
EXPOSE 80