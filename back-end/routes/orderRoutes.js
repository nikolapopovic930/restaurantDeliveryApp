const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');


const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.allowedFor('admin', 'user'), orderController.getAllOrder)
  .post(authController.protect, authController.allowedFor('user'), orderController.createOrder);

router
  .route('/:id')
  .get(authController.protect, authController.allowedFor('admin', 'user'), orderController.getOrder)
  .patch(authController.protect, authController.allowedFor('admin'), orderController.updateOrder)
  .delete(authController.protect, authController.allowedFor('admin'), orderController.deleteOrder);

router
  .route('/status/:id')
  .patch(authController.protect, authController.allowedFor('admin'), orderController.updateOrderStatus)

router
  .route('/placeOrder')
  .post(authController.protect, authController.allowedFor('user'), orderController.placeOrder)

module.exports = router;