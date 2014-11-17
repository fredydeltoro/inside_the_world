var rutaController = function(server) {
	server.get('/ruta', function (req, res) {
		res.render('ruta');
	});
	
};

module.exports = rutaController;