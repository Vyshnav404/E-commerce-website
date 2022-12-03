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
    },

    addAddress:(userId,address)=>{
        var address = {
            name:address.name,
            mobile:address.mobile,
            address:address.address,
            pincode:address.pincode,
            emailAddress:address.emailAddress
        }

        return new Promise(async(resolve,reject)=>{
        let addressinfo = await db.get().collection(collection.User_Address).findOne({user:ObjectId(userId)})
        
        if(addressinfo){
            db.get().collection(collection.User_Address).updateOne({user:ObjectId(userId)},
                {
                    $push:{
                        address:address
                    }
                }
                ).then((response)=>{
                    resolve()
                })
               
        }else{

             address = {  
                user:ObjectId(userId),
                address:[address]
            }

            db.get().collection(collection.User_Address).insertOne(address).then((response)=>{
                resolve()
              })
        }
        
            
        
         
        })
    } ,
    
    showAddress:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let addressData = await db.get().collection(collection.User_Address).findOne({user:ObjectId(userId)})
            resolve(addressData)
        })
    }
}
 