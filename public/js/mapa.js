$( document ).ready(function() {
  var queryString = new Array();

  var destino;
  var origen;
  var adddestino;
  var addorigen;

  if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        if (queryString["latdes"] != null &&queryString["londes"] != null &&queryString["latori"] != null && queryString["lonori"] != null) {
            destino = new google.maps.LatLng(queryString["latdes"], queryString["londes"]);
            origen = new google.maps.LatLng(queryString["latori"], queryString["lonori"]);
            adddestino = queryString["arrivo"];
            addorigen = queryString["partida"];
        }
        else{
          origen = queryString["origen"];
          destino = queryString["destino"];
        }

var myOptions = {
    zoom: 15,
    mapTypeId: 'roadmap'
  };

  map = new google.maps.Map($(".mapcanvas").get(0), myOptions);

  ruta(origen,destino)
});

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

function ruta_secundaria(from, to) {
  var flightPlanCoordinates = [from,to];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#67B0E9',
      strokeOpacity: 1,
      strokeWeight: 4
  });

  flightPath.setMap(map);
    var a = new google.maps.Marker({
            position: from,
                  map: map
              });

    var b = new google.maps.Marker({
      position: to,
            map: map
        });
    var bounds = new google.maps.LatLngBounds(from, to);
    map.fitBounds(bounds);
};

function ruta (inicio,destino) {

  var request = {
    origin:inicio,
    destination:destino,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.DirectionsUnitSystem.METRIC,
    provideRouteAlternatives: true
  };

  directionsService.route(request, geo_ruta);

  function geo_ruta (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
    }
    else {
      ruta_secundaria(inicio, destino);
    }
  }
};

