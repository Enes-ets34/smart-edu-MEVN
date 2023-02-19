const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const socketio = require("socket.io");
const dotenv = require("dotenv");
const http = require("http");

const MongoStore = require("connect-mongo");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const pageRoutes = require("./routes/pageRoutes");
const courseRoutes = require("./routes/courseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config({ path: "./config/config.env" });

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});
const PORT = process.env.PORT || 3000;
//CONNECT DB
mongoose
  .connect(process.env.DBURL)
  // .connect('mongodb://mongo-alias:27017/smart-edu-test')
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error(err);
  });

global.userIN = null;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use(
  session({
    secret: "sessionB!tch",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DBURL,
    }),
  })
);
app.use("/", pageRoutes);
app.use("/courses", courseRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`APP RUNNING AT ${PORT}`);
  io.on("connection", (socket) => {
    console.log("HOPPAAAAAAAA");
    console.log(socket.id);
    //! Karşılama Mesajı Gönder...
    // io.in(roomID).emit()
 
    socket.on("NEW_COURSE_EVENT", (course) => {
      console.log("course :>> ", course);
      
      socket.broadcast.emit("NEW_COURSE_ADDED", course);
    });
  });
});
