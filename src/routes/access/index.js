'use strict'

const express = require('express')
const AccessController = require('../../controllers/AccessController')
const router = express.Router()

router.post('/shop/signup', AccessController.signUp)

module.exports = router