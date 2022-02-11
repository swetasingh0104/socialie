
const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('users_profile',{
        title: 'user profile setup'
    });
 }


//render signup page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title: 'socialie| signup'
    });
}


//render the signin page

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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
module.exports.createSession = function(req, res){
    //todo
    return res.redirect('/');
}

//logout session
module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}