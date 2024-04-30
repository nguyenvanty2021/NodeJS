// controller dùng để return data
class NewsController {
  // [GET] /news
  index(req, res) {
    res.render("news");
  }
  // [GET] /news/:slug
  show(req, res) {
    res.send("news_detail");
  }
}
module.exports = new NewsController();
