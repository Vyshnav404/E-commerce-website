const express = require('express')
const router = express.Router();
const getLogin = require('../controllers/user/login')



// for userlogin

router.get('/',getLogin.userLogin)
router.get('/signup',getLogin.userSignUp)
router.get('/signlogin',getLogin.userLogin)

module.exports = router;





