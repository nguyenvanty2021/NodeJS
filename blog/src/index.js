const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const port = 3000;
const morgan = require("morgan");
const routes = require("./routes/index");
app.use(express.static(path.join(__dirname, "public")));
// using middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
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
// Bước 1 -> file index.js trong folder routes là bước 2
// Routes init
routes(app);
// 127.0.0.1 - localhost
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
