const loadCategory = require('../../model/category')



const showCategory = (req,res)=>{
    loadCategory.showCategory().then((category)=>{
      res.render('admin/category',{admin:true,user:false,title:'Category Control Page',category})
    })
 
}
const addCategory =(req,res)=>{
  console.log(req.file);
  const {
    categoryName
  }=req.body

     loadCategory.addTocategory({
      picture:req.file.path,
      categoryName
     }).then((category)=>{
        res.redirect('/admin/category') 
     })
}

const deleteCategory = (req,res)=>{
  let id = req.body.categoryId
  loadCategory.deleteOnecategory(id).then((response)=>{
    res.json(response)
  })
}




module.exports={
    showCategory,
    addCategory,
    deleteCategory
}