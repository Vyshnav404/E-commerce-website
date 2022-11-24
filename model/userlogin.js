const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')

module.exports = {
    doSignUp:(userData,verified)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.User_Details).insertOne(userData,verified).then((data)=>{
                resolve(data)
            })
        })
    },


    userDoLogin:(userDetails)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.User_Details).findOne({Username:userDetails.username})
            if(user){
                if(user.verified == 1 && user.state=="active"){
                    
                    bcrypt.compare(userDetails.Password,user.Password).then((status)=>{
                        if(status){
                            console.log("login success");
                            response.user = user
                            response.status=true
                            resolve(response)
                        }else{
                            console.log("password wrong");
                            resolve({status:false})
                        }
                    })
                    }else{
                        resolve({status: false})
                    }
              
            }else{
                console.log('there is no user');
                resolve({status:false})
            }
        })
    },


    userVerified:(userID)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.User_Details).findOne({_id:userID})
            await db.get().collection(collection.User_Details).updateOne({_id:userID},
                {
                    $set: {
                        verified:1,
                    },
                }
                ).then((response)=>{
                    response.user=user
                    resolve(response)
                })
        })
    }

}

