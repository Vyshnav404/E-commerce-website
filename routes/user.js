const express = require('express')
const router = express.Router();
const getLogin = require('../controllers/user/login')
const getCart = require('../controllers/user/cart');
const { SessionChecker } = require('../middleware/sessionmiddleware');
const sessionChecker= require('../middleware/sessionmiddleware')
const getCategory = require('../controllers/user/categorybase')
const userProduct = require('../controllers/user/userProductview')



// for userlogin and signup control

router.get('/',getLogin.firstClick)
router.get('/tologin',getLogin.userLogin)
router.get('/signup',getLogin.userSignUp)
router.get('/signlogin',getLogin.userLogin)
router.post('/signupdb',getLogin.userRegister)
router.post('/loginaction',getLogin.loginAction)
router.post('/otpverify',getLogin.otpverification)

// for categorybase
router.get('/categorybase',getCategory.loadCategory)

// for cart setting
router.get('/cart',sessionChecker.userSessionChecker,getCart.clickCart)
router.get('/add-to-cart/:id',getCart.addTocart)
router.post('/change-product-quantity',getCart.changeProductQuantity)

  
// for userProduct single view
router.get('/viewProductDetailsPage',userProduct.showProductDetails)

// for userlogout
router.get('/userlogout',getLogin.userLogout)

module.exports = router;





