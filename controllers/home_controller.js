module.exports.home = function(req, res){
    console.log(req.cookies);  //show the value added in cookies which can be added or seen from inspect-application-cookie-localhost
    res.cookies('user_id', 11)   //change the value of an object in a cookie
    return res.render('home',{
         title: "home"
     });

 // res.end('<h1>express is up for appie</h1>');
}
// module.exports.actionName = function(req, res){}

// module.exports.actionName = function(req, res){
//     return res.end("this action has been taken");
// }

// //render signup page
// module.exports.signUp = function(res,req){
//     return res.render('user_sign_up',{
//         title: 'socialie| signup'
//     });
// }

// //render

// module.exports.signIn = function(res, req){
//     return res.render('user_sign_in',{
//         title: 'socialie| signin'
//     });
// }