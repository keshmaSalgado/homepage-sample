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