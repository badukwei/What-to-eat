const finnalPick = document.getElementById('finnalPick');
const selectButton = document.querySelector('.select-button');
let map, service, pos;
let markers = [];

//To do: animation, info and marker of restaurant chosen, text slot  
//網址、input設定

function initMap() {
  let taiwan = new google.maps.LatLng(25.105497, 121.597366);

  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: taiwan,
    zoom: 15
  });

  locateNow();

  const infoFunction = () => {
    
  }
};

const locateNow = () => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(pos);
        findRestaurantsNearby();
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
};

const findRestaurantsNearby = () => {
  let request = {
    location: pos,
    radius: '1000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

};

const callback = (results, status) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    let restaurantList = [];
    addMarker(pos);
    console.log(results[0]);
    for (let i = 0; i < results.length; i++) {
      restaurantList.push(results[i].name);
    }

    selectButton.addEventListener('click', function () {
      finnalPick.innerHTML = restaurantList[Math.floor((Math.random() * restaurantList.length))];
      for (let j = 0; j < results.length; j++) {
        if (results[j].name == finnalPick.innerHTML) {
          addMarker(results[j].geometry.location);
          map.setCenter(results[j].geometry.location);
        }
      }
      if (finnalPick.classList.contains('fade-1')) {
        finnalPick.classList.remove('fade-1');
        finnalPick.classList.add('fade-2');
      } else {
        finnalPick.classList.remove('fade-2');
        finnalPick.classList.add('fade-1');
      }
    })
  }
};

//Marker's functions
//Add markers and reset the markers'array 
const addMarker = (location) => {
  deleteMarkers();
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true,
  });
  markers.push(marker);
  console.log(markers);
}

// Sets the map on all markers in the array.
const setMapOnAll = (mapIn) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(mapIn);
  }
}

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = () => {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}








