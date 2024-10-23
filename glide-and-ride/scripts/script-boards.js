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
