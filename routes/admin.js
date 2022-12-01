const express = require('express')
const router = express.Router();
const adminset = require('../controllers/admin/admlogin')
const getCategory = require('../controllers/admin/admincategory')
const getProduct = require('../controllers/admin/admproduct')
const sessionChecker = require('../middleware/sessionmiddleware')
const getBrand = require('../controllers/admin/admbrand')
const getUser = require('../controllers/admin/adminusermodel')
const getBanner = require('../controllers/admin/admbanner')
const getCoupon = require('../controllers/admin/admcoupon')
const getOrder = require('../controllers/admin/admOrderlist')
const multer = require('multer')
const methodOverride = require('method-override')

// storage setting
const storage = multer.diskStorage({
    destination:'./Public/images',
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
})

// upload setting
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(
            file.mimetype == 'image/jpeg'||
            file.mimetype == 'image/jpg'||
            file.mimetype == 'image/png'||
            file.mimetype == 'image/gif'||
            file.mimetype == 'image/webp'
        ){
            cb(null, true)
        }else{
            cb(null, false);
            cb(new Error('Only jpeg,jpg,png and gif image allow'))
        }
    }
})


router.use(methodOverride('_method'));

// for admin login
router.get("/",sessionChecker.adminSessionChecker,adminset.adminlogin)
router.post('/login',adminset.adminLoginHome)


// for category
router.get('/category',sessionChecker.adminSessionChecker,getCategory.showCategory)
router.post('/addcategory',upload.single('categoryimg'),sessionChecker.adminSessionChecker,getCategory.addCategory)
router.delete('/deleteCategory',sessionChecker.adminSessionChecker,getCategory.deleteCategory)


// for product
router.get('/product',sessionChecker.adminSessionChecker,getProduct.showProduct)
router.get('/addproduct',sessionChecker.adminSessionChecker,getProduct.addProductPage)
router.post('/addproductdata',upload.single('productimage'),sessionChecker.adminSessionChecker,getProduct.addProduct)
router.delete('/deleteproduct',getProduct.deleteoneProduct)
router.put('/editdata/:id',upload.single('productimage'),sessionChecker.adminSessionChecker,getProduct.addEditproduct)
// router.put('/editdata',upload.single('productName'),sessionChecker.adminSessionChecker,getProduct.addEditproduct)

// for brand
router.get('/brand',sessionChecker.adminSessionChecker,getBrand.brandTable)
router.post('/addbrand',sessionChecker.adminSessionChecker,getBrand.addtoBrand)
router.delete('/deleteBrand',sessionChecker.adminSessionChecker,getBrand.deleteBrand)
router.get('/editproduct',sessionChecker.adminSessionChecker,getProduct.editProduct)


// for dashboard
router.get('/dashboard',sessionChecker.adminSessionChecker,adminset.viewDashboard)

// for user
router.get('/user',sessionChecker.adminSessionChecker,getUser.showUser)
router.post('/usermanagement/block',sessionChecker.adminSessionChecker,getUser.userBlock)
router.post('/usermanagement/unblock',sessionChecker.adminSessionChecker,getUser.userUnblock)


// for bannner
router.get('/banner',sessionChecker.adminSessionChecker,getBanner.showBanner)
router.post('/addbanner',upload.single('bannerimg'),sessionChecker.adminSessionChecker,getBanner.addBanner)
router.delete('/deletebanner',sessionChecker.adminSessionChecker,getBanner.deleteBanner)


// for coupon
router.get('/coupon',sessionChecker.adminSessionChecker,getCoupon.showCoupon)
router.post('/addcoupon',sessionChecker.adminSessionChecker,getCoupon.addCoupon)

// for orderlist
router.get('/orderList',sessionChecker.adminSessionChecker,getOrder.showOrderPage)


// for logout
router.get('/logout',adminset.adminLogout)


module.exports = router