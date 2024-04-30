module.exports = {
  // using this line for list
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map(mongoose => mongoose.toObject());
  },
  // using this line for object
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
  }
}