FROM node:16-bullseye
WORKDIR /opt/server
COPY . .
EXPOSE 4000
ENV DBURL=mongodb+srv://<name>:<password>@cluster0.h6tl66y.mongodb.net/<dbname>?retryWrites=true&w=majority
RUN npm install
CMD ["node","app.js"]
