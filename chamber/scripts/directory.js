const url = "https://bonduelle85.github.io/wdd231/chamber/data/members.json";

let members = document.querySelector("#business-members");

async function getMembersData(view = "grid") {
  let response = await fetch(url);
  let data = await response.json();
  let members = data.members;

  console.log(members);
  switch (view) {
    case "grid":
      displayMembersGrid(members);
      break;
    case "list":
      displayMembersList(members);
      break;  
    default:
      break;
  }

}
