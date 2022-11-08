const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')


module.exports={

    showBrand:()=>{
        return new Promise(async(resolve,reject)=>{
            let brand = await db.get().collection(collection.Brand_Details).find().toArray()
            resolve(brand)
        })
    },


    addBrand:(brandDetails)=>{
        return new Promise(async(resolve,reject)=>{
         await db.get().collection(collection.Brand_Details).insertOne(brandDetails).then((data)=>{
                resolve(brandDetails)
            })
        })
},

    dropBrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.Brand_Details).deleteOne({_id:ObjectId(brandId)}).then((response)=>{
                resolve(response)
            })
        })
    }


}