const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
  businessName: String,
  email: {
    type: String,
    unique: true, // note - this is a unqiue index - not a validation
  },
  nit: {
    type: String,
    unique: true, // note - this is a unqiue index - not a validation
  },
  phone: {
      type: String,
      default: ""
  }
});

const seller = mongoose.model('sellers', sellerSchema);

module.exports = seller;