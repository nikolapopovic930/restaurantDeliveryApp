const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(authController.protect, authController.allowedFor('admin'), categoryController.createCategory);

router
  .route('/products')
  .get(categoryController.getAllCategoryWithProducts);


router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(authController.protect, authController.allowedFor('admin'), categoryController.updateCategory)
  .delete(authController.protect, authController.allowedFor('admin'), categoryController.deleteCategory);

module.exports = router;