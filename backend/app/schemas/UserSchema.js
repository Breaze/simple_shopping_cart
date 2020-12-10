const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true, // note - this is a unqiue index - not a validation
  },
  phone: {
      type: String,
      default: ""
  },
  bill: {
      type: Number,
      default: 100000
  },
  password: String
});

const user = mongoose.model('users', userSchema);

module.exports = user;