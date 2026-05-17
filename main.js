let apiKey = getApiKey();

function showClock(data) {
    const clock = document.querySelector('#time');
    const rawData = new Date(data);
    clock.textContent = rawData.toLocaleTimeString();
    // setTimeout(showClock(data), 2000);
}


function getWeather() {
    let location = document.querySelector("#inputField");
    let searchedLocation = document.querySelector("#location")
    let tempValue = document.querySelector("#temp");
    let day = document.querySelector("#day");
    let currentTimeOfDay = document.querySelector("#timeOfDay ");
    let windSpeed = document.querySelector("#windSpeed");
    let humidity = document.querySelector("#humidity");
    let sunRise = document.querySelector("#sunRise");
    let sunSet = document.querySelector("#sunSet");
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const timeOfDay = ["Night", "Day"]
    let date = document.querySelector("#monthAndDate");

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.value || "Jos"}&limit=5&appid=${apiKey}`,
        {
            method: "GET",
        })
        .then((locationResponse) => locationResponse.json())
        .then((locationData) => {
            let lat = locationData[0].lat;
            let lon = locationData[0].lon;
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code&hourly=temperature_2m,showers,rain,weather_code,snowfall,relative_humidity_2m,apparent_temperature,snow_depth,visibility,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,precipitation,wind_speed_10m,wind_direction_10m,snowfall,weather_code,cloud_cover&timezone=auto&forecast_days=7`, {
                method: "GET"
            })
            .then((weatherResponse) => weatherResponse.json())
            .then((weatherData) => {
                tempValue.textContent = `${weatherData.current.apparent_temperature} ${weatherData.current_units.apparent_temperature}`;
                let rawTime = new Date(weatherData.current.time);
                day.textContent = days[rawTime.getDay()];
                date.textContent = `${months[rawTime.getMonth()]} ${rawTime.getDate()}`;
                showClock(rawTime)
                searchedLocation.textContent = locationData[0].name;
                currentTimeOfDay.textContent = timeOfDay[weatherData.current.is_day];
                windSpeed.textContent = `Wind speed:${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`
                humidity.textContent = `Humidity: ${weatherData.current.relative_humidity_2m} ${weatherData.current_units.relative_humidity_2m}`
                sunRise.textContent = `SR:${new Date(weatherData.daily.sunrise[0]).toLocaleTimeString()}`
                sunSet.textContent = `SS:${new Date(weatherData.daily.sunset[0]).toLocaleTimeString()}`

                
            })
        });
    
    location.value = "";

}



let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", (e) => {
    getWeather()
    
});


document.addEventListener("DOMContentLoaded", () => {
    getWeather();

})

