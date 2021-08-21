const express = require('express')
const router = express.Router()
const Users = require('../controllers/users')

router.post('/signup', Users.signUpUser)

router.post('/signin', Users.signInUser)

module.exports = router
