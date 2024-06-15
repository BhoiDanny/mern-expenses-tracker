const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

//! User Registration

const transactionController = {
  //! add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Please all fields are required");
    }

    //! create the transaction
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),
  //! Lists
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    
    let filters = {
      user: req.user,
      date: startDate,
    };
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        //! no category filter needed when filtering all
      } else if (category === "Uncategorized") {
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }

    //const transactions = await Transaction.find(filters).sort({ date: -1 });
    const transactions = await Transaction.find();
    res.json(transactions);
  }),

  //! update
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if(transaction && transaction.user.toString() === req.user.toString()){
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;
      
      //update the transaction
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),

  //! delete
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if(transaction && transaction.user.toString() === req.user.toString()){
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({message: "Transaction deleted successfully"});
    }
  }),
};

module.exports = { transactionController };
