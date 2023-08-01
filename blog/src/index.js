const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const port = 3000;
const morgan = require("morgan");
const routes = require("./routes/index");
const db = require("./config/db");

// Connect to db
db.connect();

// dùng dòng này để có thể truy cập được img trong folder public
app.use(express.static(path.join(__dirname, "public")));

// using middleware cho chức năng nhận data từ form submit lên server
app.use(
  express.urlencoded({
    extended: true,
  }) // dùng để nhận data cho form html
);
app.use(express.json()); // dùng để nhận data cho: XMLHttpRequest, fetch, axios

// http logger: để check xem request đã được gửi lên server chưa
app.use(morgan("combined"));

// template engine
// hbs = handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs", // thay vì mỗi lần dùng phải khai báo "handlebars" thì custom extname kiểu này chỉ cần khai báo "hbs" là được không cần phải khai báo "handlebars" nữa
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/resources/views");

console.log("-----");
console.log(__dirname);

// Bước 1 -> file index.js trong folder routes là bước 2
// Routes init
routes(app);
// 127.0.0.1 - localhost
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
