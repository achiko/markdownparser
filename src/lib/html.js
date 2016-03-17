var _  = require('underscore');
var fs = require('fs');

function createHtml(parsedText, callback){

	fs.readFile('./src/templates/htmltemplate.html','utf8','utf8', function(err, htmlTemplateFile){

		if(err) {
			return callback(err);
		}

		var template  = _.template(htmlTemplateFile);
		var html = template({ data: parsedText });

		return callback(null, html);
	});
}


module.exports = {
	createHtml : createHtml
} 