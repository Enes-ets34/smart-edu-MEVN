const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const MongoStore = require("connect-mongo");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const pageRoutes = require("./routes/pageRoutes");
const courseRoutes = require("./routes/courseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 3000;

//CONNECT DB
mongoose
  .connect("mongodb+srv://enes:qPkstnzIshv71EPS@cluster0.h6tl66y.mongodb.net/smartedu-db?retryWrites=true&w=majority")
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
      mongoUrl: "mongodb+srv://enes:qPkstnzIshv71EPS@cluster0.h6tl66y.mongodb.net/smartedu-db?retryWrites=true&w=majority",
    }),
  })
);
app.use("/", pageRoutes);
app.use("/courses", courseRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Runnig at ${PORT}`);
});
