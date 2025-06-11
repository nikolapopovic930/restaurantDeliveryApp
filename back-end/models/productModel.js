const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product must have a description.'],
    trim: true,
  },
  imagePath: {
    type: String,
    required: [true, 'Product must have a representative picture.'],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product must have a category.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;