const getUser = require('../../model/adminuser')

const showUser = (req,res)=>{
    getUser.displayUser().then((user)=>{
        res.render('admin/userlist',{admin:true,user:false,title:'User Control Page',user})
    })
}

module.exports ={
    showUser
}