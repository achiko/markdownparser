
function parseMarkdown(text) {

		var parsedText  = null;
		var lines = text.split('\n');

		textArray = [];

		lines.forEach(function(line) {
			textArray.push(parseLine(line));
		});

		return textArray;
}


function parseLine(line){

		//-- H1 --// 
		if(/^# /.test(line)) {
			line = line.replace(/# /i, "<h1>") + "</h1>";
			return line;
		}

		//-- H2 --// 
		if(/^## /.test(line)) {
			line = line.replace(/## /i, "<h2>") + "</h2>";
			return line;
		}

		//-- H3 --// 
		if(/^### /.test(line)) {
			line = line.replace(/### /i, "<h3>") + "</h3>";
			return line;
		}


		//-- <strong> 
		if( /(\*\*|__)(.*?)\1/.test(line)) {
			line = line.replace(/(\*\*|__)(.*?)/g, ""); 
			line = "<strong>"+ line + "</strong>";
			return line;
		}


		//-- <em> --
		if(/^\*/.test(line)) {
			line = line.replace(/\*/g, ""); 
			line = "<em>"+ line + "</em>";
			return line;
		}


		if(/\[([^\[]+)\]\(([^\)]+)\)/.test(line)){

			var linkdata  = /\[([^\[]+)\]\(([^\)]+)\)/.exec(line);
			var link = "<a href='"+linkdata[2]+"'>"+linkdata[1]+"</a>";
			return link;
		}
	
		//-- <p> --// 
		line =  "<p>" + line + "</p>";
		return	line;	
}

module.exports = {
	parseMarkdown : parseMarkdown,
	parseLine : parseLine 
} 