import initBurger from "./burger.mjs";
import initFooter from "./footer.mjs";
import calendarControl from "./calendar.mjs";

initFooter();
initBurger();
calendarControl();
getProphetData();

async function getProphetData(filter = "all") {
  const BOARDS_URL =
    "https://bonduelle85.github.io/wdd231/glide-and-ride/data/boards.json";

  let boards;

  try {
    let response = await fetch(BOARDS_URL);
    if (response.ok) {
      let data = await response.json();
      boards = data.boards;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }

  switch (filter) {
    case "male":
      boards = boards.filter((board) => board.sex === "male");
      break;
    case "female":
      boards = boards.filter((board) => board.sex === "female");
      break;
    case "unisex":
      boards = boards.filter((board) => board.sex === "unisex");
      break;
    case "kids":
      boards = boards.filter((board) => board.sex === "kids");
      break;
    case "beginner":
      boards = boards.filter((board) => board.level.includes("beginner"));
      break;
    case "progressive":
      boards = boards.filter((board) => board.level.includes("progressive"));
      break;
    case "advanced":
      boards = boards.filter((board) => board.level.includes("advanced"));
      break;
    case "expert":
      boards = boards.filter((board) => board.level.includes("expert"));
      break;
    case "all-mountain":
      boards = boards.filter((board) => board.style.includes("all mountain"));
      break;
    case "freestyle":
      boards = boards.filter((board) => board.style.includes("freestyle"));
      break;
    case "freeride":
      boards = boards.filter((board) => board.style.includes("freeride"));
      break;
    case "carving":
      boards = boards.filter((board) => board.style.includes("carving"));
      break;
    default:
      break;
  }

  //   displayBoards(boards);
  console.log(boards);
}

function displayBoards(boards){
  boards.forEach((board) => {
    document.querySelector(".boards-section-container").innerHTML += `
    <div class="board-card">
        <p>${board.brand}</p>
        <p>${board.name}</p>
        <div class="board-card-info">
          <img class="board-card-img" src="${board.image}" alt="Image of ${board.name}" loading="lazy" width="300" height="400">
          <div class="board-card-info">
            <p class="membership-level">Mship: ${member.membership_level}</p>
          </div>
        </div>
        
        <hr>
        <div class="portrait-info-container">
            <img class="member-portrait" src="${member.image}" alt="Portrait of ${member.name}" loading="lazy" width="50" height="50">
            <div class="info-container">
                <p class="member-email">${member.email}</p>
                <p class="member-phone">${member.phone_number}</p>
                <a href="${member.website}" title="event" class="membership-url">${member.website}</a>
            </div>
        </div>
    </div>`;
  });
}