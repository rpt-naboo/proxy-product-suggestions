FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
ENV NODE_ENV production
ENV DB_NAME naboo_dev 
CMD [ "node", "server/app.js" ]