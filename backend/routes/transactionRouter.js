const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const { transactionController } = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();
//!add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);
//! lists
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

module.exports = transactionRouter;
