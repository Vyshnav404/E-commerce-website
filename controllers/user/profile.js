const userCart = require('../../model/userCart')
const userWhishlist = require('../../model/whishlistModel')
const getUser = require('../../model/profile')

const showProfile = async(req,res)=>{
    let userData = req.session.user
    

    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }

    let whishlistCount = null
    if(req.session.user){
        whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
      }

      getUser.showOneUser(userData._id).then((userDetails)=>{
        
        res.render('user/myprofile',{admin:false,user:true,cartCount,whishlistCount,userDetails,userData})
      })
   
}

const editProfile = async(req,res)=>{
  let userData = req.session.user
 

    let cartCount= null
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
      }

    let whishlistCount = null
    if(req.session.user){
        whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
      }

      getUser.showOneUser(userData._id).then((userDetails)=>{
        
        res.render('user/Editprofile',{admin:false,user:true,cartCount,userData,whishlistCount,userDetails})
      })
     
}

const changeProfile =async(req,res)=>{
  console.log('edit====',req.body);
  let userData = req.session.user
  let cartCount= null
  if(req.session.user){
      cartCount = await userCart.getCartCount(req.session.user._id)
    }

  let whishlistCount = null
  if(req.session.user){
      whishlistCount = await userWhishlist.getWishListCount(req.session.user._id)
    }

  await getUser.editOneProfile(req.body,userData._id).then(async()=>{
  
   await getUser.showOneUser(userData._id).then((userDetails)=>{
    
      res.render('user/myprofile',{admin:false,user:true,userData,cartCount,whishlistCount,userDetails})
    })
    
  })

    
}

module.exports={
    showProfile,
    editProfile,
    changeProfile
}