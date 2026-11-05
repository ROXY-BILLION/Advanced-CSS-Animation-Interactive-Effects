/*** Scroll Reveal Observer ***/
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/*** Parallax Image Movement ***/
const heroImage = document.querySelector(".hero-image");

let ticking = false;

window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {
            heroImage.style.backgroundPositionY =
                `${50 + scrollPosition * 0.04}%`;
        }

        ticking = false;
    });
});