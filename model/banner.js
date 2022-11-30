const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')


module.exports={

    showBanner:()=>{
        return new Promise(async(resolve,reject)=>{
            let banner= await db.get().collection(collection.Banner_Details).find().toArray()
            resolve(banner)
        })
    },

    addToBanner:(imageId)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.Banner_Details).insertOne(imageId).then((response)=>{
                resolve.apply(response)
            })
        })
    },

    deleteBanner:(bannerId)=>{
        
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.Banner_Details).deleteOne({_id:ObjectId(bannerId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}