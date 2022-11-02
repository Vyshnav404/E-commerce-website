const adminget = require('../../model/adminlogin_helper')

const adminlogin=(req,res)=>{
    res.render("admin/adminloginpage",{admin:false,user:false})
}

const adminLoginHome =(req,res)=>{
     adminget.adminDologin(req.body).then((response)=>{
        if(response.status){
            res.render("admin/adminpage",{admin:true,user:false})
        }else{
            res.redirect('/admin')
        }
     })
  
}



module.exports={
    adminlogin,
    adminLoginHome

}