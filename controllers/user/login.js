
const userlog = require('../../model/userlogin')
const nodemailer = require('nodemailer')
const userProductView = require('../../model/userProduct');
const categoryView = require('../../model/category')
const { Product_Details } = require('../../config/collection');
const viewCart = require('../../model/userCart')
const userwhishlist = require('../../model/whishlistModel')
const carousal = require('../../model/banner')
require('dotenv').config()


// OTP setting

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

// OTP end


const firstClick = async (req,res)=>{
  let userData=req.session.user
  let home=true;

    let cartCount=null

      if(req.session.user){
        cartCount = await viewCart.getCartCount(req.session.user._id)
      }
     
      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userwhishlist.getWishListCount(req.session.user._id)
        }

    userProductView.displayProduct().then((productDetails)=>{
    categoryView.showCategory().then((category)=>{
      carousal.showBanner().then((banner)=>{
        res.render('user/userhomepage',{admin:false,user:true,productDetails,category,userData,cartCount,whishlistCount,banner,home})
      })
       
    })
    })
   
}

const userLogin = (req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
}else{
  res.render('user/userlogin',{admin:false,user:false,"LoginErr":req.session.loginErr})
  req.session.loginErr =false
} 
    
}


const userSignUp = (req,res)=>{
    res.render('user/usersignup',{admin:false,user:false})
}

const userRegister =(req,res)=>{

    let verified = 0;
    let state = 'active'
  const { Username, Email, Password } = req.body;
  let mailDetails = {
    from: process.env.EMAIL,
    to:Email,
    subject: "Eproject",
    html: `<p>YOUR OTP FOR REGISTERING IN woodQ IS ${OTP}</p>`,
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });

    userlog.doSignUp(req.body,verified,state).then((response)=>{
      
        userId = response.insertedId

        res.render('user/otpform',{admin:false,user:false})
    })
    
}


const otpverification = async (req,res) => {

  let home =true;

  let cartCount= null
    if(req.session.user){
        cartCount = await viewCart.getCartCount(req.session.user._id)
      }

      let whishlistCount = null
      if(req.session.user){
          whishlistCount = await userwhishlist.getWishListCount(req.session.user._id)
        }
    console.log("otp send is ",OTP);
    console.log("otp recieved is ",req.body.otp);
  
    if(OTP == req.body.otp)
    {
        req.session.loggedIn= true
        userlog.userVerified(userId).then((response)=>{
            userProductView.displayProduct().then((productDetails)=>{
                categoryView.showCategory().then((category)=>{
                  carousal.showBanner().then((banner)=>{
                    req.session.user = response.user
                    let userData = req.session.user
                    res.render("user/userhomepage",{admin:false,user:true,productDetails,category,userData,cartCount,banner,whishlistCount,home});
                  })
                   
                })
            })
        })
      
    }else{
      console.log("otp not matching ");
    }
  }



const loginAction= (req,res)=>{
    userlog.userDoLogin(req.body).then((response)=>{
        if(response.status){
          req.session.loggedIn=true
          req.session.user=response.user
            res.redirect('/')
        }  else{
          req.session.loginErr = "Invalid username or password"
            res.redirect('/tologin')
        }    
    })
}


const userLogout = (req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log('error');
        }else{
            res.redirect('/')
        }
    })
}

module.exports={
    firstClick,
    userLogin,
    userSignUp,
    userRegister,
    loginAction, 
    otpverification,
    userLogout
}