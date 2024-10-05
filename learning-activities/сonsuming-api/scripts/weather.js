const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const lat = 49.75;
const lon = 6.64;
const apiKey = "ad18ff83e7a5532d6104bf91da401a88";
const units = "metric";

const url =
  `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    console.log(response); // for testing response object
    if (response.ok) {
      const data = await response.json();
      console.log(data); // for testing json object
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", `${desc}`);
  captionDesc.textContent = `${desc}`;
}

apiFetch();
