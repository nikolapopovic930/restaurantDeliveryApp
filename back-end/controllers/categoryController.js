const Category = require('../models/categoryModel');
const baseController = require('./baseController');

exports.getAllCategory = baseController.getAll(Category);
exports.getCategory = baseController.getOne(Category);
exports.createCategory = baseController.createOne(Category);
exports.updateCategory = baseController.updateOne(Category);
exports.deleteCategory = baseController.deleteOne(Category);