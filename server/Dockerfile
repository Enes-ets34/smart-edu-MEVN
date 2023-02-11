FROM node:16-bullseye
WORKDIR /opt/server
COPY . .
ENV DBURL=mongodb://localhost/smart-edu-test
RUN npm install
CMD ["node","app.js"]
