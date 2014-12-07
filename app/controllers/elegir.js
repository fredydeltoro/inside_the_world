var elegirController = function (server) {
	server.get('/elegir', function (req, res) {

		req.getConnection(function (err, connection) {
			connection.query('SELECT nombre FROM lugturist', function (err, rows) {
				if (err) 
					console.log('Error seleccionando : %s', err);

				res.render('elegir', {data:rows});
			});
		});
	});
};

module.exports = elegirController;