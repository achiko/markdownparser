var should = require('chai').should();
var assert = require('assert');
var Parser = require('../src/lib/parser.js');


describe('Parser', function() {

	describe('headlines', function() {

		it('should parse # and return text whith <h1> ... </h1>', function(done) {

			var parsedresult = Parser.parseLine('# this is  headline 1 ');
			parsedresult.should.be.a('string');
			/<h1>([\s\S]*)<\/h1>/.test(parsedresult).should.equal(true);
			
			done();
		});

		it('should parse ### and return text whith <h2> ... </h2>', function(done) {

			var parsedresult = Parser.parseLine('## this is  headline 2 ');
			parsedresult.should.be.a('string');
			/<h2>([\s\S]*)<\/h2>/.test(parsedresult).should.equal(true);

			done();
		});

		it('should parse ### and return text whith <h3> ... </h3>', function(done) {

			var parsedresult = Parser.parseLine('### this is headline 3 ');
			parsedresult.should.be.a('string');
			/<h3>([\s\S]*)<\/h3>/.test(parsedresult).should.equal(true);

			done();
		});

	});

	describe('paragraphs', function(){

		it('should return Simple lines as paragraphs', function(done){

			var parsedresult = Parser.parseLine('this is simple line ');
			parsedresult.should.be.a('string');
			/<p>([\s\S]*)<\/p>/.test(parsedresult).should.equal(true);

			done();
		});

	});

	describe('characterstyles', function(){

		it('Text wrapped in *…* should become emphasized <em> ...</em>', function(done){

			var parsedresult = Parser.parseLine('*this is simple text*');
			parsedresult.should.be.a('string');
			/<em>([\s\S]*)<\/em>/.test(parsedresult).should.equal(true);

			done();
		});

		it('Text wrapped in **…** should become emphasized <strong> ...</strong>', function(done){

			var parsedresult = Parser.parseLine('**this is simple text with double stars**');
			parsedresult.should.be.a('string');
			/<strong>([\s\S]*)<\/strong>/.test(parsedresult).should.equal(true);

			done();
		});

	});

	describe('link', function(){ 

		it('Text wrapped [example link](http://www.google.com) should return <a href="http://www.google.com">example link</a>', function(done){

			var parsedresult = Parser.parseLine('[example link](http://www.google.com)');
			parsedresult.should.be.a('string');
			
			var regex = new RegExp("<a.*?>.*?</a>");
			regex.test(parsedresult).should.equal(true);

			done();
		});

	});

});