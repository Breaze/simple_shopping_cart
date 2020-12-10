const mongoose = require('mongoose');
const purchasedProductsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  products: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: "products"
    },
    amount: Number,
    unitaryPrice: Number,
    totalPrice: Number
  }],
  totalPrice: Number,
  date: String
});

const product_purchased = mongoose.model('purchased_products', purchasedProductsSchema);

module.exports = product_purchased;