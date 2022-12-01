const getCart = require('../../model/userCart')
const getOrder = require('../../model/admOrdermodel')

const showOrderPage = (req,res)=>{
    
    getOrder.showOrder().then((orderList)=>{
    
        res.render('admin/admorderList',{admin:true,user:false,title:'Order Control Panel',orderList})
    })
    
}

module.exports={
    showOrderPage
}