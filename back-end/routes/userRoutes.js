const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.allowedFor('admin'), userController.getAllUser)
  .post(authController.protect, authController.allowedFor('admin'), userController.createUser);

router
  .route('/:id')
  .get(authController.protect, authController.allowedFor('admin'), userController.getUser)
  .patch(authController.protect, authController.allowedFor('admin'), userController.updateUser)
  .delete(authController.protect, authController.allowedFor('admin'), userController.deleteUser);

router
  .route('/signup')
  .post(authController.signUp)

router
  .route('/login')
  .post(authController.login)

module.exports = router;