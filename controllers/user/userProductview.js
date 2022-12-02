const productView = require('../../model/userProduct')


const showProductDetails = async(req,res)=>{
    let home = false;
    let userData = req.session.user
    let productId = req.query.id
    console.log(productId);
    let product = await productView.viewProductDetails(productId)

    res.render('user/productDetail',{admin:false,user:false,product,userData,home})

}

module.exports = {
    showProductDetails
}