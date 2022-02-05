const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//const db = require('./config/mongoose');    //mobgoose file require
//const Contact = require('./models/user');    //contact db file


app.use(express.urlencoded());
app.use(cookieParser());

//use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
 app.set('views', './views');
app.listen(port, function(err){
    if(err){
        console.log(`error  in running server: ${err}`);    //interpolation
    }
    console.log(`server running successfully on port: ${port}`);
})