var apiKey = "b7cb10fae970f7e32c3f69de9957c1ae";

var cityForecast = document.querySelector("#cityForecast");
var fiveDay = document.querySelector("fiveDay");


//capture city weather
var weatherCap = function (city) {
    var city ="Minneapolis"
    var captureUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(captureUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayWeather(data, city);
            });
        }
        else {
            alert("You have entered an incorrect city")
        }
    });
};

var displayWeather = function (weather, citySearch){
    console.log (weather);
    
    //Set city for forecast
    cityForecast.textContent = citySearch;

    //Set current date for forecast
    var currentDate = document.createElement("span");
    currentDate.textContent = moment(weather.dt.value).format("MMM D, YYYY");
    cityForecast.appendChild(currentDate);

    //Display current weather icon
    //var icon = document.createElement("img");
    //icon.setAttribute (weather[0].icon.value);
    //console.log(icon);
    //icon.setAttribute("src", 'https://openweathermap.org/img/wn/10d.png');
    //cityForecast.appendChild(icon);

    var temp = document.createElement("span")
    temp.textContent = "Today's Temperature: " + weather.main.temp + "F";
    cityForecast.appendChild(temp);



}

weatherCap();