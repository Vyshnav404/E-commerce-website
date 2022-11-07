const express = require('express')
const router = express.Router();

const adminset = require('../controllers/admin/admlogin')
const getCategory = require('../controllers/admin/admincategory')
const adminSessionChecker = require('../middleware/sessionmiddleware')

router.get("/",adminSessionChecker.adminSessionChecker,adminset.adminlogin)
router.post('/login',adminset.adminLoginHome)


// for category
router.get('/category',adminSessionChecker.adminSessionChecker,getCategory.showCategory)
router.post('/addcategory',adminSessionChecker.adminSessionChecker,getCategory.addCategory)

// for logout
router.get('/logout',adminset.adminLogout)

module.exports = router;