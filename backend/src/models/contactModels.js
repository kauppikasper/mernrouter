const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  twitter: String,
  message: String
});

module.exports = mongoose.model('router', contactSchema);
