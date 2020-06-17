//3bde70a5cfe0bfcf4827a51e338cf54f
//http://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&appid=3bde70a5cfe0bfcf4827a51e338cf54f

export const weatherService = {
    getWeather
}
export function getWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if(httpRequest.status === 200){
                const ans = JSON.parse(httpRequest.responseText);
                resolve(ans);
                }
                
            }
        }

        httpRequest.open('GET', `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3bde70a5cfe0bfcf4827a51e338cf54f`, true);
        httpRequest.send();
    });
}