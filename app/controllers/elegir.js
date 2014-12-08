var elegirController = function (server) {
	var consulta;
	server.get('/elegir', function (req, res) {
		debugger;
		if (req.param('query')!=null) {
			if (req.param('query') =='no'){
					consulta = 'SELECT nombre FROM lugturist';
				}
				else if(req.param('query') =='cultura'){
					consulta = 'SELECT nombre FROM lugturist where cultura = 1';
				}
				else if(req.param('query') =='arte'){
					consulta = 'SELECT nombre FROM lugturist where arte = 1';
				}
				else if(req.param('query') =='playa'){
					consulta = 'SELECT nombre FROM lugturist where playa = 1';
				}
				else if(req.param('query') =='frio'){
					consulta = 'SELECT nombre FROM lugturist where frio = 1';
				}
				else if(req.param('query') =='templado'){
					consulta = 'SELECT nombre FROM lugturist where templado = 1';
				}
				else if(req.param('query') =='calido'){
					consulta = 'SELECT nombre FROM lugturist where calido = 1';
				}
				else if(req.param('query') =='semitropical'){
					consulta = 'SELECT nombre FROM lugturist where semitropical = 1';
				}
				else if(req.param('query').split('_')[0] && req.param('query').split('_')[1]){

					if (req.param('query').split('_')[0]=='turistic') {
						consulta ='SELECT lugturist.nombre'+
								   ' FROM paises join lugturist on paises.id_pais= lugturist.id_pais '+
								   'WHERE  paises.nombre = '+"'"+req.param('query').split('_')[1]+"'";
					}
					else {
						consulta = 'SELECT lugturist.nombre'+
									' FROM paises join lugturist on paises.id_pais=lugturist.id_pais '+ 
									'WHERE lugturist.'+req.param('query').split('_')[0]+'=1 and paises.nombre= '+"'"+req.param('query').split('_')[1]+"'";

									console.log(consulta);
					}
					
				}

			req.getConnection(function (err, connection) {

				connection.query(consulta, function (err, rows) {
					if (err) 
						console.log('Error seleccionando : %s', err);

					res.render('elegir', {data:rows});
				});
		});
		}
		else{
			res.render('elegir');
		}
	});
};

module.exports = elegirController;