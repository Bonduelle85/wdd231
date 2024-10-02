const url = "https://bonduelle85.github.io/wdd231/chamber/data/members.json";

let members = document.querySelector("#business-members");

async function getMembersData() {
  let response = await fetch(url);
  let data = await response.json();
  let members = data.members;

  console.log(members);
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
    membershipLevel.textContent = `Membership: ${member.membership_level}`;

    let line = document.createElement("hr");

    let portraitInfoContainer = document.createElement("div");
    portraitInfoContainer.classList.add("portrait-info-container");

    let portrait = document.createElement("img");
    portrait.classList.add("member-portrait");
    portrait.setAttribute("src", member.image);
    portrait.setAttribute("alt", `Portrait of the ${member}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "140");
    portrait.setAttribute("height", "140");

    let email = document.createElement("p");
    email.classList.add("member-email");
    email.textContent = `Email: ${member.email}`;

    let phone = document.createElement("p");
    phone.classList.add("member-phone");
    phone.textContent = `Phone: ${member.phone_number}`;

    let url = document.createElement("p");
    url.classList.add("membership-url");
    url.textContent = `URL: ${member.website}`;

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

    cards.appendChild(card);
  });
};

getMembersData();
