import initBurger from "./burger.mjs";
import initFooter from "./footer.mjs";

initFooter();
initBurger();

// Date
function setTimestamp() {
  const timestampInput = document.getElementById("timestamp");
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  timestampInput.value = `${year}-${month + 1}-${day}`;
}
window.onload = setTimestamp();
