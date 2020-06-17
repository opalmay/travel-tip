'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { icons } from './icons.js';


function onGoToMyLocation() {
    locService.getPosition().then(location => onGoToLocation(location.coords.latitude, location.coords.longitude))
}

function getLocationStr(lat, lng) {
    var prmLocation = mapService.getAnsWithAxios(lat, lng);
    prmLocation.then((locationStr) => {
        renderLocationStr(locationStr)
    })
}

function onGoToLocation(lat, lng) {
    getLocationStr(lat, lng);
    mapService.panTo({ lat, lng });
    mapService.addMarker({ lat, lng });
    weatherService.getWeather(lat, lng).then((weather) => renderWeather(weather));
}

function renderLocationStr(locationName) {
    document.querySelector('.currLocation span').innerText = locationName.results[0].formatted_address;
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
window.onload = () => {
    document.querySelector('.myLocation').addEventListener('click', onGoToMyLocation);
    mapService.initMap()
        .then(() => {
            onGoToMyLocation();
        })
        .catch(console.log('INIT MAP ERROR'));
    // locService.getPosition()
    //     .then(pos => {
    //         myLocation(pos)
    //     })
    // .catch(err => {
    //     console.log('err!!!', err);
    // })
    document.querySelector('.my-location-go').addEventListener('click', print);
}

function print() {
    console.log(document.querySelector('#my-location-input').value);
}
