const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { resolve } = require('path')

module.exports = {
    showUserOnchart:()=>{
        return new Promise(async(resolve,reject)=>{
           let countuser= await db.get().collection(collection.User_Details).find().count()
            resolve(countuser)
        })
    },

    showPlacedOnChart:()=>{
        return new Promise(async(resolve,reject)=>{
         let placedcount = await db.get().collection(collection.Order_List).find({status:"placed"}).count()
         resolve(placedcount)
        })
    },

    showShippedOnChart:()=>{
        return new Promise(async(resolve,reject)=>{
            let shippedcount = await db.get().collection(collection.Order_List).find({status:"shipped"}).count()
            resolve(shippedcount)
        })
    },

    showDeliveredOnChart:()=>{
        return new Promise(async(resolve,reject)=>{
            let deliveredcount = await db.get().collection(collection.Order_List).find({status:"delivered"}).count()
            resolve(deliveredcount)
        })
    },

    showCancelledOnChart:()=>{
        return new Promise(async(resolve,reject)=>{
            let cancelledcount = await db.get().collection(collection.Order_List).find({status:"cancelled"}).count()
            resolve(cancelledcount)
        })
    }

}