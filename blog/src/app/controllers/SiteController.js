const Course = require('./../models/Course.js')

class SiteController {
  // [GET] /
  async index(req, res) {
    // res.render("home");
    try {
      // vì find({}) không có điều kiện nào trong object {} nên nó get all
      const courses = await Course.find({});
      res.json(courses)
    } catch (error) {
      res.status(500).json({
        error
      })
      // res.status(500).json({
      //   error: 'ERROR!!!'
      // })
    }
    // Course.find({}, (err, courses) => {
    //   if (!err) res.json(courses)
    //   // error exists thì thông báo lỗi 500 kèm message 'ERROR!!!'
    //   res.status(500).json({
    //     error: 'ERROR!!!'
    //   })
    // })
  }
  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
