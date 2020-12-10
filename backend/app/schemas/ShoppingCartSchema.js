const mongoose = require('mongoose');
const shoppingCartSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  id_product: {
    type: mongoose.Types.ObjectId,
    ref: "products"
  },
  amount: String,
});

const user = mongoose.model('shopping_cart', shoppingCartSchema);

module.exports = user;