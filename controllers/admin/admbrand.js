const displayBrand = require('../../model/brand')



const addtoBrand = (req,res)=>{
    displayBrand.addBrand(req.body).then((brand)=>{
        res.redirect('/admin/brand')
    })
}

const brandTable=(req,res)=>{
    displayBrand.showBrand().then((brandDetails)=>{
    res.render('admin/brand',{admin:true,user:false,title:'Brand Control Page',brandDetails})
    })
 
}

const deleteBrand=(req,res)=>{
      let id = req.body.brandId
      displayBrand.dropBrand(id).then((response)=>{
        res.json(response)
      })
}



module.exports={
    brandTable,
    addtoBrand,
    deleteBrand
}