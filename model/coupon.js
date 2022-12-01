const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('express')


module.exports={
    
    showCoupon:()=>{
        return new Promise(async(resolve,reject)=>{
            let coupon = await db.get().collection(collection.Coupon_Details).find().toArray()
            resolve(coupon)
        })
    },

    addCoupon:(couponDetails)=>{
        
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.Coupon_Details).insertOne(couponDetails).then((data)=>{
                resolve(data)
            })
        })
    },

    checkCoupon:(couponData)=>{
       
        let couponCode =couponData.coupon
        
        return new Promise(async(resolve,reject)=>{
         let couponDetails =  await db.get().collection(collection.Coupon_Details).findOne({couponcodeName:couponCode})
                resolve(couponDetails)
        })
    },

    applyCoupon:(couponDetails,total)=>{
        return new Promise(async(resolve,reject)=>{
            if(couponDetails){
    
               let discount = parseInt(couponDetails.couponDiscount)
               let endDate = Date.parse(couponDetails.couponEnd)
               let todayDate = new Date()
               let discountedTotal
               todayDate = todayDate.toLocaleDateString("en-US")
               todayDate = Date.parse(todayDate)
               

               if(todayDate<=endDate){
                
                discountedTotal = total - (discount/100)*total + (5/100)*total
                
                response.discountedTotal = discountedTotal
                response.couponStatus = true
                response.discount = discount
                
                resolve(response)
               }else{
                response.couponStatus = false
                response.discountedTotal = total + (5/100)*total
                response.discount = 0
                resolve(response)
               }

            }else{
                console.log("not working");
                response.couponStatus = false
                response.discountedTotal = total + (5/100)*total
                response.discount = 0
                resolve(response)
            }
           
        })
    }

}