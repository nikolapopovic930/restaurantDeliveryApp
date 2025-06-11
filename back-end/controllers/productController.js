const Product = require('../models/productModel');
const baseController = require('./baseController');
const Category = require('../models/categoryModel');

const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, '');

const filterByCategory = async (req) => {
  if (!req.query.category) return {};

  const normalizedInput = normalize(req.query.category);
  const categories = await Category.find();

  const matchedCategory = categories.find(
    (cat) => normalize(cat.name) === normalizedInput
  );

  if (!matchedCategory) {
    const error = new Error(`Category "${req.query.category}" not found`);
    error.statusCode = 404;
    throw error;
  }

  return { category: matchedCategory._id };
};

exports.getAllProducts = baseController.getAll(
  Product,
  { path: 'category', select: '-__v' },
  filterByCategory
);

exports.getProduct = baseController.getOne(Product);
exports.createProduct = baseController.createOne(Product);
exports.updateProduct = baseController.updateOne(Product);
exports.deleteProduct = baseController.deleteOne(Product);




