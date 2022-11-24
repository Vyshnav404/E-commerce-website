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
    let {
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
    
    sellingPrice = parseInt(sellingPrice)
    actualPrice = parseInt(actualPrice)
    quantityName = parseInt(quantityName)
        
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
    
    let id = req.body.productId
    viewProduct.dropProduct(id).then((response)=>{
        res.json(response)
    })
}

const editProduct = (async(req,res)=>{
    await viewProduct.showOneProduct(req.query.id).then((response)=>{
        getCategory.showCategory().then((category)=>{
            getBrand.showBrand().then((brands)=>{
                res.render("admin/Product/editproduct",{admin:true,user:false,response,category,brands,title:'Product Control Page'})
            })
        })
        
    })
})


const addEditproduct = (req,res)=>{
    console.log(req.params.id);
    console.log(req.file.filename);
    viewProduct.editInProduct(req.params.id,req.body,req.file.filename).then((response)=>{
        res.redirect('/admin/product')
    })
}



module.exports={
    showProduct,
    addProductPage,
    addProduct,
    deleteoneProduct,
    editProduct,
    addEditproduct
}