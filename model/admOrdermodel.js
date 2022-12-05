const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports={
    showOrder:()=>{
        return new Promise((resolve,reject)=>{
            let orderList = db.get().collection(collection.Order_List).find().sort({date:-1}).toArray()
            resolve(orderList)
         })
    },

    orderProducts:(orderId)=>{
        return new Promise(async(resolve,reject)=>{
            let oneProduct = await db.get().collection(collection.Order_List).aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $lookup:{
                        from:collection.Product_Details,
                        localField:'products.item',
                        foreignField:'_id',
                        as:'orderproducts'
                    }
                },
                {
                    $project:{
                        orderproducts:1
                    }
                }
            ]).toArray()
            
            resolve(oneProduct)
            
            
        })
    },

    orderStatusUpdate:(orderId,status)=>{
        
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.Order_List).updateOne({_id:ObjectId(orderId)},
            {
                $set:{
                    status:status
                }
            }
            ).then((response)=>{
                console.log(response);
                resolve()
            })
        })
    }


}