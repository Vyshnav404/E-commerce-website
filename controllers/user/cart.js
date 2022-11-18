const userCart = require('../../model/userCart')


const clickCart = async(req,res)=>{
    let userData = req.session.user
    let products = await userCart.getCartProducts(req.session.user._id)
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
     

    console.log("fgsdgs",products[0]);
    res.render('user/userCart',{admin:false,user:true,userData,products,cartCount})
}

const addTocart = (req,res)=>{
    console.log(req.params.id);
   userCart.addCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
    // res.redirect("/")
   })
}


const changeProductQuantity = (req,res)=>{
    userCart.changeQuantity(req.body)
}

module.exports= {
    clickCart,
    addTocart,
    changeProductQuantity
}