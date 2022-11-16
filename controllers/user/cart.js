



const clickCart = (req,res)=>{
    let userData = req.session.user
    res.render('user/userCart',{admin:false,user:true,userData})
}

module.exports= {
    clickCart
}