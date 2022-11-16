const db = require('../config/connection');
const collection = require('../config/collection')


module.exports = {
    displayProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let productDetails = await db.get().collection(collection.Product_Details).find().toArray()
            resolve(productDetails)
        })
    },
}

