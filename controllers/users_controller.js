module.exports.profile = function(req, res){
    return res.render('users_profile',{
        title: 'user profile setup'
    });
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

//get the sign-up data
module.exports.create = function(req, res){
    //todo
}

//get the sign-in data
module.exports.createSessions = function(req, res){
    //todo
}