// app/routes.js
module.exports = function(app){

	app.get("/", function(req, res){
		//grab body of html with request
		request(""), function(error, response, html){
			//load body into cheerio and store it in $
			var $ = cheerio.load(html);

		}
	});
}