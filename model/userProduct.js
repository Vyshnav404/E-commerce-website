const db = require('../config/connection');
const collections = require('../config/collection');
const { ObjectId } = require('mongodb');


module.exports = {
    displayProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let productDetails = await db.get().collection(collections?.Product_Details).find().toArray()
            resolve(productDetails)
        })
    },
    viewCatBase :(catname)=>{
        return new Promise(async(resolve,reject)=>{
          let catProducts= await db.get().collection(collections.Product_Details).aggregate([{
            $match:{categoryName:catname}
          }]).toArray()
          resolve(catProducts)
        })
    },

    viewProductDetails:(productId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collections.Product_Details).findOne({_id:ObjectId(productId)}).then((product)=>{
          resolve(product)
        })
      })
    }
}

