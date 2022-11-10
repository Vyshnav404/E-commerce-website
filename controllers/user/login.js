

const userLogin = (req,res)=>{
    res.render('user/userlogin',{admin:false,user:false})
}

const userSignUp = (req,res)=>{
    res.render('user/usersignup',{admin:false,user:false})
}

module.exports={
    userLogin,
    userSignUp
}