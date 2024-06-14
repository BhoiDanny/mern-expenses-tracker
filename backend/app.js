const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const app = express();

//! Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-expenses")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

//! Middlewares
app.use(express.json());
//! Routes
app.use("/", userRouter);
//!Error
app.use(errorHandler)

//! Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
