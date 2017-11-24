// requirements
var path = require("path");

// routing
module.exports = function(app) {

    // get request pulls html survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // default if no matchin path
    app.get("*", function(req,res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};