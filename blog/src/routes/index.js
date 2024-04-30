const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require('./course');
function routes(app) {
  //   app.get("/news", (req, res) => res.render("news"));
  app.use("/news", newsRouter);
  app.use('/course', courseRouter);
  app.use("/", siteRouter);
  //   app.get("/search", (req, res) => {
  //     console.log(req?.query?.q);
  //     return res.render("search");
  //   });
  //   app.post("/search", (req, res) => {
  //     console.log(req?.body);
  //     res.send("");
  //   });
}
module.exports = routes;
