$(document).ready(function() {
	var dir;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess);
	} else {
		error('not supported');
	}

	function positionSuccess(position) {

		geocoder = new google.maps.Geocoder();

		lat = position.coords.latitude;
		lng = position.coords.longitude;
		var latlng = new google.maps.LatLng(lat,lng);

		geocoder.geocode({'latLng': latlng}, function (results, status) {
		 	if (status == google.maps.GeocoderStatus.OK) {
		 		if (results[0]) {
		 			dir = results[1].formatted_address;
		 		}
		 		else {
		 			alert('No se encontraron resultados');
		 		}
		 	}
		 	else {
		 		alert('fallo por: ' + status);
		 	}
		 });
			
	};

	if (window.location.search) {
		var lugares ;
		$('.chat').hide('slow');
		$( ".tabla" ).fadeIn('slow',function() {
			window.io = io.connect();
			io.on('connect', function(socket) {
				io.emit('listo!');
			});

			io.on('lista', function (lista) {
			lugares = lista;
			$.each(lugares, function (row, data) {
				$('ul').append(
						' <li>'+ '<a href=ruta?origen='+encodeURI(dir)+'&destino='+encodeURI(data.nombre)+'>'+data.nombre+'</a></li>'
					)
			});
		});
	});	
	}

	else{
		respuesta();
	}
	


});

function respuesta() {
	var answer;
	$('.go').on('click', function() {
		answer = $('.respuesta').val();
		$('.respuesta').val('');
		comparar();
	});

	function comparar() {
		if (answer == 'no') {
			$('.go').text('Vamos!');
			$('.go').attr({
				'href':'/elegir?query=no'
			});
		}
		else if(answer == 'si'){
			$('.contenido p').text('Ok tengo 7 topicos para elegir: cultura, arte, playa, frio, templado, calido y semitropical. cual escoges?');
		}
		else if(answer == 'cultura'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "cultura y pais", si no quieres ningun pais escribe "cultura y nada mas"');
		}
		else if(answer == 'arte'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "arte y pais", si no quieres ningun pais escribe "arte y nada mas"');
		}
		else if(answer == 'playa'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "playa y pais", si no quieres ningun pais escribe "playa y nada mas"');
		}
		else if(answer == 'frio'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "frio y pais", si no quieres ningun pais escribe "frio y nada mas"');
		}
		else if(answer == 'templado'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "templado y pais", si no quieres ningun pais escribe "templado y nada mas"');
		}
		else if(answer == 'calido'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "calido y pais", si no quieres ningun pais escribe "calido y nada mas"');
		}
		else if(answer == 'semitropical'){
			$('.contenido p').text('Deseas combinar tu topico con algun pais? si, es así por favor escribe "semitropical y pais", si no quieres ningun pais escribe "semitropical y nada mas"');
		}
		else if(answer.split(' ')[0] && answer.split(' ')[1]){
			if (answer.split(' ')[2]=='nada') {
				debugger;
				$('.contenido p').text('Veamos que tenemos para ti');
				$('.go').attr({
						'href':'/elegir?query='+$.trim(answer.split(' ')[0])
						})
		}
			else{

			$('.contenido p').text('Veamos que tenemos para ti');
			$('.go').attr({
						'href':'/elegir?query='+$.trim(answer.split(' ')[0])+"_"+$.trim(answer.split(' ')[2])
					});
		}
		}
		else{
			$('.contenido p').text('Por ahora no entiendo mucho, trata con las opciones mencionadas');
		}
	}
};

