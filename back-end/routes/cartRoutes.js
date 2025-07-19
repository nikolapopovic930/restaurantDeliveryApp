const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.allowedFor("admin", "user"),
    cartController.getAllCart
  )
  .post(
    authController.protect,
    authController.allowedFor("user"),
    cartController.createCart
  );

router
  .route("/my-cart")
  .get(authController.protect, 
    cartController.getMyCart
  );

router
  .route("/:id")
  .get(cartController.getCart)
  .patch(
    authController.protect,
    authController.allowedFor("user"),
    cartController.updateCart
  )
  .delete(
    authController.protect,
    authController.allowedFor("admin"),
    cartController.deleteCart
  );

router
  .route("/add")
  .post(
    authController.protect,
    authController.allowedFor("user"),
    cartController.addToCart
  );

router
  .route("/remove")
  .post(
    authController.protect,
    authController.allowedFor("user"),
    cartController.removeFromCart
  );

router
  .route("/decrease")
  .post(
    authController.protect,
    authController.allowedFor("user"),
    cartController.decreaseFromCart
  );

router
  .route("/increase")
  .post(
    authController.protect,
    authController.allowedFor("user"),
    cartController.increaseFromCart
  );

module.exports = router;
