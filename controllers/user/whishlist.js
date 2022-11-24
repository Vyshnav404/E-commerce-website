const userCart = require('../../model/userCart')



const clickWhislist = async(req,res)=>{
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
    res.render('user/whishlist',{admin:false,user:true,cartCount,userData})
}

module.exports={
    clickWhislist
}