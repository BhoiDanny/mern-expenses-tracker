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

    res.status(201).json(category)
  }),
  //! Lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //! update
  update: asyncHandler(async (req, res) => {}),

  //! delete
  delete: asyncHandler(async (req, res) => {}),
};

module.exports = { categoryController };
