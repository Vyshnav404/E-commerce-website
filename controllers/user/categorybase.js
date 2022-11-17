
const uProduct = require('../../model/userProduct')

const loadCategory =(req,res)=>{
    let catname = req.query.catname
    console.log(catname);
    let userData = req.session.user
    uProduct.viewCatBase(catname).then((catProducts)=>{
        console.log(catProducts,"lllll");
        res.render("user/categorybase",{admin:false,user:true,userData,catProducts})
    })
   
}



module.exports={
    loadCategory
}