//grab the articles as a json
$.getJSON("/articles", function(data){
	console.log(data);
	for(var i=0;i<data.length;i++){
		$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
	}
});
//when someone clicks a p tag
$(document).on("click", "p", function(){
	//empties comments from comment section
	$("#comments").empty();
	//save id from the p tag
	var thisId = $(this).attr("data-id");

	//make ajax call for the article
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	//once call is done, add comment information to the page
	.done(function(data){
		console.log(data);
		$("#comments").append("<div class='row'><div class='col-md-12'><h2>" + data.title + "</h2></div>");
		$("#comments").append("<div class='col-md-12'><input id='titleinput' name='title' ></div>");
		$("#comments").append("<div class='col-md-12'><textarea id='bodyinput' name='body'></textarea></div>");
		$("#comments").append("<div class='col-md-12'><button data-id='" + data._id + "' id='savecomment'>Save Comment</button></div></div>");

		if(data.comment){
			$("#titleinput").val(data.comment.title);
			$("#bodyinput").val(data.comment.body);
		}
	});
});

$(document).on("click", "#savecomment", function(){
	//grab id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			title: $("#titleinput").val(),
			body: $("#bodyinput").val()
		}
	}).done(function(data){
		console.log(data);
		$("#comments").empty();
	});
	$("#titleinput").val("");
	$("#bodyinput").val("");
});