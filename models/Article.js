//require mongoose
var mongoose = require("mongoose");
//create Schema class
var Schema = mongoose.Schema;
//create article schema
var ArticleSchema = new Schema({
	//title is a required string
	title:{
		type: String,
		required: true
	},
	//summary is a required string
	// summary:{
	// 	type: String,
	// 	required: true
	// },
	//link is a required string
	link:{
		type: String,
		required: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});
//create Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);
//export the model
module.exports = Article;