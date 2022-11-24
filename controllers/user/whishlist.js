const userCart = require('../../model/userCart')
const userWhishlist = require('../../model/whishlistModel')


const clickWhislist = async(req,res)=>{
    let userData = req.session.user
    let products = await userWhishlist.getWishListProducts(req.session.user._id)
    
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
    res.render('user/whishlist',{admin:false,user:true,cartCount,userData,products})
}

 const addToWhishlist = (req,res)=>{
    let productid = req.body.id
    console.log("jjjjjj",productid);
    userWhishlist.addWhishlist(productid,req.session.user._id).then(()=>{
        res.json({status:true})
    })
 }

module.exports={
    clickWhislist,
    addToWhishlist
}