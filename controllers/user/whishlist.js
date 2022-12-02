const userCart = require('../../model/userCart')
const userWhishlist = require('../../model/whishlistModel')


const clickWhislist = async(req,res)=>{
    let home=false;
    let userData = req.session.user
    let products = await userWhishlist.getWishListProducts(req.session.user._id)
    
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }

    let whishlistCount = null
    if(req.session.user){
        whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
      }

    res.render('user/whishlist',{admin:false,user:true,cartCount,userData,products,whishlistCount,home})
}

 const addToWhishlist = (req,res)=>{
    let productid = req.body.id
    userWhishlist.addWhishlist(productid,req.session.user._id).then(()=>{
        res.json({status:true})
    })
 }

 const deleteFromWish =(req,res)=>{
    let id = req.body.proId
    userid = req.session.user._id
    
    userWhishlist.deleteOneProduct(userid,id).then((response)=>{
        res.json(response)
    })
 }

module.exports={
    clickWhislist, 
    addToWhishlist,
    deleteFromWish
}