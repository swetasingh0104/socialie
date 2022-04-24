const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('users_profile',{
            title: 'user profile ',
            profile_user: user
        });
    });
    
 }


 module.exports.updates = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}

                user.name = req.body.name;
                user.email = req.body.email; 

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar= User.avatarPath  +'/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');    

            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

//logout session
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out successfully');

    return res.redirect('/');
}