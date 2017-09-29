//dependencies
var request = require("request");
//scraping tools
var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function(app){

	app.get("/scrape", function(req, res){
		//grab body of html with request
		request("https://www.bleepingcomputer.com/", function(error, response, html){
			//load body into cheerio and store it in $
			var $ = cheerio.load(html);
			//grab every
			$("li h4").each(function(i, element){

				var result = {};

				result.title = $(this).children("a").text();
				result.link = $(this).children("a").attr("href");
					// result.summary = $(this).find("p").text();
				//uses article model to create a new entry
				var entry = new Article(result);
				//save entry to the db
				entry.save(function(err,doc){
					//log any errors
					if(err){
						console.log(err);
					}
					//or log the doc
					else{
						console.log(doc);
					}
				});
			});
		});
		res.send("Scrape complete. Reload the homepage to view articles.");
	});
	// This will get the articles we scraped from the mongoDB
	app.get("/articles", function(req, res) {
  	// Grab every doc in the Articles array
  		Article.find({}, function(error, doc) {
    	// Log any errors
    		if (error) {
      		console.log(error);
   			}
    		// Or send the doc to the browser as a json object
    		else {
      			res.json(doc);
    		}
  		});
	});
	
	// Grab an article by it's ObjectId
	app.get("/articles/:id", function(req, res) {
	  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	  Article.findOne({ "_id": req.params.id })
	  // ..and populate all of the comment associated with it
	  .populate("comment")
	  // now, execute our query
	  .exec(function(error, doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    // Otherwise, send the doc to the browser as a json object
	    else {
	      res.json(doc);
	    }
	  });
	});

	// Create a new note or replace an existing note
	app.post("/articles/:id", function(req, res) {
	  // Create a new note and pass the req.body to the entry
	  var newComment = new Comment(req.body);

	  // And save the new note the db
	  newComment.save(function(error, doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    // Otherwise
	    else {
	      // Use the article id to find and update it's note
	      Article.findOneAndUpdate({ "_id": req.params.id }, { "comment": doc._id })
	      // Execute the above query
	      .exec(function(err, doc) {
	        // Log any errors
	        if (err) {
	          console.log(err);
	        }
	        else {
	          // Or send the document to the browser
	          res.send(doc);
	        }
	      });
	    }
	  });
	});
}