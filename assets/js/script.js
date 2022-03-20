var apiKey = "b7cb10fae970f7e32c3f69de9957c1ae";

var cityForecast = document.querySelector("#cityForecast");
var todayCityForecast = document.querySelector("#todayCityForecast");
var currentWeather = document.querySelector("#currentWeather");
var fiveDay = document.querySelector("#fiveDay");
var citySearchForm = document.querySelector("#citySearchForm");
var search = document.querySelector("#search");
var cityInput = document.querySelector("#city");

//capture city input
var targetCity = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    
    //Display city weather
    weatherCap(city);

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
    //var icon = document.createElement("img");
    //icon.textContent = (weather.weather[0].icon.value);
    //console.log(icon);
    //icon.setAttribute("src", 'https://openweathermap.org/img/wn/10d.png');
    //cityForecast.appendChild(icon);

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
    uvIndex.textContent = "Today's UV Index is: " + weather.current.uvi;
    currentWeather.appendChild(uvIndex);

}



citySearchForm.addEventListener("submit", targetCity);
