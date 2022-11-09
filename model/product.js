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


    addProduct:(imageId,proDetails)=>{
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
    }
}