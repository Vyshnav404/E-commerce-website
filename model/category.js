const db = require('../config/connection');
const collection = require('../config/collection');
const { Category_Details } = require('../config/collection');
const { ObjectID, ObjectId } = require('bson');
const { resolve } = require('path');



module.exports={
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.Category_Details).find().toArray()
            resolve(category)
        })
    },

    addTocategory:(imageId,categoryDetails)=>{
        return new Promise(async(resolve,reject)=>{
         db.get().collection(collection.Category_Details).insertOne(imageId,categoryDetails).then((data)=>{
                resolve.apply(data)
            })
        })
    },

    deleteOnecategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.Category_Details).deleteOne({_id:ObjectId(categoryId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}