// let apiKey = getApiKey();
let apiKey = "5f612cd26cf0b027b48fd7d44d819a0c"

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
    let bg = document.querySelector("#weatherBg"); //might remove
    let bgVideo = document.querySelector("#bg-video")
    let weatherCondition =document.querySelector("#weatherCondition");
    let foreDiv = document.querySelector("#fore");


    const weatherCodes = {
      0: "Clear sky",

      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",

      45: "Fog",
      48: "Depositing rime fog",

      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",

      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",

      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",

      66: "Light freezing rain",
      67: "Heavy freezing rain",

      71: "Slight snowfall",
      73: "Moderate snowfall",
      75: "Heavy snowfall",

      77: "Snow grains",

      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",

      85: "Slight snow showers",
      86: "Heavy snow showers",

      95: "Thunderstorm",

      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

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
                windSpeed.textContent = `Wind speed:${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`;
                humidity.textContent = `Humidity: ${weatherData.current.relative_humidity_2m} ${weatherData.current_units.relative_humidity_2m}`;
                weatherCondition.textContent = weatherCodes[weatherData.current.weather_code];
                sunRise.textContent = `${new Date(weatherData.daily.sunrise[0]).toLocaleTimeString()}`;
                sunSet.textContent = `${new Date(weatherData.daily.sunset[0]).toLocaleTimeString()}`;

                if(weatherData.current.is_day == 0) {
                    bgVideo.setAttribute("src", "/src/assets/vid/night1.mp4")
                }else {
                    bgVideo.setAttribute("src", "/src/assets/vid/day1.mp4")
                }
                
                let forecastSection = document.querySelector("#forecastSection");
                forecastSection.innerHTML = "";
                days.forEach((data, i) => {
                    let forecastDiv = document.createElement("div");
                    forecastDiv.setAttribute("class", "flex flex-col gap-2.5 p-2.5 text-center rounded-md shadow-sm shadow-gray-600")
                    forecastDiv.innerHTML = `
                    <div class="flex justify-between">
                    <p id="weeklyDay">${days[new Date(weatherData.daily.time[i]).getDay()]}</p>
                    <div class="flex justify-center gap-1.5">
                        <p id="weeklyMonth">${months[new Date(weatherData.daily.time[i]).getMonth()]}</p>
                        <p id="weeklyDate">${new Date(weatherData.daily.time[i]).getDate()}</p>
                    </div>
                    </div>
                
                    <p id="weeklyCondition" class="bg-white p-2 flex justify-end items-center rounded-md max-w-fit">${weatherCodes[weatherData.daily.weather_code[i]]}</p>

                    <div class="flex justify-between text-sm text-[#555552]">
                        <p>Min-Temp: <span id="minTemp">${weatherData.daily.temperature_2m_min[i]}${weatherData.daily_units.temperature_2m_min}</span></p>
                        <p>Max-Temp: <span id="maxTemp">${weatherData.daily.temperature_2m_max[i]}${weatherData.daily_units.temperature_2m_max}</span></p>
                    </div>`;
                    forecastSection.appendChild(forecastDiv);
                });
 
            })
            .catch((error) => {
                alert(error)
            })
            
        })
        .catch((error) => {
            alert(error)
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





