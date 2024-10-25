import initBurger from "./burger.mjs";
import initFooter from "./footer.mjs";

initFooter();
initBurger();

const currentUrl = window.location.href;
let data = currentUrl.split("?")[1].split("&");
console.log(data);
const results = document.querySelector("#results");

function showData(value) {
  let result;
  data.forEach((element) => {
    if (element.startsWith(value))
      result = element
        .split("=")[1]
        .replace("%40", "@")
        .replace("%2B", "+")
        .replace("%3A", ":");
  });
  return result;
}

results.innerHTML = `
    <p class= "result-greetings">Hi, ${showData("first")} ${showData("last")}!</p><hr>
    <p>You have successfully booked a snowboard. Our managers will contact you to clarify the details. Please check your contacts and information.</p>
    <p><b>Phone:</b> ${showData("phone")}</p>
    <p><b>Email:</b> <a href="${showData("email")}">${showData("email")}</a></p>
    <p>You are <b>${showData("level")}</b>, your riding style is <b>${showData("style")}</b></p><hr>
    <p><b>Booking from:</b> ${showData("start")} <b>to:</b> ${showData("end")}</p>
    <p><b>Booking date:</b> ${showData("timestamp")}</p>
    `;
