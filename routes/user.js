const express = require('express')
const router = express.Router();
const getLogin = require('../controllers/user/login')
const getCart = require('../controllers/user/cart');
const { SessionChecker } = require('../middleware/sessionmiddleware');
const sessionChecker= require('../middleware/sessionmiddleware')
const getCategory = require('../controllers/user/categorybase')
const userProduct = require('../controllers/user/userProductview')
const getWhislist = require('../controllers/user/whishlist')
const getprofile = require('../controllers/user/profile')
const getCoupon = require('../controllers/user/usercoupon')



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
router.delete('/deletefromcart',sessionChecker.userSessionChecker,getCart.deleteFromCart)

// for whislist setting
router.get('/whislist',sessionChecker.userSessionChecker,getWhislist.clickWhislist)
router.post('/addtowhishlist',sessionChecker.userSessionChecker,getWhislist.addToWhishlist)
router.delete('/deletefromwishlist',sessionChecker.userSessionChecker,getWhislist.deleteFromWish)
  
// for userProduct single view
router.get('/viewProductDetailsPage',userProduct.showProductDetails)

// for place order
router.get('/place-order',sessionChecker.userSessionChecker,getCart.placeOrder)
router.post('/place-orderPay',sessionChecker.userSessionChecker,getCart.placeOrderPay)
router.get('/orderPlaced',sessionChecker.userSessionChecker,getCart.orderPlaced)
router.get('/orderList',sessionChecker.userSessionChecker,getCart.orderList)
router.get('/view-order-product',sessionChecker.userSessionChecker,getCart.viewOrderProducts)
router.post('/verify-payment',sessionChecker.userSessionChecker,getCart.verifyPayment)

// for profile
router.get('/profile',sessionChecker.userSessionChecker,getprofile.showProfile)
router.get('/edituprofile',sessionChecker.userSessionChecker,getprofile.editProfile)
router.post('/editprofile',sessionChecker.userSessionChecker,getprofile.changeProfile)

// for coupon
router.post('/applycoupon',sessionChecker.userSessionChecker,getCoupon.applytheCoupon)

// for userlogout
router.get('/userlogout',getLogin.userLogout)

module.exports = router;





