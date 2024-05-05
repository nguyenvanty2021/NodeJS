const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const AccountModel = require('./../app/models/Account')

//// channel 2

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  try {
    let data = []
    if (page && limit) {
      const skipPage = (parseInt(page) - 1) * limit
      data = await AccountModel.find({})
        .skip(skipPage)
        .limit(limit)
        .collation({
          locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
        })
    } else {
      // nếu không truyền page thì get all
      data = await AccountModel.find({}).collation({
        locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
      })
    }
    AccountModel.countDocuments({}).then((total) => {
      res.status(200).json({
        data,
        total,
        totalPage: Math.ceil(total / limit)
      })
    })
  } catch (error) {
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
    console.log(data)
    if (data) {
      const token = jwt.sign({ // truyền vào jwt.sign là 1 object mới work jwt
        _id: data?._id
      }, 'abcdef') // 'abcdef' là secret key
      res.status(200).json({
        message: 'Login thanh cong',
        token
      })
    }
    else res.status(400).json('Username or password không chính xác')
  } catch (error) {
    console.log(error)
    res.status(500).json('Loi server')
  }
})

const checkAuth = (req, res, next) => {
  try {
    const { token } = req.headers
    const decodeTokenIsId = jwt.verify(token, 'abcdef') // vì data trước khi mã hóa server respon cho client chỉ có _id thôi
    AccountModel.findOne({
      _id: decodeTokenIsId
    })
      .collation({
        locale: 'en', strength: 2 // Collation locale 'en' cho tiếng Anh, strength: 2 để so sánh không phân biệt chữ hoa chữ thường
      })
      .then((data) => {
        // data là object user vừa login nhận được từ hàm findOne
        if (data) {
          req.data = data
          next()
        } else {
          res.status(500).json('Not permission')
        }

      })
      .catch((error) => {
        console.log(error)
        res.status(500).json('User không tồn tại!!!')
      })
  } catch (error) {
    res.json('Token expire or token invalid')
  }
}

const checkRole = (req, res, next) => {
  // lúc này cái req này có thể get dc object user login => do đoạn req.data = data trong middleware ở trên
  console.log(req)
  if (req?.data?._doc?.role === 'admin') {
    next()
  }
  else {
    res.status(400).json('Chỉ có role admin mới nhận được data task này')
  }
}

// call api private và chỉ có role user là "admin" mới nhận được data này
router.get('/private', checkAuth, checkRole, (req, res) => {
  res.status(200).json('co data roi ne')
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