const apiKey = "9bf9b1d02371cd843effd1405ce6e199";

document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
        .then(response => response.json())
        .then(data => displayWeather(data));
}

function displayWeather(data) {
    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = Math.round(data.wind.speed);

    const icon = document.getElementById("weatherIcon");
    const weatherId = data.weather[0].id;
    
    // FIX: Use safe OpenWeather icon set (never region-blocked)
    const openWeatherIcon = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${openWeatherIcon}@2x.png`;

    // Themes
    if (weatherId >= 200 && weatherId < 300) {
        setTheme("rainy");
    } else if (weatherId >= 300 && weatherId < 600) {
        setTheme("rainy");
    } else if (weatherId >= 600 && weatherId < 700) {
        setTheme("snowy");
    } else if (weatherId >= 700 && weatherId < 800) {
        setTheme("cloudy");
    } else if (weatherId === 800) {
        setTheme("sunny");
    } else {
        setTheme("cloudy");
    }

    document.getElementById("weatherBox").classList.add("fade");
}

// Change page background
function setTheme(theme) {
    document.body.className = theme;
}
