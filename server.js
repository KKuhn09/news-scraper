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
var port = process.env.port || 3001;
//initialize express
var app = express();
//use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
//make public a static directory
app.use(express.static("public"));

//db config with mongoose
mongoose.connect("mongodb://localhost/news-scraper");
var db = mongoose.connection;
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
	-Make the homepage scrape articles
	-Scrape summaries from bleepingcomputer
	-If articles being scrape have already been scraped, do not store them in the database.
*/
