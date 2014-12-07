irController = function (server) {
	server.get('/ir', function (req, res) {
		res.render('ir');
	})
}

module.exports = irController;