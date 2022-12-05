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
        details.quantity=parseInt(details.quantity)

        return new Promise((resolve,reject)=>{
            if(details.count==-1 && details.quantity==1){
                db.get().collection(collection.User_Cart).
                updateOne({_id:ObjectId(details.cart)},
                {
                    $pull:{products:{item:ObjectId(details.product)}}
                }
                ).then((response)=>{
                    resolve({removeProduct:true})
                })
            }else{
                db.get().collection(collection.User_Cart).
                updateOne({_id:ObjectId(details.cart),'products.item':ObjectId(details.product)},
                {
                    $inc:{'products.$.quantity':details.count}
                }
                ).then((response)=>{
                    resolve({status:true})
                    
                })
            }
    })
            },

            getTotalAmount :(userId)=>{
                

                return new Promise(async(resolve,reject)=>{
                    let total = await db.get(). collection(collection.User_Cart).aggregate([
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
                        },

                        {
                            $group:{
                                _id:null,
                                total:{$sum:{$multiply:['$quantity','$product.sellingPrice']}}
                            }
                            
                        }
                         
        
                       
                    ]).toArray()
                    
                     total= total[0]?total[0].total:''
                    resolve(total) 
                    
                })
            },

    placeOrder:(order,products,total)=>{
        console.log("mmmmm",order);
            return new Promise((resolve,reject)=>{
        
                let status =order['payment-method']==='COD'?'placed':'pending'
                let orderObj ={
                    deliveryDetails:{
                        
                        // name:order.name,
                        // mobile:order.mobile,
                        address:order.option1,
                        // pincode:order.pincode
                    },
                    userId:ObjectId(order.userId),
                    paymentMethod:order['payment-method'],
                    products:products,
                    totalAmount:total,
                    status:status,
                    date:new Date()
                }

                db.get().collection(collection.Order_List).insertOne(orderObj).then((response)=>{
                   db.get().collection(collection.User_Cart).deleteOne({user:ObjectId(order.userId)})
                    resolve(response.insertedId)
                })
            })
    },

    cartProductList:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cart = await db.get().collection(collection.User_Cart).findOne({user:ObjectId(userId)})
            resolve(cart.products)
        })
    },


    getUserOrders :(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let orders = await db.get().collection(collection.Order_List).
            find({userId:ObjectId(userId)}).sort({date:-1}).toArray()
            resolve(orders)
        })
    },


    getOrderProducts :(orderId)=>{
        return new Promise(async(resolve,reject)=>{
            let orderItems = await db.get().collection(collection.Order_List).aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
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
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                }
            ]).toArray()

            resolve(orderItems)

            
        })
    },

    getOneProduct :(orderId)=>{
        
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
            console.log("length",oneProduct.length);
            resolve(oneProduct)
            
            
        })
    } ,

    deleteOneProduct:(userid,proId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.User_Cart).updateOne({user:ObjectId(userid)},
            {
                $pull:{products:{item:ObjectId(proId)}}
            }
            ).then((response)=>{
                console.log("response",response);
                resolve(response)
            })
        })
    }

} 