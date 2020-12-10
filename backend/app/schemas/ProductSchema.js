const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  unitaryPrice: Number,
  imgUrl: String,
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "sellers"
  }
});

const product = mongoose.model('products', productSchema);

module.exports = product;