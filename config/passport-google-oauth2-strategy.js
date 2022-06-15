const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "317416917856-0jbib4ia7h20pc22gtupu5gc9rctbg1j.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : "http://localhost:3000/users/auth/google/callback"
},

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("error in google strategy", err);
                return ;

                console.log(profile);

                if(user){
                    // if found , set this user as  req.user
                    return done(null, user);

                }else{
                    // if not found, createthe user and set  is as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')

                    }, function(err, user){
                        if(err){
                            console.log("error in creating user google strategy-passport", err);
                            return ;
                        }
                        return done(null, user);
                    });
                }

            }
        });
    }

));

module.exports = passport;