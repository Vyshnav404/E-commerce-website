const express = require ('express');
const path = require ('path');
const expresslayout = require('express-ejs-layouts')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const app = express()
const db = require('./config/connection')
const session = require('express-session')
const cookie = require('cookie-parser')
const port = 5000;


app.use(expresslayout)
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"Public")));

app.use(session({secret:"key",
saveUninitialized:true,
cookie:{maxAge:3000000},
resave:false
}))

app.use(cookie())
app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  });
  

app.set("view engine","ejs")
app.set("views", "./views");
app.set("layout","./layout/layout")


db.connect((err)=>{
    if(err) console.log("connection error"+err);
    else console.log("Database connected successfully");
})



app.use('/',userRouter)
app.use('/admin',adminRouter);

app.listen(port,()=>{
    console.log("server started");
})
