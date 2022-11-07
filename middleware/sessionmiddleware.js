const adminSessionChecker = (req,res,next)=>{
if(req.session.admin){
    next()
}else{
    res.render("admin/adminloginpage",{admin:false,user:false})
}
}

module.exports={
    adminSessionChecker
}