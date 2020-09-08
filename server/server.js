const express =require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const dataRouter =require ('./routes/data')
const app =express();

// midlewares
app.use(morgan('dev')); // to log all reqs comes from front end to the terminal
app.use(bodyPaser.json()); // translate what comes from front end to json to make BE understand it
app.use(bodyPaser.urlencoded({extended:false}));

//routing 
app.use('/', dataRouter);

app.listen(3000,(err)=>{
    if(err)
    console.log(err);
    else 
    console.log("server running on " + 3000);
})