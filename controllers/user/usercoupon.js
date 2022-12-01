const getCoupon = require('../../model/coupon')
const getCart = require('../../model/userCart')

const applytheCoupon = async(req,res)=>{
   let data = req.body

   let userData = req.session.user
   let couponDetails = await getCoupon.checkCoupon(data)
   let total = await getCart.getTotalAmount(userData._id)

   await getCoupon.applyCoupon(couponDetails,total).then((response)=>{
    
    res.json(response)
   })
  
}

module.exports={
    applytheCoupon
}