const {DB_URL, DB_OPTIONS} = require('./config');
const mongoose = require('mongoose');
mongoose.connect(DB_URL, DB_OPTIONS);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => {
  console.log(`MongoDB is running`); 
});

module.exports = {
    mongoose
}