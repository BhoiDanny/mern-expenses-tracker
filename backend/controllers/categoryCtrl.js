const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

//! User Registration

const categoryController = {
  //! add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Please all fields are required");
    }
    //! convert the name to lowercase
    const normalizedName = name.toLowerCase();
    //! check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type");
    }
    //! check if the category already exists on the user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }
    //! create the category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type: type.toLowerCase(),
    });

    res.status(201).json(category);
  }),
  //! Lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //! update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { name, type } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    //! Update category properties
    category.name = normalizedName;
    category.type = type ? type.toLowerCase() : category.type;
    const updatedCategory = await category.save();
    //! Updated affected transactions
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: updatedCategory.name },
        }
      );
    }
    res.status(200).json(updatedCategory);
  }),

  //! delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      //! Update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: { category: defaultCategory },
        }
      );
      //! Remove category
      await Category.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({
          message: "Category deleted and transactions updated successfully",
        });
    } else {
      res
        .status(404)
        .json({ message: "Category not found or user not authorized" });
    }
  }),
};

module.exports = { categoryController };
