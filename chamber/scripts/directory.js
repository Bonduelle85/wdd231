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
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
  memberCards.classList.add("grid");
  memberCards.classList.remove("list");
});

listButton.addEventListener("click", () => {
  memberCards.classList.add("list");
  memberCards.classList.remove("grid");
});

// Weather
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
  let weatherIcon = document.querySelector("#weather-icon");
  let currentTemp = document.querySelector("#current-temp");
  let currentDesc = document.querySelector("#current-desc");
  let maxTemp = document.querySelector("#temp-max");
  let minTemp = document.querySelector("#temp-min");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  let iconSrc = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", `${data.list[0].weather[0].main}`);

  currentTemp.innerHTML = `<p>Temp: <b>${Math.round(
    data.list[0].main.temp
  )}</b>°C</p>`;
  currentDesc.innerHTML = capitalizeWords(
    `${data.list[0].weather[0].description}`
  );
  maxTemp.innerHTML = `<p>Max: ${Math.round(data.list[0].main.temp_max)}°C</p>`;
  minTemp.innerHTML = `<p>Min: ${Math.round(data.list[0].main.temp_min)}°C</p>`;

  let sunriseUnixTime = data.city.sunrise;
  let formattedSunriseTime = utsToLocalTime(sunriseUnixTime);
  sunrise.innerHTML = `Sunrise: ${formattedSunriseTime}`;

  let sunsetUnixTime = data.city.sunset;
  let formattedSunsetTime = utsToLocalTime(sunsetUnixTime);
  sunset.innerHTML = `Sunset: ${formattedSunsetTime}`;
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
