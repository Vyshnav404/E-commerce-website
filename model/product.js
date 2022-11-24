const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('express')

module.exports={
    
    showProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.Product_Details).find().toArray()
            resolve(product)
        })
    },

    showOneProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.Product_Details).findOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    },


    addProduct:(imageId,proDetails)=>{
        console.log(proDetails,"prooooo");
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.Product_Details).insertOne(imageId,proDetails).then((data)=>{
                resolve.apply(data)
            
            })
        })
    },


    dropProduct:(proId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.Product_Details).deleteOne({_id:ObjectId(proId)}).then((data)=>{
                resolve(data)
            })
        })
    },

    editInProduct:(id,editDetails,imagename)=>{
        console.log(id);
        console.log(imagename);
         return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.Product_Details).updateOne({_id:ObjectId(id)},{
                $set:{
                    picture:imagename,
                    productName:editDetails.productName,
                    actualPrice:parseInt(editDetails.actualPrice),
                    sellingPrice:parseInt(editDetails.sellingPrice),
                    categoryName:editDetails.categoryName,
                    brandName:editDetails.brandName,
                    quatityName:parseInt(editDetails.quantityName),
                    productDescription:editDetails.productDescription,
                    addToTrendingProduct:editDetails.addToTrendingProduct,
                    addToNewlyArrivedProduct:editDetails.addToNewlyArrivedProduct

                }
            }).then((data)=>{
            
                resolve(data)
                
            })
         })
    }
}