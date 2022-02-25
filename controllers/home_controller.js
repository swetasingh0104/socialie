const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Socialie | Home",
                posts:  posts,
                all_users: users
            });   
        });
       
    });
      // prints "The author is Ian Fleming"

}

// module.exports.actionName = function(req, res){}