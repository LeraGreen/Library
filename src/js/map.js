'use strict';

//Google Map//

var map;
function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.9309099, lng: 30.3235137},
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  });

  setMarkers(map);
}


function setMarkers(map) {
  var point = ['Yellow Media', 59.9309099, 30.3235137];

  var image = {
    size: new google.maps.Size(36, 36),
    anchor: new google.maps.Point(18, 18)
  };


  var marker = new google.maps.Marker({
    position: {lat: point[1], lng: point[2]},
    map: map,
    title: point[0]
  });

  setHelpText(marker);
}

function setHelpText(marker) {

   var contentString = '<div><h1 style="font-size:16px">Yellow Media</h1></div>' + '<div style="font-size:13px">Санкт-Петербург, Банковский переулок,д.3</div>';

   var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

   marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
