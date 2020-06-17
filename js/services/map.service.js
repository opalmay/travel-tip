
export const mapService = {
    initMap,
    addMarker,
    clearMarkers,
    getAddressWithAxios,
    getLatLngWithAxios,
    panTo
}


var map;
var markers = [];


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        // title: 'Hello World!'
    });
    markers.push(marker);
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyClTPtK0l8IZpFoc1EIcL6YeSKixkCMS_c';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getAddressWithAxios(lat, long) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyClTPtK0l8IZpFoc1EIcL6YeSKixkCMS_c`)
        .then(res => res.data)
}

function getLatLngWithAxios(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=AIzaSyClTPtK0l8IZpFoc1EIcL6YeSKixkCMS_c`)
        .then(res => res.data)
}

function clearMarkers() {
    setMapOnAll(null);
  }

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
