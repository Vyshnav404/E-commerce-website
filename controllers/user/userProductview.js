const productView = require('../../model/userProduct')


const showProductDetails = async(req,res)=>{
    let userData = req.session.user
    let productId = req.query.id
    console.log(productId);
    let product = await productView.viewProductDetails(productId)

    res.render('user/productDetail',{admin:false,user:false,product,userData})

}

module.exports = {
    showProductDetails
}