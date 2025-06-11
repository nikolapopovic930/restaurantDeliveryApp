const User = require("../models/userModel");
const baseController = require("./baseController");

exports.getAllUser = baseController.getAll(User, {
  path: "cart",
  match: { status: "active" },
  select: '_id'
});
exports.getUser = baseController.getOne(User, {
  path: "cart",
  match: { status: "active" },
  select: '_id'
});
exports.createUser = baseController.createOne(User);
exports.updateUser = baseController.updateOne(User);
exports.deleteUser = baseController.deleteOne(User);
