// Krasnaya Polyana`s coordinates:
const LAT = 43.68;
const LON = 40.25;

const API_KEY = "ad18ff83e7a5532d6104bf91da401a88";
const UNITS = "metric";

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

async function getWeatherData() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      let data = await response.json();
      displayCurrentWeather(data);
      displayForecast(data);
      displayOtherInfo(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(data) {

  document.querySelector(".current-weather-card").innerHTML += `
        <h3>Current Weather</h3><hr>
        <div class="info-current-weather">
            <img id="weather-icon"
                src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"
                alt="${data.list[0].weather[0].main}"
                width="96"
                height="96">
            <div class="info-weather">
                <p id="current-desc">${capitalizeWords(data.list[0].weather[0].description)}</p>
                <p id="current-temp">Temp:<b>${Math.round(data.list[0].main.temp)}°C</b></p>
                <p id="feels-like">Feels Like:<b>${Math.round(data.list[0].main.feels_like)}°C</b></p>
                <p id="temp-max">Max: <b>${Math.round(data.list[0].main.temp_max)}°C</b></p>
                <p id="temp-min">Min: <b>${Math.round(data.list[0].main.temp_min)}°C</b></p>                
            </div>
        </div>`;
}

function displayForecast(data) {
  // 8 timestamps per day -> FIRST_DAY = 0, SECOND_DAY = 8, 
  //        THIRD_DAY = 16, FOURTH_DAY = 24, FIFTH_DAY = 32;
  const FIRST_DAY = 0;
  const SECOND_DAY = 8;
  const THIRD_DAY = 16;
  const FOURTH_DAY = 24;
  const FIFTH_DAY = 32;
  
  let firstDayName = utsToLocalDay(data.list[FIRST_DAY].dt);
  let secondDayName = utsToLocalDay(data.list[SECOND_DAY].dt);
  let thirdDayName = utsToLocalDay(data.list[THIRD_DAY].dt);
  let fourthDayName = utsToLocalDay(data.list[FOURTH_DAY].dt);
  let fifthDayName = utsToLocalDay(data.list[FIFTH_DAY].dt);

  document.querySelector(".weather-forecast-card").innerHTML += `
    <h3>Weather Forecast</h3><hr>
    <div class="info-weather-forecast">
        <p id="first-day">${firstDayName}: <b>${Math.round(
            data.list[FIRST_DAY].main.temp)}°C</b>
        </p>
        <p id="second-day">${secondDayName}: <b>${Math.round(
            data.list[SECOND_DAY].main.temp)}°C</b>
        </p>
        <p id="third-day">${thirdDayName}: <b>${Math.round(
            data.list[THIRD_DAY].main.temp)}°C</b>
        </p>
        <p id="fourth-day">${fourthDayName}: <b>${Math.round(
            data.list[FOURTH_DAY].main.temp)}°C</b>
        </p>
        <p id="fifth-day">${fifthDayName}: <b>${Math.round(
            data.list[FIFTH_DAY].main.temp)}°C</b>
        </p>
    </div>`;
}

function displayOtherInfo(data) {
  // Coefficient: 1 hPa ≈ 0.75 mmHg
  const PRESSURE_COEF = 0.75
  let sunriseUnixTime = data.city.sunrise;
  let formattedSunriseTime = utsToLocalTime(sunriseUnixTime);
  let sunsetUnixTime = data.city.sunset;
  let formattedSunsetTime = utsToLocalTime(sunsetUnixTime);
  document.querySelector(".other-info-card").innerHTML += `
    <h3>Other Info</h3><hr>
    <div class="info-weather-other">
        <p id="wind">Wind: <b>${Math.round(data.list[0].wind.speed)} m/s</b></p>
        <p id="humidity">Humidity: <b>${Math.round(data.list[0].main.humidity)} %</b></p>
        <p id="pressure">Pressure: <b>${Math.round(data.list[0].main.pressure * PRESSURE_COEF)} mmHg</b></p>
        <p id="sunrise">Sunrise: <b>${formattedSunriseTime}</b></p>
        <p id="sunset">Sunset: <b>${formattedSunsetTime}</b></p>
    </div>`;
}

function capitalizeWords(str) {
    return str.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
}

function utsToLocalTime(utsTime) {
    let unixTimeMillis = utsTime * 1000;
    let date = new Date(unixTimeMillis);
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());
    return `${hours}:${minutes}`;
}

function utsToLocalDay(utsTime) {
    let unixTimeMillis = utsTime * 1000;
    let date = new Date(unixTimeMillis);
    let dayOfWeekNumbers = date.getUTCDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[dayOfWeekNumbers];
}

export default getWeatherData;
