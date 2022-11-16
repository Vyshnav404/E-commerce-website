const express = require('express')
const router = express.Router();
const getLogin = require('../controllers/user/login')
const getCart = require('../controllers/user/cart');
const { SessionChecker } = require('../middleware/sessionmiddleware');
const sessionChecker= require('../middleware/sessionmiddleware')



// for userlogin and signup control

router.get('/',getLogin.firstClick)
router.get('/tologin',getLogin.userLogin)
router.get('/signup',getLogin.userSignUp)
router.get('/signlogin',getLogin.userLogin)
router.post('/signupdb',getLogin.userRegister)
router.post('/loginaction',getLogin.loginAction)
router.post('/otpverify',getLogin.otpverification)


// for cart setting
router.get('/cart',sessionChecker.userSessionChecker,getCart.clickCart)

// for userlogout
router.get('/userlogout',getLogin.userLogout)

module.exports = router;





