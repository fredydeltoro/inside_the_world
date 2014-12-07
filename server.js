var express = require('express')
	swig = require('swig');

var server = express();
var connection = require('express-myconnection');
var mysql = require('mysql');

//Cargar vistas
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

server.use(express.static('./public'));

server.configure(function() {

	server.use(express.json());
	server.use(
		connection(mysql,{
			host:'localhost',
			user: 'root',
			password: '',
			port: 3306,
			database: 'agenteinteligente'
		}, 'request')
	);
});

var homeController = require('./app/controllers/home');
var elegirController = require('./app/controllers/elegir');
var rutaController = require('./app/controllers/ruta');
var irController = require('./app/controllers/ir');

homeController(server);
elegirController(server);
rutaController(server);
irController(server);

server.listen(3000);