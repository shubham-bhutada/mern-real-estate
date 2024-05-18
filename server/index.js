const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

//file import
const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const listingRouter = require("./routes/listing.route.js");
const listRouter = require("./routes/list.route.js");

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const _dirname = path.resolve();

//middleware routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/list", listRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});
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
