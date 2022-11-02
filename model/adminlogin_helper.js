const bcrypt = require('bcrypt')
const { log } = require('console');
const db = require('../config/connection')
const collection = require('../config/collection')

module.exports={
    adminDologin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response = {}
            let admin = await db.get().collection(collection.Admin_Credentials).findOne({username:adminData.username})
            if(admin){
                bcrypt.compare(adminData.Password,admin.password).then((status)=>{
                    if(status){
                        console.log('success');
                        response.user=admin;
                        response.status=true;
                        resolve(response)
                     }else{
                        console.log("login failed");
                        resolve({status:false})
                     }
                })
                    
                    
            }else{
                console.log("login not success");
                resolve({status:false})
            }
        })
    }
}