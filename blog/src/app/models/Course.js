const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {
    type: String, default: '', maxLength: 255, match: /[a-z]/, require: true
  },
  description: {
    type: String, default: '', maxLength: 600
  },
  image: {
    type: String, default: ''
  },
  price: {
    type: Number, default: 1, min: 1, index: true
  },
  slug: {
    type: String, default: '', unique: true // mỗi course phải có slug khác nhau, nếu cố tình tạo slug giống nhau thì nó sẽ tự động generate ra 1 chuỗi random để cho các course không trùng slug
  }
  // createdAt: {
  //   type: Date, default: Date.now
  // },
  // updatedAt: {
  //   type: Date, default: Date.now
  // }
}, {
  timestamps: true
});
module.exports = mongoose.model('Course', Course);