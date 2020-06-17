'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { icons } from './icons.js';


function onGoToMyLocation() {
    locService.getPosition().then(location => onGoToLocation(location.coords.latitude, location.coords.longitude))
}
function onGoToLocation(lat, lng) {
    mapService.panTo({ lat, lng });
    mapService.addMarker({ lat, lng });
    renderLocation('test');
    weatherService.getWeather(lat, lng).then((weather) => renderWeather(weather));
}
<<<<<<< HEAD
=======
function renderLocation(locationName) {
    document.querySelector('.currLocation span').innerText = locationName;
}
>>>>>>> c07b8cfe52ea1ad62a583a25e02a88c1fe5a82e6
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
<<<<<<< HEAD
    // document.querySelector('myLocation').addEventListener('click', onGoToMyLocation);
    weatherService.getWeather(32.0749831, 34.9120554).then((ans) => {
        console.log(ans)
        renderWeather(ans);
    });
=======
    document.querySelector('.myLocation').addEventListener('click', onGoToMyLocation);

>>>>>>> c07b8cfe52ea1ad62a583a25e02a88c1fe5a82e6
    mapService.initMap()
        .then(() => {
            onGoToMyLocation();
        })
        .catch(console.log('INIT MAP ERROR'));
<<<<<<< HEAD

    locService.getPosition()
        .then(pos => {
            console.log(pos.coords)
            console.log('User position is:', pos.coords);
            var prmAns = mapService.getAnsWithAxios(pos.coords.latitude, pos.coords.longitude);
            prmAns.then((ans) => {
                document.querySelector('.currLocation').innerText = ans.results[0].formatted_address;
                console.log(ans.results[0].formatted_address)
            })

        })

        .catch(err => {
            console.log('err!!!', err);
        })
    document.querySelector('.my-location-go').addEventListener('click', print);
}


function print() {
    console.log(document.querySelector('#my-location-input').value);
}
=======
}
>>>>>>> c07b8cfe52ea1ad62a583a25e02a88c1fe5a82e6
