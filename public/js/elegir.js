$(document).ready(function() {
	var answer;
	if (window.location.search) {
		 $( ".tabla" ).fadeIn('slow');
		 $('.chat').hide('slow');
	}

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
		else if(answer.split('y')[0] && answer.split('y')[1]){
			if (answer.split('y')[1]=='nada mas') {
				$('.contenido p').text('Veamos que tenemos para ti');
				$('.go').attr({
				'href':'/elegir?query='+$.trim(answer.split('y')[0])
			})
		}
			else{
			$('.contenido p').text('Veamos que tenemos para ti');
			$('.go').attr({
				'href':'/elegir?query='+$.trim(answer.split('y')[0])+"_"+$.trim(answer.split('y')[1])
			});
		}
		}
		else{
			$('.contenido p').text('Por ahora no entiendo mucho, trata con las opciones mencionadas');
		}
	}

});