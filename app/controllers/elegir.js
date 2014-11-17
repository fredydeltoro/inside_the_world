var elegirController = function (server) {
	server.get('/elegir', function (req, res) {
		res.render('elegir');
	});
};

module.exports = elegirController;