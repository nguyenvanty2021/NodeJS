const express = require('express')
const router = express.Router()
const AccountModel = require('./app/models/Account')

//// channel 2

router.get('/', (req, res) => {
  res.json('router user GET')
})
router.get('/product', (req, res) => {
  res.json('router product')
})
router.get('/product/:id', (req, res) => {
  res.json('router product detail: ' + req.params.id)
})
router.get('/cart', (req, res) => {
  res.json('router cart')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  AccountModel.findOne({
    username,
    password
  })
    .collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    .then(data => {
      console.log(data)
      if (data) {
        res.status(200).json('Login thanh cong')
      } else {
        res.status(400).json('Username or password không chính xác')
      }
    })
    .catch(error => {
      res.status(500).json('Loi server')
    })
})

router.post('/register', (req, res) => {
  console.log(req.headers)
  const { username, password } = req.body
  console.log(username, password)

  AccountModel.create({
    username,
    password
  }).then(() => res.json('Tạo tài khoản thành công!!!'))
    .catch(() => res.status(500).json('Tạo tài khoản thất bại!!!'))
})
router.put('/', (req, res) => {
  res.json('router user PUT')
})
router.delete('/', (req, res) => {
  res.json('router user DELETE')
})

module.exports = router