let navbar = null;
let hero = null;

function updateNavbarState() {
    // resolve elements if not yet available
    if (!navbar) navbar = document.getElementById("navbar");
    if (!hero) hero = document.getElementById("hero");
    if (!navbar || !hero) return;

    const heroBottom = hero.getBoundingClientRect().bottom;
    const isPastHero = heroBottom <= 0;

    if (isPastHero) {
        navbar.classList.add(
            "fixed",
            "top-0",
            "left-0",
            "right-0",
            "nav-transparent",
            "z-50",
        );
        navbar.classList.remove("nav-solid", "shadow-sm");
    } else {
        navbar.classList.remove(
            "fixed",
            "top-0",
            "left-0",
            "right-0",
            "nav-transparent",
            "z-50",
        );
        navbar.classList.add("nav-solid", "shadow-sm");
    }
}

window.addEventListener("scroll", updateNavbarState);
window.addEventListener("resize", updateNavbarState);
updateNavbarState();


async function load(id, file) {
    const response = await fetch(file)
    const data = await response.text()
    document.getElementById(id).innerHTML = data
    // attempt to re-resolve navbar/hero after this component has been inserted
    updateNavbarState()
    // re-initialize hero slider after hero component is loaded
    if (id === "hero") initHeroSlider()
}

function initHeroSlider() {
    const hero = document.getElementById("hero")?.querySelector("section");
    const nextBtn = document.getElementById("hero")?.querySelector("#nextBtn");
    const prevBtn = document.getElementById("hero")?.querySelector("#prevBtn");
    
    if (!hero || !nextBtn || !prevBtn) return;
    
    const slides = ["./images/slider.jpg", "./images/slider2.jpg"];
    let currentSlide = 0;

    // Add fade transition
    hero.style.transition = "opacity 0.5s ease-in-out";

    function updateSlider() {
        hero.style.opacity = "0";
        setTimeout(() => {
            hero.style.backgroundImage = `url('${slides[currentSlide]}')`;
            hero.style.opacity = "1";
        }, 250);
    }

    nextBtn.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        updateSlider();
    });
}
load("navbar-container", "components/navbar.html")
load("hero", "components/hero.html")
load("features", "components/features.html")
load("products", "components/products.html")
load("promo", "components/promo.html")
load("featured", "components/featured.html")
load("testimonial", "components/testimonial.html")
load("experts", "components/experts.html")
load("blog", "components/blog.html")
load("newsletter", "components/newsletter.html")
load("footer", "components/footer.html")