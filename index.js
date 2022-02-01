const express = require('express');
const app = express();
const port = 3000;

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`error  in running server: ${err}`);    //interpolation
    }
    console.log(`server running successfully on port: ${port}`);
})