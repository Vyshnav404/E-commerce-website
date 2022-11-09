const getCategory = require('../../model/category')
const getBrand = require('../../model/brand')
const viewProduct = require('../../model/product')

const showProduct=(req,res)=>{
    viewProduct.showProduct().then((product)=>{
        res.render('admin/Product/productpage',{admin:true,user:false,title:'Product Control Page',product})
    })
    
}

const addProductPage = (req,res)=>{
    getCategory.showCategory().then((category)=>{
        getBrand.showBrand().then((brands)=>{
            res.render('admin/Product/addproductform',{admin:true,user:false,title:'Product Control Page',category,brands})
        })
       
    })
}

const addProduct = (req,res)=>{
    const {
        productName,
        actualPrice,
        sellingPrice,
        categoryName,
        brandName,
        quantityName,
        productDescription,
        addToTrendingProduct,
        addToNewlyArrivedProduct
    }=req.body

    viewProduct.addProduct({
        picture:req.file.filename,
        productName,
        actualPrice,
        sellingPrice,
        categoryName,
        brandName,
        quantityName,
        productDescription,
        addToTrendingProduct,
        addToNewlyArrivedProduct
    }).then((proDetails)=>{
        res.redirect('/admin/product')
    })
}


const deleteoneProduct= (req,res)=>{
    console.log(req.body);
    let id = req.body.productId
    viewProduct.dropProduct(id).then((response)=>{
        res.json(response)
    })
}



module.exports={
    showProduct,
    addProductPage,
    addProduct,
    deleteoneProduct
}