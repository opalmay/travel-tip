'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { icons } from './icons.js';

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
    mapService.panTo({ lat, lng });
}
function renderWeather(weather) {
    let elWeather = document.querySelector('.weather');
    elWeather.querySelector('.weatherFirstLine').innerText = `${weather.name},${weather.sys.country} ${weather.description}`;
    elWeather.querySelector('.weatherSecondLine').innerText = `${weather.main.temp}, temperature from ${weather.main.temp_min} to ${weather.main.temp_max}C,
    wind ${weather.wind.speed} m/s`;
}
window.onload = () => {
    // document.querySelector('myLocation').addEventListener('click', onGoToMyLocation);
    weatherService.getWeather(32.0749831, 34.9120554).then((ans) => {
        console.log(ans)
        renderWeather(ans);
        var weatherIcons = JSON.parse(icons);
        var prefix = 'wi-';
        var code = ans.weather[0].id;
        var icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        icon = prefix + icon;
        console.log(icon);
        document.querySelector('img').src = `svg/${icon}.svg`;
    });
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}