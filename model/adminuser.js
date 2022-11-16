const db = require('../config/connection')
const collection = require('../config/collection')

module.exports ={
    displayUser:()=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.User_Details).find().toArray()
            resolve(user)
        })
    }
}