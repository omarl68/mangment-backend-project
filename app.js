const express = require("express");
const userRoute = require("./router/userRoute");
const bookRoute = require("./router/bookRoute");
const globleErrorHandler = require("./Controller/errorController");
const cors= require('cors')

const app = express();

const morgan = require("morgan");
const AppError = require("./utils/appError");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({"origin":'http://localhost:3001'}))

app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use(globleErrorHandler);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
