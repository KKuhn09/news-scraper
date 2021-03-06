//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//models
var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js");
//set mongoose to leverage built in JS ES6 promises
mongoose.Promise = Promise;
//Sets up our port
var port = process.env.PORT || 3001;
//initialize express
var app = express();
//use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
//make public a static directory
app.use(express.static("public"));

var db = mongoose.connection;
//db config with mongoose1
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news-scraper");

//show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
//once logged into db thru mongoose, log success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//require routes
require("./app/routes.js")(app);

//listen on port 3001
app.listen(port, function(){
	console.log("App running on port " + port + "!");
});

/* Things to do:
	-If articles being scrape have already been scraped, do not store them in the database.
*/