module.exports.home = function(req, res){
    return res.end('<h1>Express is up for socialie</h1>')
}

module.exports.actionName = function(req, res){
    return res.end("this action has been taken");
}