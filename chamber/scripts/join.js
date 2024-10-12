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

// Date
function setTimestamp() {
  const timestampInput = document.getElementById("timestamp");
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  timestampInput.value = `${day}/${month + 1}/${year} ${hours}:${minutes}`;
}
window.onload = setTimestamp();

// Dialog
const membershipDialog = document.querySelector("#membership-dialog");

document.querySelector("#np-button").addEventListener("click", () => {
  showMembershipDialog("np");
});
document.querySelector("#bronze-button").addEventListener("click", () => {
  showMembershipDialog("bronze");
});
document.querySelector("#silver-button").addEventListener("click", () => {
  showMembershipDialog("silver");
});
document.querySelector("#gold-button").addEventListener("click", () => {
  showMembershipDialog("gold");
});

function showMembershipDialog(level) {
  let title;
  let description;
  switch (level) {
    case "np":
      title = "Non Profit";
      description = "Cost: 0$. Include events only.";
      break;
    case "bronze":
      title = "Bronze";
      description = "Cost: 5$. Include events and training.";
      break;
    case "silver":
      title = "Silver";
      description = "Cost: 10$. Include events, training and advertising.";
      break;
    case "gold":
      title = "Gold";
      description =
        "Cost: 15$. Include events, training, advertising and 20% discount.";
      break;
    default:
      break;
  }
  membershipDialog.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <br>
    <button id="dialog-close" type="reset">Close</button>
  `;
  let closeDialogButton = document.querySelector("#dialog-close");
  closeDialogButton.addEventListener("click", () => {
    membershipDialog.close();
  });
  membershipDialog.showModal();
}
