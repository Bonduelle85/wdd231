const membersUrl =
  "https://bonduelle85.github.io/wdd231/chamber/data/members.json";

const memberCards = document.querySelector("article");

async function getMembersData() {
  let response = await fetch(membersUrl);
  let data = await response.json();
  let members = data.members;

  displayBusinessMembers(members);
}

const displayBusinessMembers = (members) => {
  members.forEach((member) => {
    let card = document.createElement("section");
    card.classList.add("member-card");

    let name = document.createElement("h3");
    name.textContent = `${member.name}`;

    let membershipLevel = document.createElement("p");
    membershipLevel.classList.add("membership-level");
    membershipLevel.textContent = `Mship: ${member.membership_level}`;

    let line = document.createElement("hr");

    let portraitInfoContainer = document.createElement("div");
    portraitInfoContainer.classList.add("portrait-info-container");

    let portrait = document.createElement("img");
    portrait.classList.add("member-portrait");
    portrait.setAttribute("src", member.image);
    portrait.setAttribute("alt", `Portrait of the ${member}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "50");
    portrait.setAttribute("height", "50");

    let email = document.createElement("p");
    email.classList.add("member-email");
    email.textContent = `${member.email}`;

    let phone = document.createElement("p");
    phone.classList.add("member-phone");
    phone.textContent = `${member.phone_number}`;

    let url = document.createElement("p");
    url.classList.add("membership-url");
    url.textContent = `${member.website}`;

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    infoContainer.appendChild(email);
    infoContainer.appendChild(phone);
    infoContainer.appendChild(url);

    portraitInfoContainer.appendChild(portrait);
    portraitInfoContainer.appendChild(infoContainer);

    card.appendChild(name);
    card.appendChild(membershipLevel);
    card.appendChild(line);
    card.appendChild(portraitInfoContainer);

    memberCards.appendChild(card);
  });
};

// Burger
const hamButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#animation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

// Display type
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
  memberCards.classList.add("grid");
  memberCards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  memberCards.classList.add("list");
  memberCards.classList.remove("grid");
});

// Weather
const weatherIcon = document.querySelector("#weather-icon");
const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("#current-desc");
const maxTemp = document.querySelector("#temp-max");
const minTemp = document.querySelector("#temp-min");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const lat = 55.76;
const lon = 37.62;
const apiKey = "ad18ff83e7a5532d6104bf91da401a88";
const units = "metric";

const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function getWeatherData() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // for testing json object
      displayWeather(data);
      // displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(data) {
  let iconSrc = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", `${data.list[0].weather[0].main}`);

  currentTemp.innerHTML = `<p><b>${data.list[0].main.temp}</b>°C</p>`;
  currentDesc.innerHTML = `${data.list[0].weather[0].description}`;
  maxTemp.innerHTML = `<p>Max: ${data.list[0].main.temp_max}°C</p>`;
  minTemp.innerHTML = `<p>Min: ${data.list[0].main.temp_min}°C</p>`;

  let sunriseUnixTime = data.city.sunrise;
  let formattedSunriseTime = utsToLocalTime(sunriseUnixTime);
  sunrise.innerHTML = `Sunrise: ${formattedSunriseTime}`;

  let sunsetUnixTime = data.city.sunset;
  let formattedSunsetTime = utsToLocalTime(sunsetUnixTime);
  sunset.innerHTML = `Sunset: ${formattedSunsetTime}`;
}
function displayForecast(data) {}

function utsToLocalTime(utsTime) {
  let unixTimeMillis = utsTime * 1000;
  let date = new Date(unixTimeMillis);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Footer
document.querySelector(
  "#current-year"
).innerHTML = `&copy ${new Date().getFullYear()}`;
document.querySelector(
  "#last-modified"
).innerHTML = `Last Update: ${document.lastModified}`;

// init
getWeatherData();
getMembersData();
