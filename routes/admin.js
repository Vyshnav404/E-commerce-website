const express = require('express')
const router = express.Router();
const adminset = require('../controllers/admin/admlogin')

router.get("/",adminset.adminlogin)
router.post('/login',adminset.adminLoginHome)
// router.get('/home',adminset.adminHome)


module.exports = router;