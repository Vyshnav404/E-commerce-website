const getCategory = require('../../model/category')
const getBrand = require('../../model/brand')

const showProduct=(req,res)=>{
    res.render('admin/Product/productpage',{admin:true,user:false,title:'Product Control Page'})
}

const addProductPage = (req,res)=>{
    getCategory.showCategory().then((category)=>{
        getBrand.showBrand().then((brands)=>{
            res.render('admin/Product/addproductform',{admin:true,user:false,category,brands})
        })
       
    })
}



module.exports={
    showProduct,
    addProductPage
}