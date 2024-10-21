// Weather
const lat = 43.68;
const lon = 40.25;
const apiKey = "ad18ff83e7a5532d6104bf91da401a88";
const units = "metric";

const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function getWeatherData() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      displayWeather(data);
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(data) {
  let sunriseUnixTime = data.city.sunrise;
  let formattedSunriseTime = utsToLocalTime(sunriseUnixTime);
  let sunsetUnixTime = data.city.sunset;
  let formattedSunsetTime = utsToLocalTime(sunsetUnixTime);

  document.querySelector(".current-weather-card").innerHTML += `
        <h3>Current Weather</h3>
          <div class="info-current-weather">
            <img id="weather-icon"
              src="https://openweathermap.org/img/wn/${
                data.list[0].weather[0].icon
              }@2x.png"
              alt="${data.list[0].weather[0].main}"
              width="96"
              height="96"
            >
            <div class="info-weather">
              <p id="current-temp">Temp:<b>${Math.round(
                data.list[0].main.temp
              )}</b>°C</p>
              <p id="current-desc">${capitalizeWords(
                data.list[0].weather[0].description
              )}</p>
              <p id="temp-max">Max: ${Math.round(
                data.list[0].main.temp_max
              )}°C</p>
              <p id="temp-min">Min: ${Math.round(
                data.list[0].main.temp_min
              )}°C</p>
              <p id="sunrise">Sunrise: ${formattedSunriseTime}</p>
              <p id="sunset">Sunset: ${formattedSunsetTime}</p>
            </div>
          </div>
  `;
}

function displayForecast(data) {
  // 8 timestamps per day -> FIRST_DAY = 0, SECOND_DAY = 8, THIRD_DAY = 16
  let FIRST_DAY = 0;
  let SECOND_DAY = 8;
  let THIRD_DAY = 16;
  let firstDay = document.querySelector("#first-day");
  let secondDay = document.querySelector("#second-day");
  let thirdDay = document.querySelector("#third-day");

  let firstDayName = utsToLocalDay(data.list[FIRST_DAY].dt);
  firstDay.innerHTML = `<p>${firstDayName}: <b>${Math.round(
    data.list[FIRST_DAY].main.temp
  )}</b>°C</p>`;
  let secondDayName = utsToLocalDay(data.list[SECOND_DAY].dt);
  secondDay.innerHTML = `<p>${secondDayName}: <b>${Math.round(
    data.list[SECOND_DAY].main.temp
  )}</b>°C</p>`;
  let thirdDayName = utsToLocalDay(data.list[THIRD_DAY].dt);
  thirdDay.innerHTML = `<p>${thirdDayName}: <b>${Math.round(
    data.list[THIRD_DAY].main.temp
  )}</b>°C</p>`;
}

function capitalizeWords(str) {
  return str
    .split(" ")
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
