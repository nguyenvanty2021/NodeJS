const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const port = 3000;
const morgan = require("morgan");
app.use(express.static(path.join(__dirname, "public")));
// http logger
app.use(morgan("combined"));
// template engine
// hbs = handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/resources/views");
console.log("-----");
console.log(__dirname);
app.get(
  "/",
  (req, res) => res.render("home")
  //   res.send(`
  //   <h1 style="color: red" >Trang chủ</h1>
  // `)
);
app.get("/news", (req, res) => res.render("news"));
app.get("/search", (req, res) => {
  console.log(req?.query?.q);
  return res.render("search");
});
// 127.0.0.1 - localhost
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
