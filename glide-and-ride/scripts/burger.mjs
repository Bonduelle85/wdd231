function initBurger() {
    const hamButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#animation");

    hamButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      hamButton.classList.toggle("open");
    });
}

export default initBurger;