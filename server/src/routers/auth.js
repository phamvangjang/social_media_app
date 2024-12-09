const express = require('express')
const router = express.Router()
const ctrls = require('../controllers/auth')

router.post('/register', ctrls.register)
router.put('/finalregister', ctrls.finalRegister)
router.put('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.post('/login', ctrls.login)  

module.exports = router