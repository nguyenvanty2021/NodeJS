const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {
    type: String, default: '', maxLength: 255, match: /[a-z]/
  },
  description: {
    type: String, default: '', maxLength: 600
  },
  image: {
    type: String, default: '', maxLength: 255
  },
  price: {
    type: Number, default: 1, min: 1, index: true
  },
  createdAt: {
    type: Date, default: Date.now
  },
  updatedAt: {
    type: Date, default: Date.now
  }
});
module.exports = mongoose.model('Course', Course);