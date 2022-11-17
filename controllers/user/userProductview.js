const productView = require('../../model/userProduct')


const showProductDetails = async(req,res)=>{
    let productId = req.query.id
    console.log(productId);
    let product = await productView.viewProductDetails(productId)

    res.render('user/productDetail',{admin:false,user:false,product})

}

module.exports = {
    showProductDetails
}