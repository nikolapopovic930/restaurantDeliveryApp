const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category must have a name.'],
    trim: true,
  },
  imagePath: {
    type: String,
    required: [true, 'Category must have a representative image.'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;