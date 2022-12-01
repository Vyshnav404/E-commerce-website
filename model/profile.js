const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')


module.exports={
    showOneUser:(userId)=>{
    
        return new Promise(async(resolve,reject)=>{
            let userData =  await db.get().collection(collection.User_Details).findOne({_id:ObjectId(userId)})
        
            resolve(userData)
        })
    },

    editOneProfile:(userDetails,userId)=>{
    
        
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.User_Details).updateOne({_id:ObjectId(userId)},
            {
                $set:{
                    Username:userDetails.Username,
                    Address:userDetails.Address,
                    Pincode:userDetails.Pincode,
                    Mobile: userDetails.Mobile
                }
            }
            )
           
            resolve()
        })
    }
}
 