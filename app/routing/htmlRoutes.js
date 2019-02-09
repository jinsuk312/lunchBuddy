// DEPENDENCIES //
var path = require('path');
// ROUTING //
module.exports = function(app){
    // get request
    // deliver this html file, with the path of ...
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    })
    // get request
    // deliver this html file, by default 
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    })
}
