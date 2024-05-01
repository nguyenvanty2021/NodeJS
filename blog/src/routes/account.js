const express = require('express')
const router = express.Router()
const AccountModel = require('./../app/models/Account')

//// channel 2

router.get('/', async (req, res) => {
  try {
    const data = await AccountModel.find({}).collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json('Loi server')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const data = await AccountModel.findOne({
      username,
      password
    }).collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    if (data) res.status(200).json('Login thanh cong')
    else res.status(400).json('Username or password không chính xác')
  } catch (error) {
    res.status(500).json('Loi server')
  }
})

router.put('/change-password/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { password } = req.body
    const data = await AccountModel.findByIdAndUpdate(id, {
      password
    })
    if (data) {
      res.status(200).json('Update password thành cong')
    }
  } catch (error) {
    res.status(500).json('Loi server')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await AccountModel.findById(id).collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    if (data) {
      res.status(200).json(data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('Loi server')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params
    const data = await AccountModel.deleteOne({
      _id
    }).collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    if (data) {
      res.status(200).json('Delete account thanh cong')
    }
  } catch (error) {
    res.status(500).json('Loi server')
  }
})

router.post('/register', async (req, res) => {
  console.log(req.headers)
  const { username, password } = req.body
  const showError = () => res.status(500).json('Dang ky tài khoản thất bại!!!')
  try {
    const data = await AccountModel.findOne({
      username
    }).collation({
      locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
    })
    if (data) res.status(400).json('Username nay da duoc dang ky')
    else {
      AccountModel.create({
        username,
        password
      })
        .then(() => res.status(200).json('Dang ky tai khoan thanh cong'))
        .catch(() => showError())
    }
  } catch (error) {
    showError()
  }
})

module.exports = router