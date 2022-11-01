

const adminlogin=(req,res)=>{
    res.render("admin/adminloginpage",{admin:false,user:false})
}

const adminLoginHome =(req,res)=>{
    res.render("admin/adminpage",{admin:true,user:false})
}



module.exports={
    adminlogin,
    adminLoginHome

}