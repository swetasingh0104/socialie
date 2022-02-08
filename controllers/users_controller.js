
const user = require('../models/user');
const User = require('../models/user');
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){

                 return res.render('users_profile',{
                title: 'user profile setup',
                user:user
          });

            }else{
                return res.redirect('/users/sign-in');
            }
        })

    }else{
        return res.redirect('/users/sign-in');
    }


   
 }


//render signup page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'socialie| signup'
    });
}


//render the signin page

module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'socialie| signin'
    });
}

// get the sign-up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
       return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up')}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while in signing up');
                 return}

                 return res.redirect('/users/sign-in')
                
            })
        }else{
            return res.redirect('back');
        }
    })
    
}


//get the sign-in data
module.exports.createSessions = function(req, res){
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in')}
         //handle user found
         if(user){

            //handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

         }else{
             //handle user not found

             return res.redirect('back');

         }
    })
}