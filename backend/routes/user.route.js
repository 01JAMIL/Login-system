const express = require('express')
const router = express.Router()
const { register, login, getMe } = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')
router.post('/register', register)
router.post('/login', login)
router.get('/me', userMiddleware, getMe)

module.exports = router 