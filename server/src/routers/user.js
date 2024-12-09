const express = require('express')
const router = express.Router()
const ctrls = require('../controllers/user')

router.get('/getCurrent', ctrls.getCurrent);
router.post('/createNewUser', ctrls.createUser);
router.put('/follow', ctrls.follow);
router.get('/statusFollow', ctrls.statusFollow);

module.exports = router