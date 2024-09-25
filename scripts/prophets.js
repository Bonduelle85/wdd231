const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

let cards = document.querySelector("#cards");

async function getProphetData(filter = "all") {
  let response = await fetch(url);
  let data = await response.json();
  let prophets = data.prophets;

  switch (filter) {
    case "idaho":
      prophets = prophets.filter((prophet) => prophet.birthplace === "Idaho");
      break;
    case "nonus":
      prophets = prophets.filter((prophet) => prophet.birthplace === "England");
      break;
    case "ten":
      prophets = prophets.filter((prophet) => prophet.length >= 15);
      break;
    case "childs":
      prophets = prophets.filter((prophet) => prophet.numofchildren < 5);
      break;
    case "childl":
      prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
      break;
    case "old":
      prophets = prophets.filter(
        (prophet) =>
          getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95
      );
      break;
    default:
      break;
  }

  displayProphets(prophets);
  console.log(prophets);
}

const displayProphets = (prophets) => {
  cards.innerHTML = "";
  prophets.forEach((prophet) => {
    let card = document.createElement("section");
    card.classList.add("card");

    let fullName = document.createElement("h2");
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    let birthdate = document.createElement("p");
    birthdate.classList.add("birthdate");
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

    let birthplace = document.createElement("p");
    birthplace.classList.add("birthplace");
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

    let portrait = document.createElement("img");
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of the ${prophet}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "400");

    card.appendChild(fullName);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

// button elements
const all = document.querySelector("#all");
const idaho = document.querySelector("#idaho");
const nonus = document.querySelector("#nonus");
const ten = document.querySelector("#ten");
const childs = document.querySelector("#childs");
const childl = document.querySelector("#childl");
const old = document.querySelector("#old");

// buttons
all.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("all");
  all.classList.add("active");
});

idaho.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("idaho");
  idaho.classList.add("active");
});

document.querySelector("#nonus").addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("nonus");
  nonus.classList.add("active");
});

ten.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("ten");
  ten.classList.add("active");
});

childs.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("childs");
  childs.classList.add("active");
});

childl.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("childl");
  childl.classList.add("active");
});

old.addEventListener("click", () => {
  clearButtonClasses();
  getProphetData("old");
  old.classList.add("active");
});

function getAgeAtDeathInYears(birthdate, deathdate) {
  let birth = new Date(birthdate);
  let death = new Date(deathdate);
  if (deathdate === null) {
    death = new Date();
  }
  return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

function clearButtonClasses() {
  let filterbuttons = document.querySelectorAll("button");
  filterbuttons.forEach((button) => (button.className = ""));
}

getProphetData();
