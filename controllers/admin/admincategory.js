const loadCategory = require('../../model/category')





const showCategory = (req,res)=>{
    loadCategory.showCategory().then((category)=>{
      res.render('admin/category',{admin:true,user:false,category})
    })
 
}
const addCategory =(req,res)=>{
     loadCategory.addTocategory(req.body).then((category)=>{
        res.redirect('/admin/category')
     })
}



module.exports={
    showCategory,
    addCategory
}