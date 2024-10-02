const url = "https://bonduelle85.github.io/wdd231/chamber/data/members.json";

const memberCards = document.querySelector("article");

async function getMembersData() {
  let response = await fetch(url);
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

// Footer
document.querySelector(
  "#current-year"
).innerHTML = `&copy ${new Date().getFullYear()}`;
document.querySelector(
  "#last-modified"
).innerHTML = `Last Update: ${document.lastModified}`;

// init
getMembersData();
