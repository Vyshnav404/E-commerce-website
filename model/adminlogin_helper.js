const db = require('../config/connection')

module.exports={
    adminDologin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response = {}
            let admin = await db.get().collection('admin').findOne({Name:adminData.username})
            if(user){
                
            }
        })
    }
}