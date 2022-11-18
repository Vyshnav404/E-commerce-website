
const uProduct = require('../../model/userProduct')
const userCart = require('../../model/userCart') 

const loadCategory =async(req,res)=>{
    let catname = req.query.catname
    
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
    uProduct.viewCatBase(catname).then((catProducts)=>{
        
        
        res.render("user/categorybase",{admin:false,user:true,userData,catProducts,cartCount})
    })
   
}



module.exports={
    loadCategory
}