var Config = require('../../config.js');
var Model = require('../models/dbschema.js');

//-- insert new  markdown into database 
function insertHtmlIntoDatabase(html, calback){

		var markdown = new Model.markDownModel({
			  html: html	
		});

		markdown.save(function(err, result){

			if(err){
				return calback(err);
			}

			return calback(null, result._id)
		});
}

//-- get exiting markdown from database 
function getMatkdownByID(id, calback){

	Model.markDownModel.find({ _id: id }, function(err, document){

		if(err){
			return calback(err);
		}
					
		calback(null, document);
	});

}

module.exports = {

	insertHtmlIntoDatabase: insertHtmlIntoDatabase,
	getMatkdownByID : getMatkdownByID
}