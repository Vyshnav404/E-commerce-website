const userCart = require('../../model/userCart')
const userPay = require('../../model/payOrder')
const userWhishlist=require('../../model/whishlistModel')
const userProfile = require('../../model/profile')


const clickCart = async(req,res)=>{
    let home=false;
    let userData = req.session.user
    let products = await userCart.getCartProducts(req.session.user._id)
    let totalValue =0
    if(products.length>0){
         totalValue = await userCart.getTotalAmount(req.session.user._id)
    }
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }

      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
        }
     
     
    res.render('user/userCart',{admin:false,user:true,userData,products,cartCount,totalValue,whishlistCount,home})
}

const addTocart = (req,res)=>{

   userCart.addCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
    // res.redirect("/")
   })
}


const changeProductQuantity =(req,res)=>{

    userCart.changeQuantity(req.body).then(async(response)=>{
        
        response.total = await userCart.getTotalAmount(req.body.user)   
        res.json(response)
    })
}


const placeOrder = async(req,res)=>{
    let home =false;
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
      let whishlistCount = null
    if(req.session.user){
        whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
      }home

        let finalTotal = Math.round(req.query.finalTotal)

    //   let userDetails = await userProfile.showOneUser(userData._id)
    let addressList = await userProfile.showAddress(userData._id)
    let total = await userCart.getTotalAmount(req.session.user._id)
    if(addressList== null){
        res.redirect('/addAddress')
    }else{
        res.render('user/placeorder',{admin:false,user:true,cartCount,userData,total,whishlistCount,finalTotal,addressList,home})
    }
     
   
}

const showProceedToCheckoutPage = (req,res)=>{
    let finalTotal = req.query.FINALTOTAL
    res.json(finalTotal)
}




const placeOrderPay = async(req,res)=>{
    console.log("zzzzz",req.body);
    let totalAmount = req.query.finalTotal
    totalAmount = parseInt(totalAmount)
    let products = await userCart.cartProductList(req.body.userId)
    let totalPrice = await userCart.getTotalAmount(req.body.userId)
    userCart.placeOrder(req.body,products,totalAmount).then((orderId)=>{
        if(req.body['payment-method']==='COD'){
            res.json({codSuccess:true})
        }else{
            userPay.generateRazarpay(orderId,totalAmount).then((response)=>{
                res.json(response)
            })
        }
 
        
         
    })
}

const orderPlaced = async(req,res)=>{
    let home = false;
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }

      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
        }
    res.render('user/orderplaced',{admin:false,user:true,userData,cartCount,whishlistCount,home})
}


const orderList = async(req,res)=>{
    let home = false;
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
        }
      
    let totalValue = await userCart.getTotalAmount(req.session.user._id)
    let orders = await userCart.getUserOrders(req.session.user._id)
    res.render('user/vieworder',{userData,admin:false,user:true,totalValue,orders,cartCount,whishlistCount,home})
}


const viewOrderProducts = async(req,res)=>{
    let home = false;
    let userData = req.session.user
    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }
    
      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
        }
    
    let products = await userCart.getOrderProducts(req.query)
    let oneProduct = await userCart.getOneProduct(req.query.id)
    console.log("haaaa",oneProduct);
    res.render('user/viewOrderProducts',{admin:false,user:true,cartCount,userData,products,oneProduct,whishlistCount,home})

}

const verifyPayment=(req,res)=>{
    console.log(req.body);
    userPay.verifyDoPayment(req.body).then(()=>{
        userPay.changePaymentStatus(req.body.order.receipt).then(()=>{
            res.json({status:true})
        })
    }).catch((err)=>{
        res.json({status:false,errMsg:""})
    })
}

 const deleteFromCart= (req,res)=>{
    let id = req.body.proId
    userid = req.session.user._id

    userCart.deleteOneProduct(userid,id).then((response)=>{
        res.json(response)
    })
 }
 
module.exports= {
    clickCart,
    addTocart,
    changeProductQuantity,
    placeOrder,
    placeOrderPay,
    orderPlaced,
    orderList,
    viewOrderProducts,
    verifyPayment,
    deleteFromCart,
    showProceedToCheckoutPage
}