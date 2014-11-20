arrVariables = location.search.substring(1,location.search.length);
arrVariableActual = arrVariables.split("=");

var destino=unescape(arrVariableActual[1]);


var map = null;
var geocoder;
var directionsService = null;
var directionsDisplay = null;
var infowindow = new google.maps.InfoWindow();
var s = document.querySelector('.s');
//revisar que el navegador soporta la localizacion
$(document).ready(geo_support);
s.innerHTML=cadVariables;
function geo_support() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initialize);
  }
  else {
    error('not supported');
  }
} 




function initialize(position) {
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($(".mapcanvas").get(0), myOptions);
  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  address(latlng);
  ruta(latlng,destino);
}

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
}

function geo_ubicacion(origen, destino) {

  geocoder.geocode({ 'address': destino}, geocode_latlng);

  function geocode_latlng(results, status) {

    if (status == 'OK') {
      var hola = results[0].geometry.location;
      get_latlng(hola);
    } 
    else {
      alert("Geocoding no tuvo éxito debido a: " + status);
    }
  }

  function get_latlng (puto_numero) {
    ruta_secundaria (origen, puto_numero);
    var bounds = new google.maps.LatLngBounds(origen,puto_numero);
    map.fitBounds(bounds);
    address(puto_numero);
  }
}



function address (latlng) {

  var dir;

  geocoder.geocode({'latLng': latlng}, geocode_address);

  function geocode_address (results, status) {

    if (status == 'OK') {

      if (results[1]) {

        marker = new google.maps.Marker({
          position: latlng,
                map: map,
                title:results[1].formatted_address
            });
      }
      else {
        alert('No results found');
      }
    }
    else {
      alert('Geocoder failed due to: ' + status);
    }
  }
}


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
      var a = 'mark_a';
      geo_ubicacion(inicio, destino);
    }
  }
}
