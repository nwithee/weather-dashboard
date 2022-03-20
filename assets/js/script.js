var apiKey = "b7cb10fae970f7e32c3f69de9957c1ae";

var cityForecast = document.querySelector("#cityForecast");
var todayCityForecast = document.querySelector("#todayCityForecast");
var currentWeather = document.querySelector("#currentWeather");
var fiveDay = document.querySelector("#fiveDay");
var citySearchForm = document.querySelector("#citySearchForm");
var search = document.querySelector("#search");
var cityInput = document.querySelector("#city");
var fiveDayBlocks = document.querySelector("#fiveDayBlocks");

//capture city input
var targetCity = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    
    //Display city weather
    weatherCap(city);

    //Dispaly five day forecast
    fiveDayCap(city);

    localStorage.setItem("cities", JSON.stringify(city));
};

//capture city weather
var weatherCap = function (city) {
    var capturecityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(capturecityUrl).then(function(response){
        if(response.ok){
            city = city.toUpperCase();
            response.json().then(function(data){
                var cityLat = data.coord.lat;
                var cityLong = data.coord.lon;
                var captureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&units=imperial&appid=" + apiKey;

                fetch(captureUrl).then(function(response){
                    response.json().then(function(data){
                        displayWeather(data,city);
                    })
                })
            });
        }
        else {
            alert("You have entered an invalid city");
        }
    });
};

//Display today's weather
var displayWeather = function (weather, citySearch){
    console.log (weather);
    
    //clear previous weather values
    currentWeather.textContent = "";

    //Set city for forecast
    todayCityForecast.textContent = citySearch;

    //Set current date for forecast
    var currentDate = document.createElement("span");
    currentDate.textContent = moment(weather.current.dt.value).format(": MMM D, YYYY");
    todayCityForecast.appendChild(currentDate);

    //Display current weather icon
    var icon = document.createElement("img");
    //icon.textContent = (weather.weather[0].icon.value);
    //icon.setAttribute("src", 'https://openweathermap.org/img/wn/10d.png');
    //icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    todayCityForecast.appendChild(icon);

    //Get and display temp
    var temp = document.createElement("span");
    temp.textContent = "Today's Temperature: " + weather.current.temp + " F";
    currentWeather.appendChild(temp);

    //Get and display wind conditions
    var wind = document.createElement("span");
    wind.textContent = "Today's Wind Direction and Speed: " + weather.current.wind_deg + " degrees " + weather.current.wind_speed + " MPH";
    currentWeather.appendChild(wind);

    //Get and display Humidity
    var humidity = document.createElement("span");
    humidity.textContent = "Today's Humidity is: " + weather.current.humidity;
    currentWeather.appendChild(humidity);

    //Get and display UV Index details
    var uvIndex = document.createElement("span");
    uvIndexNumber = weather.current.uvi;
    uvIndexNumber.classList = "text-success";
    uvIndex.textContent = "Today's UV Index is: " + uvIndexNumber;
    uvIndex.classList = "text-success";
    currentWeather.appendChild(uvIndex);

}

//capture city five day forecast
var fiveDayCap = function (city) {
    var capturecityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(capturecityUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var cityLat = data.coord.lat;
                var cityLong = data.coord.lon;
                var captureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&units=imperial&appid=" + apiKey;

                fetch(captureUrl).then(function(response){
                    response.json().then(function(data){
                        displayFiveDay(data);
                    })
                })
            });
        }
        else {
            alert("You have entered an invalid city");
        }
    });
};

var displayFiveDay = function(weather){
    //Clear previous five day blocks
    fiveDayBlocks.textContent = "";

    var forecast = weather.daily;
        for (var i = 0; i < 5; i++){
            var dayForecast = forecast[i];

            var forecastCard = document.createElement("div");
            forecastCard.classList = "card bg-secondary text-light";

            //Display date in card
            var forecastDate = document.createElement("h4");
            forecastDate.textContent = moment.unix(dayForecast.dt).format("MMM D, YYYY");
            forecastDate.classList = "card-header text-center";
            forecastCard.appendChild(forecastDate);

            //Display weather icon
            var forecastIcon = document.createElement("img");
            forecastIcon.classList = "card-body text-center";
            forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`);
            forecastCard.appendChild(forecastIcon);

            //Display high temperature
            var forecastTemp = document.createElement("p");
            forecastTemp.classList = "card-body text-center";
            forecastTemp.textContent = "High: "+ dayForecast.temp.max + " F"
            forecastCard.appendChild(forecastTemp);

            //Display low temperature
            var forecastTemp = document.createElement("p");
            forecastTemp.classList = "card-body text-center";
            forecastTemp.textContent = "Low: "+ dayForecast.temp.min + " F"
            forecastCard.appendChild(forecastTemp);

            //Display windspeed
            var forecastWind = document.createElement("p");
            forecastWind.classList = "card-body text-center";
            forecastWind.textContent = "Wind: "+ dayForecast.wind_speed + " MPH";
            forecastCard.appendChild(forecastWind);

            //Display humidity
            var forecastHumidity = document.createElement("p");
            forecastHumidity.classList = "card-body text-center";
            forecastHumidity.textContent = "Humidity: "+ dayForecast.humidity;
            forecastCard.appendChild(forecastHumidity);

            //Display all details in each block
            fiveDayBlocks.appendChild(forecastCard);
            
        }
}

citySearchForm.addEventListener("submit", targetCity);
