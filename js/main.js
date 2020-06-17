'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

function getLocation() {
    locService.getLocs()
        .then(locs => {
            console.log('locs', locs)
            return locs;//todo coords to place name
        })
}
function renderCurrentLocation(locationName) {
    document.querySelector('.currLocation span').innerText = locationName;
}
function onGoToMyLocation() {
    let location = getLocation();
    onGoToLocation(location.latitude, location.longtitude);
    renderCurrentLocation(location);
}
function onGoToLocation(lat, lng) {
    mapService.addMarker({ lat, lng });
}


// document.querySelector('.btn').addEventListener('click', (ev) => {
//     console.log('Aha!', ev.target);
//     mapService.panTo(35.6895, 139.6917);
// })

window.onload = () => {
    document.querySelector('myLocation').addEventListener('click', onGoToMyLocation);
    // mapService.initMap()
    //     .then(() => {

    //         mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    //     })
    //     .catch(console.log('INIT MAP ERROR'));

    // locService.getPosition()
    //     .then(pos => {

    //         console.log('User position is:', pos.coords);
    //     })
    //     .catch(err => {
    //         console.log('err!!!', err);
    //     })
}