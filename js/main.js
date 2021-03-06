'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { icons } from './icons.js';

var lastLocation;
function onGoToMyLocation() {
    locService.getPosition().then(location => onGoToLocation(location.coords.latitude, location.coords.longitude))
}

function getLocationStr(lat, lng) {
    var prmLocation = mapService.getAddressWithAxios(lat, lng);
    prmLocation.then((locationStr) => {
        renderLocationStr(locationStr)
    })
}

function getLatLngNewLocation(address) {
    var prmLatLng = mapService.getLatLngWithAxios(address);
    prmLatLng.then((coords) => {
        onGoToLocation(coords.results[0].geometry.location.lat, coords.results[0].geometry.location.lng)
    })

}
function onGoToLocation(lat, lng) {
    lastLocation = { lat, lng };
    getLocationStr(lat, lng);
    mapService.panTo({ lat, lng });
    mapService.clearMarkers(); 
    mapService.addMarker({ lat, lng });
    weatherService.getWeather(lat, lng).then((weather) => renderWeather(weather));
}

function renderLocationStr(locationName) {
    let locationResult = locationName.results;
    let locationStr = 'Not Found';
    if (locationResult.length !== 0) locationStr = locationName.results[0].formatted_address;
    document.querySelector('.currLocation span').innerText = locationStr;
}

function renderWeather(weather) {
    let elWeather = document.querySelector('.weather');

    let firstLine = elWeather.querySelector('.weatherFirstLine');
    firstLine.innerHTML = `<span>${weather.name}, ${weather.sys.country}</span> ${weather.weather[0].description}`;

    let secondLine = elWeather.querySelector('.weatherSecondLine');
    secondLine.innerHTML = `<span>${weather.main.temp}C</span> temperature from ${weather.main.temp_min} to ${weather.main.temp_max}C,
    wind ${weather.wind.speed} m/s`;

    renderIcon();
    function renderIcon() {
        var weatherIcons = JSON.parse(icons);
        var prefix = 'wi-';
        var code = weather.weather[0].id;
        var icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        icon = prefix + icon;
        document.querySelector('img').src = `svg/${icon}.svg`;
    }
}
function onCopyLocation() {
    navigator.clipboard.writeText(`opalmay.github.io/travel-tip/index.html?lat=${lastLocation.lat}&lng=${lastLocation.lng}`);
    // navigator.clipboard.writeText(`http://127.0.0.1:5500/index.html?lat=${lastLocation.lat}&lng=${lastLocation.lng}`);
    showToast();
}
window.onload = () => {
    document.querySelector('.myLocation').addEventListener('click', onGoToMyLocation);
    document.querySelector('.copyLocation').addEventListener('click', onCopyLocation);
    document.querySelector('.my-location-go').addEventListener('click', newAddress);
    document.querySelector('#my-location-input').addEventListener('keyup', (event) => { if (event.keyCode === 13) newAddress(); });

    const urlParams = new URLSearchParams(window.location.search);
    const lat = +urlParams.get('lat');
    const lng = +urlParams.get('lng');
    mapService.initMap()
        .then(() => {
            if (lat && lng) onGoToLocation(lat, lng);
            else onGoToMyLocation();
        })
        .catch(console.log('INIT MAP ERROR'));
}

function newAddress() {
    getLatLngNewLocation(document.querySelector('#my-location-input').value);
}
function showToast() {
    var x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
}