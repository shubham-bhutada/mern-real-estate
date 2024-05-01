const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//file import
const authRouter = require("./routes/auth.route.js");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware routes
app.use("/auth", authRouter);

//error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on the PORT 3000");
});
