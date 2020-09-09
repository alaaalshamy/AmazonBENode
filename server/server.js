const express =require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const dataRouter =require ('./routes/data');
const productRouter =require('./routes/product');
const categoryRouter =require('./routes/category');
const ownerRouter = require('./routes/owner');
const mongoose =require('mongoose');
const dotenv =require('dotenv');
const app =express();

//env 
dotenv.config();

// midlewares
app.use(morgan('dev')); // to log all reqs comes from front end to the terminal
app.use(bodyPaser.json()); // translate what comes from front end to json to make BE understand it
app.use(bodyPaser.urlencoded({extended:false}));
//db 
mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true,useNewUrlParser: true  },(err)=>{
    if (err)
    console.log(err);
    else
    console.log("DB Connected");
})
//routing 
app.use('/', dataRouter);
app.use('/product', productRouter);
app.use('/category',categoryRouter);
app.use('/owner',ownerRouter);



const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    if(err)
    console.log(err);
    else 
    console.log("server running on " + port);
})