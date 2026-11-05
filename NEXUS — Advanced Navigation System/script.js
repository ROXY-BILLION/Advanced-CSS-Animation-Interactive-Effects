/*** Desktop Dropdown ***/
const dropdown = document.querySelector(".dropdown");
const servicesToggle = document.querySelector("#servicesToggle");

servicesToggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");

    servicesToggle.setAttribute("aria-expanded", isOpen);
});

/*** Mobile Navigation ***/
const menuToggle = document.querySelector("#menuToggle");
const mobileNav = document.querySelector("#mobileNav");

function closeMobileMenu() {
    menuToggle.classList.remove("active");
    mobileNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    mobileNav.inert = true;
    document.body.classList.remove("menu-open");
}

function openMobileMenu() {
    menuToggle.classList.add("active");
    mobileNav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    mobileNav.inert = false;
    document.body.classList.add("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("active");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

/*** Mobile Dropdown ***/
const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileServicesToggle = document.querySelector("#mobileServicesToggle");
const mobileServicesMenu = document.querySelector("#mobileServicesMenu");

mobileServicesToggle.addEventListener("click", () => {
    const isOpen = mobileDropdown.classList.toggle("open");

    mobileServicesToggle.setAttribute("aria-expanded", isOpen);
    mobileServicesMenu.inert = !isOpen;
});

/*** Close Menus After Navigation ***/
document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
        mobileDropdown.classList.remove("open");
        mobileServicesToggle.setAttribute("aria-expanded", "false");
        mobileServicesMenu.inert = true;
    });
});

/*** Close Desktop Dropdown When Clicking Outside ***/
document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        servicesToggle.setAttribute("aria-expanded", "false");
    }
});

/*** Escape Key ***/
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();

        dropdown.classList.remove("open");
        servicesToggle.setAttribute("aria-expanded", "false");

        mobileDropdown.classList.remove("open");
        mobileServicesToggle.setAttribute("aria-expanded", "false");
        mobileServicesMenu.inert = true;
    }
});

/*** Close Mobile Menu When Returning to Desktop ***/
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMobileMenu();

        mobileDropdown.classList.remove("open");
        mobileServicesToggle.setAttribute("aria-expanded", "false");
        mobileServicesMenu.inert = true;
    }
});

/*** Active Desktop Navigation ***/
const desktopLinks = document.querySelectorAll(".desktop-nav > a");

desktopLinks.forEach((link) => {
    link.addEventListener("click", () => {
        desktopLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});