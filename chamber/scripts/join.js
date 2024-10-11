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
  let description;
  switch (level) {
    case "np":
      description = "Non Profit Membership Level";
      break;
    case "bronze":
      description = "Bronze Membership Level";
      break;
    case "silver":
      description = "Silver Membership Level";
      break;
    case "gold":
      description = "Gold Membership Level";
      break;
    default:
      break;
  }
  membershipDialog.innerHTML = `
    <h3>${description}</h3>
    <p>Some ${description} Information</p>
    <br>
    <button id="dialog-close" type="reset">Close</button>
  `;
  let closeDialogButton = document.querySelector("#dialog-close");
  closeDialogButton.addEventListener("click", () => {
    membershipDialog.close();
  });
  membershipDialog.showModal();
}
