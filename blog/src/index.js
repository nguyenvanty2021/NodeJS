const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const routes = require("./routes/index");
const db = require("./config/db");
const routerAccount = require('./routes/account.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const initRoutes = require('./app/routes')
require('dotenv').config()

// allow cors

// CHANNEL 3

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // chỉ cho các api từ client gửi lên server có methods là GET mới connect được vào server
}))

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
// })


//// channel 2

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

// for web
app.use('/api/v1/account/', routerAccount)
// for admin
app.use('/admin/api/v1/account/', routerAccount)

//// channel 1

// Connect to db
db.connect();

// dùng dòng này để có thể truy cập được img trong folder public
app.use(express.static(path.join(__dirname, "public")));

// using middleware cho chức năng nhận data từ form submit lên server
app.use(
  express.urlencoded({
    extended: true,
  }) // dùng để nhận data cho form html hay nói cách khác là nhận data từ client gửi lên server là dạng: object or array
);
app.use(express.json()); // dùng để nhận data cho: XMLHttpRequest, fetch, axios hay nói cách khác là nhận data từ client gửi lên server là dạng: text or json

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
app.set("views", path.join(__dirname, 'resources', 'views'));

console.log("-----");
console.log(__dirname);

// Bước 1 -> file index.js trong folder routes là bước 2
// Routes init
// channel 1
// routes(app);
// CHANNEL 3
initRoutes(app)
// 127.0.0.1 - localhost
app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
