const getUser = require('../../model/adminuser')

const showUser = (req,res)=>{
    getUser.displayUser().then((user)=>{
        res.render('admin/userlist',{admin:true,user:false,title:'User Control Page',user})
    })
}


const userBlock = (req,res)=>{
    getUser.blockUser(req.body.userId).then((response)=>{
        res.json({status:true})
    })
}


const userUnblock = (req,res)=>{
    getUser.unblockUser(req.body.userId).then((response)=>{
        res.json({status:true})
    })
}

module.exports ={
    showUser,
    userBlock,
    userUnblock
}