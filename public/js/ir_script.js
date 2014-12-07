
var place_origen;
var place_destino;
$(document).ready(function() {

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
		 			$('.lugar').text('Ahora estas en: '+results[0].formatted_address);
		 			dir = results[0].formatted_address;
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

	$('a').on('click', function() {
		$('a').attr({
		   'href': '/ruta?'+'partida='+encodeURIComponent($('#origen').val())+
		   '&latori='+encodeURIComponent(place_origen.geometry.location.k)+'&lonori='+encodeURIComponent(place_origen.geometry.location.B)
		   +'&arrivo='+encodeURIComponent($('#destino').val())+
		   '&latdes='+encodeURIComponent(place_destino.geometry.location.k)+'&londes='+encodeURIComponent(place_destino.geometry.location.B)
		})
	});

});

function autocomplete() {
		var inp_origen = (document.getElementById('origen'));

		var auto_origen = new google.maps.places.Autocomplete(inp_origen);

		google.maps.event.addListener(auto_origen, 'place_changed', function() {
			debugger;
			place_origen = auto_origen.getPlace();
			if (!place_origen.geometry) {
				return;
			}
		});

		var inp_destino = (document.getElementById('destino'));

		var auto_destino = new google.maps.places.Autocomplete(inp_destino);

		google.maps.event.addListener(auto_destino, 'place_changed', function() {
			debugger;
			place_destino = auto_destino.getPlace();
			if (!place_origen.geometry) {
				return;
			}
		});
};



google.maps.event.addDomListener(window, 'load', autocomplete);
