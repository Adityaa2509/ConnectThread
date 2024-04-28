const express = require('express')
const { registerHandler, loginHandler, logoutHandler } = require('../controllers/AuthController')
const router = express.Router()

router.post('/register',registerHandler)
router.post('/login',loginHandler)
router.post('/logout',logoutHandler)

module.exports = router;