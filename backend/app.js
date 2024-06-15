const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const transactionRouter = require("./routes/transactionRouter");
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
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//!Error
app.use(errorHandler)

//! Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
