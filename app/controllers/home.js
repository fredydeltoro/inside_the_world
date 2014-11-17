var homeController = function (server) {
	server.get('/', function (req, res) {
		res.render('home');
	});

};

module.exports =  homeController;