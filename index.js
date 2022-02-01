const express = require('express');
const app = express();
const port = 3000;

//use express router
app.use('/', require('./routes'));

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err){
    if(err){
        console.log(`error  in running server: ${err}`);    //interpolation
    }
    console.log(`server running successfully on port: ${port}`);
})