const db = require('../config/connection');
const collection = require('../config/collection');
const { Category_Details } = require('../config/collection');



module.exports={
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.Category_Details).find().toArray()
            resolve(category)
        })
    },

    addTocategory:(categoryDetails)=>{
        return new Promise(async(resolve,reject)=>{
         db.get().collection(collection.Category_Details).insertOne(categoryDetails).then((data)=>{
                resolve(data)
            })
        })
    }
}