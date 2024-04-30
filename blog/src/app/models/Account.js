const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { // tạo 1 db trong mongodb tên là: "my_database"
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collation: 'account' // tạo một table tên là: "account"
})

const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel