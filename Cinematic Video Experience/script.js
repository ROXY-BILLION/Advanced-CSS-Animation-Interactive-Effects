/*** Mobile Navigation ***/
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);
});

/*** Close Navigation After Selecting a Link ***/
const navigationLinks = document.querySelectorAll(".navigation a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    });
});
