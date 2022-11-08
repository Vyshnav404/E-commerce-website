const express = require('express')
const router = express.Router();
const adminset = require('../controllers/admin/admlogin')
const getCategory = require('../controllers/admin/admincategory')
const getProduct = require('../controllers/admin/admproduct')
const sessionChecker = require('../middleware/sessionmiddleware')
const getBrand = require('../controllers/admin/admbrand')


// for admin login
router.get("/",sessionChecker.adminSessionChecker,adminset.adminlogin)
router.post('/login',adminset.adminLoginHome)


// for category
router.get('/category',sessionChecker.adminSessionChecker,getCategory.showCategory)
router.post('/addcategory',sessionChecker.adminSessionChecker,getCategory.addCategory)
router.delete('/deleteCategory',sessionChecker.adminSessionChecker,getCategory.deleteCategory)


// for product
router.get('/product',sessionChecker.adminSessionChecker,getProduct.showProduct)
router.get('/addproduct',sessionChecker.adminSessionChecker,getProduct.addProductPage)


// for brand
router.get('/brand',sessionChecker.adminSessionChecker,getBrand.brandTable)
router.post('/addbrand',sessionChecker.adminSessionChecker,getBrand.addtoBrand)
router.delete('/deleteBrand',sessionChecker.adminSessionChecker,getBrand.deleteBrand)

// for logout
router.get('/logout',adminset.adminLogout)


module.exports = router;