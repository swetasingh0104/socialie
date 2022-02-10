const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const db = require('./config/mongoose');

//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//const db = require('./config/mongoose');    //mobgoose file require
//const Contact = require('./models/user');    //contact db file


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router


// set up the view engine
app.set('view engine', 'ejs');
 app.set('views', './views');

 app.use(session({
    name: 'socialie',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`error  in running server: ${err}`);    //interpolation
    }
    console.log(`server running successfully on port: ${port}`);
})