const db = require('../config/connection')
const collection = require('../config/collection')


module.exports={
    showOrder:()=>{
        return new Promise((resolve,reject)=>{
            let orderList = db.get().collection(collection.Order_List).find().toArray()
            resolve(orderList)
         })
    }
}