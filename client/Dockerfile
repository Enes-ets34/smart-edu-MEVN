FROM node:14-slim
WORKDIR /client
COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm","run","serve"]