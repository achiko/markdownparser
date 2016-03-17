var Html = require('../lib/html.js');
var Parser = require('../lib/parser.js');
var Db = require('../db/db.js');

function parseTextAndSavetoDatabase(request, reply) {

	console.log(request.payload.markdown);

	if(undefined === request.payload.markdown){
		return reply({ status: "error", info : "please post markdown" })
	}


	//-- Convert posted markdown to html
	var parsedText =  Parser.parseMarkdown(request.payload.markdown);
	
	//-- Put markdown html into HTMl template 
	Html.createHtml(parsedText, function(err, html){

		if(err){
			return reply({ status: "error" });
		}

		//-- Save  into database
		Db.insertHtmlIntoDatabase(html, function(err, docId){

			if(err){
				return reply({ status: "error" })
			}

			return reply({ status: 'success', id: docId });
		});

	});

};


function getMarkdownById(request, reply){

	console.log(request.params.id);

	Db.getMatkdownByID(request.params.id, function(err, result){

		if(err){
			return reply({ status : "error", info: err });
		}

		return reply({  status: 'success', markdown: result })
	});
}


module.exports = {

	parseTextAndSavetoDatabase: parseTextAndSavetoDatabase,
	getMarkdownById : getMarkdownById
}