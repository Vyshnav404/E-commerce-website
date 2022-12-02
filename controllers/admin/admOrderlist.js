const getCart = require('../../model/userCart')
const getOrder = require('../../model/admOrdermodel')

const showOrderPage = (req,res)=>{
    
    getOrder.showOrder().then((orderList)=>{
    
        res.render('admin/admorderList',{admin:true,user:false,title:'Order Control Panel',orderList})
    })
    
}

const orderDetails = (req,res)=>{
    let orderId = req.query.id
     getOrder.orderProducts(orderId).then((products)=>{
        res.render('admin/viewFromOrderList',{admin:true,user:false,title:'Order Details',products})
    })
 
}

module.exports={
    showOrderPage,
    orderDetails
}