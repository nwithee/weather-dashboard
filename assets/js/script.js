//API Key
var apiKey = "b7cb10fae970f7e32c3f69de9957c1ae";

//Variables
var todayCityForecast = document.querySelector("#todayCityForecast");
var currentWeather = document.querySelector("#currentWeather");
var citySearchForm = document.querySelector("#citySearchForm");
var search = document.querySelector("#search");
var cityInput = document.querySelector("#city");
var forecastHeader = document.querySelector("#forecast");
var fiveDayBlocks = document.querySelector("#fiveDayBlocks");
var oldSearch = document.querySelector("#oldSearch");
var todaysResults = document.querySelector("#todaysResults");

//Capture city input
var targetCity = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    
    //Display city weather
    weatherCap(city);

    //Dispaly five day forecast
    fiveDayCap(city);

    //Add searched city to local storage and create button
    localStorage.setItem("cities", JSON.stringify(city));
    previousSearch(city);

    cityInput.value = "";
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

    todaysResults.classList = "border";

    //Set city for forecast
    todayCityForecast.textContent = citySearch;

    //Set current date for forecast
    var currentDate = document.createElement("span");
    currentDate.textContent = moment(weather.current.dt.value).format(": MMM D, YYYY");
    todayCityForecast.appendChild(currentDate);

    //Display current weather icon
    var icon = document.createElement("img");
    var iconCode = weather.current.weather[0].icon
    icon.setAttribute("src","https://openweathermap.org/img/wn/" + iconCode + "@2x.png");
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
    var uvIndex = document.createElement("div");
    var uvIndexNumber = document.createElement("span");
    var uvIndexValue = weather.current.uvi;

    if(uvIndexValue <=2){
        uvIndexNumber.classList = "bg-success rounded";
    }
    else if (uvIndexValue >2 && uvIndexValue <8){
        uvIndexNumber.classList = "bg-warning rounded";
    }
    else {
        uvIndexNumber.classList = "bg-danger rounded";
    };

    uvIndexNumber.textContent = uvIndexValue;
    uvIndex.textContent = "Today's UV Index is: ";

    uvIndex.appendChild(uvIndexNumber);
    currentWeather.appendChild(uvIndex);

}

//Capture city five day forecast
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
                        displayFiveDay(data,city);
                    })
                })
            });
        }
        else {
            alert("You have entered an invalid city");
        }
    });
};

//Display five day forecast
var displayFiveDay = function(weather, city){
    //Clear previous five day blocks
    fiveDayBlocks.textContent = "";

    //Display Header
    forecastHeader.textContent = "Five Day Forecast";

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
            forecastIcon.classList = "text-center";
            forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`);
            forecastCard.appendChild(forecastIcon);

            //Display high temperature
            var forecastTemp = document.createElement("p");
            forecastTemp.classList = "card-text text-center";
            forecastTemp.textContent = "High: "+ dayForecast.temp.max + " F"
            forecastCard.appendChild(forecastTemp);

            //Display low temperature
            var forecastTemp = document.createElement("p");
            forecastTemp.classList = "card-text text-center";
            forecastTemp.textContent = "Low: "+ dayForecast.temp.min + " F"
            forecastCard.appendChild(forecastTemp);

            //Display windspeed
            var forecastWind = document.createElement("p");
            forecastWind.classList = "card-text text-center";
            forecastWind.textContent = "Wind: "+ dayForecast.wind_speed + " MPH";
            forecastCard.appendChild(forecastWind);

            //Display humidity
            var forecastHumidity = document.createElement("p");
            forecastHumidity.classList = "card-text text-center";
            forecastHumidity.textContent = "Humidity: "+ dayForecast.humidity;
            forecastCard.appendChild(forecastHumidity);

            //Display all details in each block
            fiveDayBlocks.appendChild(forecastCard);
            
        }
}

//Create buttons to display previously searched cities
var previousSearch = function(previousSearch){
    var search = document.createElement("button");
    search.textContent = previousSearch;
    search.classList = "d-flex w-100 btn-dark border rounded p-2";
    search.setAttribute("cities", previousSearch);
    search.setAttribute("type", "submit");

    oldSearch.appendChild(search);
}

//Trigger search after click on previous city
var previousSearchFunction = function(event){
    var oldCity = event.target.getAttribute("cities");
    console.log(oldCity);
    weatherCap(oldCity);
    fiveDayCap(oldCity);
}

citySearchForm.addEventListener("submit", targetCity);
oldSearch.addEventListener("click",previousSearchFunction);
