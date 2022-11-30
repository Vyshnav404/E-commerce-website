const loadBanner = require('../../model/banner')


const showBanner = (req,res)=>{
    loadBanner.showBanner().then((banner)=>{
        res.render('admin/banner',{admin:true,user:false,title:'Banner Control Page',banner})
    })
}


const addBanner = (req,res)=>{
    
    
    loadBanner.addToBanner({
        picture:req.file.filename
    }).then((banner)=>{
        res.redirect('/admin/banner')
    })
}

const deleteBanner = (req,res)=>{
    
   let id = req.query.id

    loadBanner.deleteBanner(id).then((response)=>{
        res.json(response)
    })
}

module.exports={
    showBanner,
    addBanner,
    deleteBanner
}