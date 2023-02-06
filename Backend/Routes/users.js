const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

//REgister new user
router.post('/signup', userController.signupUser )

//Login
router.post('/login',userController.loginUser)


module.exports = router