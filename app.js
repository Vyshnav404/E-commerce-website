const express = require ('express');
const path = require ('path');
const expresslayout = require('express-ejs-layouts')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const app = express()
const port = 8000;

app.use(expresslayout)
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"Public")));


app.set("view engine","ejs")
app.set("views", "./views");
app.set("layout","./layout/layout")





app.use('/',userRouter)
app.use('/admin',adminRouter);

app.listen(port,()=>{
    console.log("server started");
})
