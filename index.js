var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({port: 5000});

var MainCtrl = require('./src/controllers/maincontroller.js');


server.route({ 
	method:  'POST',    
	path: '/markdown/save',
	handler: MainCtrl.parseTextAndSavetoDatabase
});

server.route({ 
	method:  'GET',    
	path: '/markdown/{id}',
	handler: MainCtrl.getMarkdownById
});



server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
    console.log("We are up and running. service port: ", server.info.port);
});
