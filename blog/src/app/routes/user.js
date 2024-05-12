const router = require('express').Router()
const user = require('./../controllers/user.js')

// CHANNEL 3

router.get('/', user.getUsers)

module.exports = router