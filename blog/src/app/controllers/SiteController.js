const Course = require('./../models/Course.js')
const { multipleMongooseToObject } = require('../../util/mongoose.js')

class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      // vì find({}) không có điều kiện nào trong object {} nên nó get all
      let courses = await Course.find({});
      // res.json(courses)
      res.render("home", {
        courses: multipleMongooseToObject(courses)
      });
    } catch (error) {
      next(error)
      // res.status(500).json({
      //   error
      // })
    }
  }
  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
