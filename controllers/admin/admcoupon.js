const displayCoupon = require('../../model/coupon')


const showCoupon = (req,res)=>{
    displayCoupon.showCoupon().then((coupon)=>{
        res.render('admin/coupon',{admin:true,user:false,title:'Coupon Control Page',coupon})
    })
    
}

const addCoupon = (req,res)=>{

    displayCoupon.addCoupon(req.body).then((response)=>{
        res.redirect('/admin/coupon')
    })
}

module.exports={
    showCoupon,
    addCoupon
}