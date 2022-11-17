



const clickCart = (req,res)=>{
    let userData = req.session.user
    res.render('user/userCart',{admin:false,user:true,userData})
}

const addTocart = (req,res)=>{
    
}

module.exports= {
    clickCart
}