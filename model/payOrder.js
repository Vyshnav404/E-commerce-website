const db = require('../config/connection')
const collection = require('../config/collection')
const Razorpay  = require('razorpay');
const { ObjectId } = require('mongodb');
var instance = new Razorpay({
    key_id: 'rzp_test_9oT5CWpksAyeFQ',
    key_secret: '1QskKE4EJ9StgzqIBe1bxtvW',
  });



module.exports={

    generateRazarpay:(orderId,total)=>{
        return new Promise((resolve,reject)=>{
            
            total = parseInt(total)
            var options = {
              amount: total*100,
              currency: "INR",
              receipt:""+orderId
            }
      
            instance.orders.create(options,function(err,order){
              if(err)
              {
                console.log(err)
              }
              else
              {
                console.log("New Order = ",order)
                resolve(order)
              }
              
            })
        })
    },

    verifyDoPayment:(details)=>{
        return new Promise((resolve,reject)=>{
            let {
                createHmac
              } = require('node:crypto');
              let hmac = createHmac('sha256', '1QskKE4EJ9StgzqIBe1bxtvW');

              hmac.update(details.payment.razorpay_order_id+'|'+details.payment.razorpay_payment_id);
              hmac=hmac.digest('hex')

              if(hmac==details.payment.razorpay_signature){
                resolve()
              }else{
                reject()
              }
        })
    },

    changePaymentStatus:(orderId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.Order_List).updateOne({_id:ObjectId(orderId)},
            {
                $set:{
                    status:'placed'
                }
            }
            ).then(()=>{
                resolve()
            })
        })
    }

}
