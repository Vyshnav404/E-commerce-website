const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports={
    addWhishlist :(proId,userId)=>{
        let proObj ={
            item:ObjectId(proId),
            quantity:1
        }
    return new Promise(async(resolve,reject)=>{
        let userwhishlist = await db.get().collection(collection.Whish_List).findOne({user:ObjectId(userId)})
        if(userwhishlist){
            let proExist = userwhishlist.products.findIndex(product=>product.item==proId)
                

            if(proExist!=-1){
                db.get().collection(collection.Whish_List).
                updateOne({user:ObjectId(userId),'products.item':ObjectId(proId)},
                {
                    $inc:{'products.$.quantity':1 }
                }
                ).then(()=>{
                    resolve()
                })
            }else{

            

            db.get().collection(collection.Whish_List).updateOne({user:ObjectId(userId)},
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
            db.get().collection(collection.Whish_List).insertOne(cartObj).then((response)=>{
                resolve()
            })
        }
    })
},

getWishListProducts:(userId)=>{
    return new Promise(async(resolve,reject)=>{
        
        let wishItems = await db.get(). collection(collection.Whish_List).aggregate([
            {
                $match:{user:ObjectId(userId)}
            },
            {
                $unwind:'$products'
            },
            {
                $project:{
                    item:'$products.item',
                    quantity:'$products.quantity',
                    
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
                    item:1,
                    quantity:1,
                    product:{$arrayElemAt:['$products',0]}
              }  
            }

           
        ]).toArray()
      
        resolve(wishItems) 
        
    })
},

getWishListCount:(userId)=>{
    let count = 0
    return new Promise(async(resolve,reject)=>{
        let wishList = await db.get().collection(collection.Whish_List).findOne({user:ObjectId(userId)})
        if(wishList){
            count = wishList.products.length
        }
        resolve(count)
    })
},

deleteOneProduct:(userid,proId)=>{
    
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collection.Whish_List).updateOne({user:ObjectId(userid)},
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