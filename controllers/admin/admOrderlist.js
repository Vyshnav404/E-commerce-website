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
        res.render('admin/viewFromOrderList',{admin:true,user:false,title:'Order Details',products,orderId})
    })
 
}

const statusUpdate = (req,res)=>{
    console.log("vijjjj",req.body.orderId);
    console.log('ooooooo',req.body.status);
    let status = req.body.status;
    let orderId = req.body.orderId;

    getOrder.orderStatusUpdate(orderId,status)

}

module.exports={
    showOrderPage,
    orderDetails,
    statusUpdate
}