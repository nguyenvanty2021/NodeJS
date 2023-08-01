const newsRouter = require("./news");
const siteRouter = require("./site");
function routes(app) {
  //   app.get("/news", (req, res) => res.render("news"));
  app.use("/news", newsRouter);
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
