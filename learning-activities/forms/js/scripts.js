const currentUrl = window.location.href;
let data = currentUrl.split("?")[1].split("&");

const results = document.querySelector("#results");

function showData(value) {
  let result;
  data.forEach((element) => {
    if (element.startsWith(value))
      result = element.split("=")[1].replace("%40", "@").replace("%2B", "+");
  });
  return result;
}

results.innerHTML = `
    <p>Appointment for ${showData("first")} ${showData("last")}</p>
    <p>Phone: ${showData("phone")}</p>
    <p>Email: <a href="${showData("email")}">${showData("email")}</a></p>
    <p>Ordinance: ${showData("ordinance")}</p>
    <p>Location: ${showData("location")}</p>
    <p>Date: ${showData("fecha")}</p>
    `;
