// Burger
const hamButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#animation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

// Footer
document.querySelector(
  "#current-year"
).innerHTML = `&copy ${new Date().getFullYear()}`;
document.querySelector(
  "#last-modified"
).innerHTML = `Last Update: ${document.lastModified}`;

// Data from Join
const currentUrl = window.location.href;
const data = currentUrl.split("?")[1].split("&");

const result = document.querySelector("#result");

function showData(value) {
  let result;
  data.forEach((element) => {
    if (element.startsWith(value)) {
      result = element
        .split("=")[1]
        .replace("%40", "@")
        .replace(/\+/g, " ")
        .replace(/\%2F/g, "/")
        .replace("%3A", ":")
        .replace("%2B", "+")
        .replace("%27", "`");
    }
  });
  return result;
}

result.innerHTML = `
  <p>${showData("first")} ${showData("last")}</p>
  <br>
  <p><b>Organization Title</b>: ${showData(
    "organization-title"
  )}
  <p><b>Organization Name</b>: ${showData("organization-name")}</p>
  <br>
  <p><b>Email</b>: ${showData("email")}</p>
  <p><b>Phone</b>: ${showData("phone")}</p>
  <br>
  <p><b>Membership</b>: ${showData("membership")}</p>
  <br>
  <p><b>Description</b>: ${showData("description")}</p>
  <br>
  <p>Date: ${showData("timestamp")}</p>
`;

