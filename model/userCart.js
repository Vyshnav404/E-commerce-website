const db = require('../config/connection')
const collection = require('../config/collection')
const { resolve } = require('path')
const { ObjectId } = require('mongodb')


module.exports={
    addCart :(proId,userId)=>{
            let proObj ={
                item:ObjectId(proId),
                quantity:1
            }
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.User_Cart).findOne({user:ObjectId(userId)})
            if(userCart){
                let proExist = userCart.products.findIndex(product=>product.item==proId)
                    
                console.log(proExist);

                if(proExist!=-1){
                    db.get().collection(collection.User_Cart).
                    updateOne({user:ObjectId(userId),'products.item':ObjectId(proId)},
                    {
                        $inc:{'products.$.quantity':1 }
                    }
                    ).then(()=>{
                        resolve()
                    })
                }else{

                

                db.get().collection(collection.User_Cart).updateOne({user:ObjectId(userId)},
                {
                    
                        $push:{products:proObj}
            
                }
                ).then((response)=>{
                    resolve()
                })
                }
            }else {
                let cartObj = {
                    user:ObjectId(userId),
                    products:[proObj]
                }
                db.get().collection(collection.User_Cart).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },

     getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems = await db.get(). collection(collection.User_Cart).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.Product_Details,
                        localField:'item',
                        foreignField:'_id',
                        as:'products'
                    }
                },
                {
                  $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$products',0]}
                  }  
                }

               
            ]).toArray()
         
            resolve(cartItems) 
            
        })
    },


    getCartCount:(userId)=>{
        let count = 0
        return new Promise(async(resolve,reject)=>{
            let cart = await db.get().collection(collection.User_Cart).findOne({user:ObjectId(userId)})
            if(cart){
                count = cart.products.length
            }
            resolve(count)
        })
    },

    changeQuantity:(details)=>{
        details.count = parseInt(details.count)
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.User_Cart).
                    updateOne({_id:ObjectId(details.cart),'products.item':ObjectId(details.product)},
                    {
                        $inc:{'products.$.quantity':details.count}
                    }
                    ).then(()=>{
                        resolve()
                    })
        })
    }

}