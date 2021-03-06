// This example uses the autocomplete feature of the Google Places API.
// It allows the user to find all hotels in a given place, within a given
// country. It then displays markers for all the hotels returned,
// with on-click details for each hotel.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var twitterApiCall = require('../server/twitterApiCall.js');
var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'us'};
var MARKER_PATH = 'http://maps.google.com/mapfiles/ms/icons/blue-dot';
var hostnameRegexp = new RegExp('^https?://.+?/');
var nearestPlaces = [];
var countries = {
  'au': {
    center: {lat: -25.3, lng: 133.8},
    zoom: 4
  },
  'br': {
    center: {lat: -14.2, lng: -51.9},
    zoom: 3
  },
  'ca': {
    center: {lat: 62, lng: -110.0},
    zoom: 3
  },
  'fr': {
    center: {lat: 46.2, lng: 2.2},
    zoom: 5
  },
  'de': {
    center: {lat: 51.2, lng: 10.4},
    zoom: 5
  },
  'mx': {
    center: {lat: 23.6, lng: -102.5},
    zoom: 4
  },
  'nz': {
    center: {lat: -40.9, lng: 174.9},
    zoom: 5
  },
  'it': {
    center: {lat: 41.9, lng: 12.6},
    zoom: 5
  },
  'za': {
    center: {lat: -30.6, lng: 22.9},
    zoom: 5
  },
  'es': {
    center: {lat: 40.5, lng: -3.7},
    zoom: 5
  },
  'pt': {
    center: {lat: 39.4, lng: -8.2},
    zoom: 6
  },
  'us': {
    center: {lat: 37.1, lng: -95.7},
    zoom: 3
  },
  'uk': {
    center: {lat: 54.8, lng: -4.6},
    zoom: 5
  }
};

// function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: countries['us'].zoom,
    center: countries['us'].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });

  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (
          document.getElementById('autocomplete')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
      });
  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', onPlaceChanged);

  // Add a DOM event listener to react when the user selects a country.
  document.getElementById('country').addEventListener(
      'change', setAutocompleteCountry);
// }

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }
}

// Search for hotels in the selected city, within the viewport of the map.
function search() {
  var search = {
    bounds: map.getBounds(),
    types: ['restaurant']
  };

  places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //clearResults();
      clearMarkers();
      // Create a marker for each hotel found, and
      // assign a letter of the alphabetic to each marker icon.
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + '.png';
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        markers[i].placeResult = results[i];
        console.log(markers[i].placeResult.place_id);
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        // console.log(results[i].name, results[i].geometry.location.lat(), results[i].geometry.location.lng());
        nearestPlaces.push({
          name: results[i].name,
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
        });




      /*  $.ajax({
          url: "https://api.twitter.com/1.1/followers/ids.json?callback=?",
          type: "GET",
          data: { cursor: "-1",
                  screen_name: "twitterapi" },
          cache: false,
          dataType: 'json',

          success: function(data) { alert('hello!'); console.log(data);},
          error: function(html) { alert(html); },
          beforeSend: setHeader
        });


    function setHeader(xhr) {
        if(xhr && xhr.overrideMimeType) {
            xhr.overrideMimeType("application/j-son;charset=UTF-8");
        }

        //var nonce = freshNonce();
        //var timestamp = freshTimestamp();
        //var signature = sign(nonce,timestamp);

        //alert(signature);
        //alert(accessToken+"-"+consumerKey);
        //alert(oauth_version+"-"+oauth_signature_method);
        xhr.setRequestHeader('Authorization','OAuth oauth_consumer_key="iDOtKjkdh5YyXNbrevmeRGmhF",'oauth_nonce, '4148fa6e3dca3c3d22a8315dfb4ea5bb', 'oauth_signature','uDZP2scUz6FUKwFie4FtCtJfdNE%3D', 'oauth_signature_method', 'HMAC-SHA1', 'oauth_timestamp', '1359955650', 'oauth_token', '1127121421-aPHZHQ5BCUoqfHER2UYhQYUEm0zPEMr9xJYizXl', 'oauth_version', '1.0');
    }
*/
        // addResult(results[i], i);
      }
       console.log(JSON.stringify(nearestPlaces));
        //twitterApiCall.getOauth();
        $(function(){
            $.ajax({
                url: '/twitter', //the URL to your node.js server that has data
                dataType: 'json',
                cache: false
            }).done(function(data){
                //"data" will be JSON. Do what you want with it.
                alert(data);
            });
        });
       console.log(markers.length, results.length);
    }
  });
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
  var country = document.getElementById('country').value;
  if (country == 'all') {
    autocomplete.setComponentRestrictions([]);
    map.setCenter({lat: 15, lng: 0});
    map.setZoom(2);
  } else {
    autocomplete.setComponentRestrictions({'country': country});
    map.setCenter(countries[country].center);
    map.setZoom(countries[country].zoom);
  }
  // clearResults();
  clearMarkers();
}

function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
  var marker = this;
  console.log(marker.placeResult.place_id);
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        console.log("hi");
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.log(status);
          // return;
        }
        console.log(status);
        infoWindow.open(map, marker);
        buildIWContent(place);
      });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
  document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
      'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
      '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;

  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = '';
    document.getElementById('iw-phone').textContent =
        place.formatted_phone_number;
  } else {
    document.getElementById('iw-phone-row').style.display = 'none';
  }

  // Assign a five-star rating to the hotel, using a black star ('&#10029;')
  // to indicate the rating the hotel has earned, and a white star ('&#10025;')
  // for the rating points not achieved.
  if (place.rating) {
    var website = "http://localhost:3006/twitter"
    document.getElementById('iw-rating-row').style.display = '';
    document.getElementById('iw-rating').innerHTML = website;
  } else {
    document.getElementById('iw-rating-row').style.display = 'none';
  }

  // The regexp isolates the first part of the URL (domain plus subdomain)
  // to give a short URL for displaying in the info window.
  if (place.website) {
    var fullUrl = place.website;
    var website = hostnameRegexp.exec(place.website);
    if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
    }
    document.getElementById('iw-website-row').style.display = '';
    document.getElementById('iw-website').textContent = website;
  } else {
    document.getElementById('iw-website-row').style.display = 'none';
  }
}
