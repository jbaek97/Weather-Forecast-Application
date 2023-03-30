var cityName = [];
var zipcode = "";
var latitude = "";
var longitude = "";
var apiCall = "";
var apiKey = "4125cec9b57f7e08d393563e3c0b9459" ;
var input = document.getElementById("cityEntry");
console.log(input);
var submitButton = document.querySelector(".submit");
console.log(submitButton);
var searchResult = "" ;
var weatherReport = document.querySelector(".weatherReport");
console.log(weatherReport);
var mainWeatherCard = document.querySelector(".mainWeatherCard")
var pastSearches = document.querySelector('.pastSearches');
var weatherCards = $(".weatherCard");
var searchHistory = [];

// Getting Coordinates
function getCoordinates(search) {
    $('li').remove();
    var q = search;
    var apiCallCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${apiKey}`;
    fetch(apiCallCoordinates) 
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Could not convert city that was searched for into coordinates.');
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            latitude = data[0].lat.toString();
            longitude = data[0].lon.toString();
            console.log(latitude);
            console.log(longitude);
            localStorage.setItem('coordinates', JSON.stringify(data));

        })
        .then(function getWeather(coordinates) {
            var coordinate = JSON.parse(localStorage.getItem('coordinates'));
            console.log(coordinate);
            var lat = coordinate[0].lat;
            console.log(lat);
            var lon = coordinate[0].lon;
            console.log(lon);
            var apiCallWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            console.log(apiCallWeather);
            fetch(apiCallWeather) 
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Could not use the latitude and longitude in order to find weather for that city');
                    }
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    localStorage.setItem('weather', JSON.stringify(data));
                })
                .then(function addCurrentWeather(weather) {
                    $('fig').remove();
                    var weatherData = JSON.parse(localStorage.getItem('weather'));
                    console.log(weatherData);
                    var name = weatherData.city.name;
                    console.log(name);
                    var date = weatherData.list[0].dt_txt;
                    console.log(date);
                    var sky = weatherData.list[0].weather[0].icon;
                    console.log(sky);
                    var temp = weatherData.list[0].main.temp;
                    // Convert to faranheit
                    var tempFaranheit = `${temp} °F`
                    console.log(tempFaranheit);
                    var wind = weatherData.list[0].wind.speed;
                    var windSpeed = `${wind} mph`;
                    console.log(windSpeed);
                    var humidity = weatherData.list[0].main.humidity;
                    var humidityPercentage = `${humidity} %`;
                    console.log(humidityPercentage);
                
                    var weatherObject = {
                        Name: name,
                        Date: date,
                        Icon: sky,
                        Temperature: tempFaranheit,
                        Wind: windSpeed,
                        Humidity: humidityPercentage
                    };
                    console.log(weatherObject);
                    mainWeatherCard.innerHTML += `<fig class="currentWeatherCard"><h2>${weatherObject.Name}</h2><h3>${weatherObject.Date}</h3><img src="http://openweathermap.org/img/wn/${weatherObject.Icon}@2x.png"><h3>${weatherObject.Temperature}</h3><h3>${weatherObject.Wind}</h3><h3>${weatherObject.Humidity}</h3></fig>`;
                    localStorage.setItem(`Day 1`, JSON.stringify(weatherObject));}
                )
                .then(function add5DayWeather() {
                    var weatherData = JSON.parse(localStorage.getItem('weather'));
                    console.log(weatherData);
                    for(i = 1; i < 6; i++) {
                    var date = weatherData.list[i].dt_txt;
                    console.log(date);
                    var sky = weatherData.list[i].weather[0].icon;
                    console.log(sky);
                    var temp = weatherData.list[i].main.temp;
                    // Convert to faranheit
                    var tempFaranheit = `${temp} °F`
                    console.log(tempFaranheit);
                    var wind = weatherData.list[i].wind.speed;
                    var windSpeed = `${wind} mph`;
                    console.log(windSpeed);
                    var humidity = weatherData.list[i].main.humidity;
                    var humidityPercentage = `${humidity} %`;
                    console.log(humidityPercentage);
                
                    var weatherObject = {
                        Date: date,
                        Icon: sky,
                        Temperature: tempFaranheit,
                        Wind: windSpeed,
                        Humidity: humidityPercentage
                    };
                    console.log(weatherObject);
                    weatherReport.innerHTML += `<li class="weatherCard"><h3>${weatherObject.Date}</h3><img src="http://openweathermap.org/img/wn/${weatherObject.Icon}@2x.png"><h3>${weatherObject.Temperature}</h3><h3>${weatherObject.Wind}</h3><h3>${weatherObject.Humidity}</h3></li>`;
                    localStorage.setItem(`Day ${i + 1}`, JSON.stringify(weatherObject));
                }
                
                }
                )
        })
};

// Getting Weather 
// function getWeather(coordinates) {
//     var coordinate = JSON.parse(localStorage.getItem('coordinates'));
//     console.log(coordinate);
//     var lat = coordinate[0].lat;
//     console.log(lat);
//     var lon = coordinate[0].lon;
//     console.log(lon);
//     var apiCallWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     console.log(apiCallWeather);
//     fetch(apiCallWeather) 
//         .then(function(response) {
//             if (!response.ok) {
//                 throw new Error('Could not use the latitude and longitude in order to find weather for that city');
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
//             localStorage.setItem('weather', JSON.stringify(data));
//         })
// };

// Adding Current Weather Card
// function addCurrentWeather() {
//     var weatherData = JSON.parse(localStorage.getItem('weather'));
//     console.log(weatherData);
//     var name = weatherData.city.name;
//     console.log(name);
//     var date = weatherData.list[0].dt_txt;
//     console.log(date);
//     var sky = weatherData.list[0].weather[0].icon;
//     console.log(sky);
//     var temp = weatherData.list[0].main.temp;
//     // Convert to faranheit
//     var tempFaranheit = `${temp} °F`
//     console.log(tempFaranheit);
//     var wind = weatherData.list[0].wind.speed;
//     var windSpeed = `${wind} mph`;
//     console.log(windSpeed);
//     var humidity = weatherData.list[0].main.humidity;
//     var humidityPercentage = `${humidity} %`;
//     console.log(humidityPercentage);

//     var weatherObject = {
//         Name: name,
//         Date: date,
//         Icon: sky,
//         Temperature: tempFaranheit,
//         Wind: windSpeed,
//         Humidity: humidityPercentage
//     };
//     console.log(weatherObject);
//     mainWeatherCard.innerHTML += `<fig class="currentWeatherCard"><h2>${weatherObject.Name}</h2><h3>${weatherObject.Date}</h3><img src="http://openweathermap.org/img/wn/${weatherObject.Icon}@2x.png"><h3>${weatherObject.Temperature}</h3><h3>${weatherObject.Wind}</h3><h3>${weatherObject.Humidity}</h3></fig>`;
//     localStorage.setItem(`Day 1`, JSON.stringify(weatherObject));
// }

// Adding 5 Day Weather Cards
// function add5DayWeather() {
//     var weatherData = JSON.parse(localStorage.getItem('weather'));
//     console.log(weatherData);
//     for(i = 1; i < 6; i++) {
//     var date = weatherData.list[i].dt_txt;
//     console.log(date);
//     var sky = weatherData.list[i].weather[0].icon;
//     console.log(sky);
//     var temp = weatherData.list[i].main.temp;
//     // Convert to faranheit
//     var tempFaranheit = `${temp} °F`
//     console.log(tempFaranheit);
//     var wind = weatherData.list[i].wind.speed;
//     var windSpeed = `${wind} mph`;
//     console.log(windSpeed);
//     var humidity = weatherData.list[i].main.humidity;
//     var humidityPercentage = `${humidity} %`;
//     console.log(humidityPercentage);

//     var weatherObject = {
//         Date: date,
//         Icon: sky,
//         Temperature: tempFaranheit,
//         Wind: windSpeed,
//         Humidity: humidityPercentage
//     };
//     console.log(weatherObject);
//     weatherReport.innerHTML += `<li class="weatherCard"><h3>${weatherObject.Date}</h3><img src="http://openweathermap.org/img/wn/${weatherObject.Icon}@2x.png"><h3>${weatherObject.Temperature}</h3><h3>${weatherObject.Wind}</h3><h3>${weatherObject.Humidity}</h3></li>`;
//     localStorage.setItem(`Day ${i + 1}`, JSON.stringify(weatherObject));
// }

// };

// Getting Search 
function getSearch(event) {
    event.preventDefault();
    searchResult = input.value;
    searchHistory.push(searchResult);
    console.log(searchResult);
    getCoordinates(searchResult);
    console.log(latitude);
    // getWeather(coordinates);
    // addCurrentWeather();
    // add5DayWeather();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    var history = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(history);
    for (i = 0; i < history.length; i++) {
        pastSearches.innerHTML += `<li>${history[i]}</li>`;
    }
    return;
};

submitButton.addEventListener('click', getSearch);

