const Course = require('./../models/Course.js')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose.js')

// controller dùng để return data
class CourseController {
  // [GET] /course
  async index(req, res, next) {
    try {
      // vì find({}) không có điều kiện nào trong object {} nên nó get all
      let courses = await Course.find({});
      // để test data thì dùng: res.json(courses)
      res.render("course/list", {
        courses: multipleMongooseToObject(courses)
      });
    } catch (error) {
      next(error)
      // res.status(500).json({
      //   error
      // })
    }
  }
  // [GET] /course/:slug
  detail(req, res, next) {
    console.log('res: ', req?.params?.slug)
    Course.findOne({
      slug: req?.params?.slug // tìm theo key slug trong db nên key chỗ này là "slug"
    }).then((course) => {
      // để test data thì dùng: res.json(course)
      res.render('course/detail', {
        course: mongooseToObject(course)
      })
    }).catch((e) => next(e))
  }
  create(req, res, next) {
    const addNewCourse = new Course({
      name: 'khoa hoc D',
      description: 'mo ta khoa hoc D',
      // slug: 'reactjs',
      image: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/339503401_756612709526273_8690256131094050565_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xe_ZxK67V5EAb6DgfrC&_nc_oc=AdhPLVcdNklelEqc_xWKvFHWBdAMgb1yJOy2ZFdSSGwzn4OWr9MBYkrA4BI4DzU6jP8&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfCgkX6W7ML8e7offwEQu-BvFX8JFafucqgg6tZdciLejw&oe=662993B6',
      price: 12,
      slug: 'abcd'
    })
    addNewCourse.save().then((e) => {
      console.log(e)
    }).catch((error) => {
      console.log('error: ', error)
    });
    res.send("create");
  }
}
module.exports = new CourseController();
