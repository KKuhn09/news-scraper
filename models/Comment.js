//require mongoose
var mongoose = require("mongoose");
//create the schema class
var Schema = mongoose.Schema;
//create the note schema
var CommentSchema = new Schema({
	title:{
		type: String
	},
	body:{
		type: String
	}
});
//create the note model with NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);
//export the note model
module.exports = Comment;