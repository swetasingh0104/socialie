module.exports.home = function(req, res){
    return res.render('home',{
        title:"home"
    });
}

module.exports.actionName = function(req, res){
    return res.end("this action has been taken");
}