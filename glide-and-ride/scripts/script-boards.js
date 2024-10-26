import initBurger from "./burger.mjs";
import initFooter from "./footer.mjs";
import calendarControl from "./calendar.mjs";

let boards;

initFooter();
initBurger();
calendarControl();
getBoardsData();

async function getBoardsData(filter = "all") {
  const BOARDS_URL =
    "https://bonduelle85.github.io/wdd231/glide-and-ride/data/boards.json";

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
    case "all mountain":
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

  displayBoards(boards);
}

document.querySelector(".boards-section-nav").addEventListener("click", function (e) {
    clearButtonClasses();
    let targetItem = e.target;
    targetItem.classList.add("current")
    if (targetItem.closest(".nav-item")) {
      let targetContent = targetItem.textContent;
      getBoardsData(targetContent.toLowerCase());
    }
  });

function displayBoards(boards) {
  document.querySelector(".boards-section-container").innerHTML = ""
  boards.forEach((board) => {
    document.querySelector(".boards-section-container").innerHTML += `
    <div id="${board.id}" class="board-card">
        <p>${board.brand} ${board.name}</p><hr>
        <div class="board-card-info">
          <img class="board-card-img" src="${board.image}" alt="Image of ${board.name}" loading="lazy" width="300" height="400">
          <div class="board-card-info-details">
            <p>Sex: ${board.sex}</p>
            <p>Level: ${board.level}</p>
            <p>Style: ${board.style}</p>
            <p>Shape: ${board.shape}</p>
            <p>Flex: ${board.flex}</p>
            <p>Size: ${board.size}</p>
            <p>Camber: ${board.camber}</p>
          </div>
        </div>
    </div>`;
  });
}

function clearButtonClasses() {
  let filterButtons = document.querySelectorAll(".nav-item");
  filterButtons.forEach((button) => (button.classList.remove("current")));
}


// Local Storage
const now = new Date();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  document.querySelector(".visit-locator").textContent =
    "Hello! Has you jumped to look at incredible boards?";
} else {
  const lastVisitDate = new Date(lastVisit);
  const timeDifference = now - lastVisitDate;
  let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  if (daysDifference < 1) {
    document.querySelector(".visit-locator").textContent =
      "Missed snowboarding? Awesome!";
  } else {
    const dayWord = daysDifference === 1 ? "day" : "days";
    document.querySelector(
      ".visit-locator"
    ).textContent = `The last time you mentioned snowboarding was ${daysDifference} ${dayWord} ago.`;
  }
}
localStorage.setItem("lastVisit", now);

// Dialog
document.querySelector(".boards-section-container").addEventListener("click", function (e) {
  let boardCard = e.target.closest(".board-card");
  if (boardCard) {
    let boardCardId = boardCard.id;
    let board = boards.find( board => board.id === boardCardId )
    console.log(board)
    showBoardCardDialog(board);
  }
});

const boardCardDialog = document.querySelector("#board-card-dialog");

function showBoardCardDialog(board) {
  
  boardCardDialog.innerHTML = `
    <h3>${board.brand} ${board.name}</h3><hr>
    <p>Size: ${board.size}</p>
    <br>
    <p><b>Description:</b> ${board.description}</p>
    <br>    
    <p><b>Price:</b> ${board.price}$</p>
    <button id="dialog-close" type="reset">Close</button>
  `;
  let closeDialogButton = document.querySelector("#dialog-close");
  closeDialogButton.addEventListener("click", () => {
    boardCardDialog.close();
  });
  boardCardDialog.showModal();
}