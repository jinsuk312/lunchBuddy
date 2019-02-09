// NPM PACKAGES //
var express = require("express");
var bodyParser = require("body-parser");

// EXPRESS CONFIGURATION // 
// create an express server
var app = express();
// set an inital port
var PORT = process.env.PORT || 8080;
// tells express you want JSON to be used
app.use(bodyParser.json());
// tells express whether you want to use a simple algorithm for shallow parsing(false) or complex algorithm for deep parsing that can deal with nested objects(true)
app.use(bodyParser.urlencoded({ extended: true }));
// tells express to parse an HTML body into a string
app.use(bodyParser.text());
// parse various different custom JSON types as JSON 
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// ROUTER // 
// tells express a "map" of how to respond when users visit or request data from various URLs
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// LISTENER // 
// starts our server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT); 
})