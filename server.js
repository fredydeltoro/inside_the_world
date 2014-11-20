var express = require('express')
	swig = require('swig');

var server = express();

//Cargar vistas
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

server.use(express.static('./public'));

var homeController = require('./app/controllers/home');
var elegirController = require('./app/controllers/elegir');
var rutaController = require('./app/controllers/ruta');

homeController(server);
elegirController(server);
rutaController(server);

server.listen(80);