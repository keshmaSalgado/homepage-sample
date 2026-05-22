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
    initWipModal()
    // re-initialize hero slider and modal after hero component is loaded
    if (id === "hero") {
        initHeroSlider()

    }
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

function initWipModal() {
    const wipModal = document.getElementById("wipModal");
    if (!wipModal) return;

    const triggers = Array.from(document.querySelectorAll('.wip-trigger'));
    if (triggers.length === 0 && wipModal.dataset.wipInitialized === '1') return;

    function openModal() {
        wipModal.classList.remove("hidden");
        wipModal.classList.add("flex");
    }

    function hideModal() {
        wipModal.classList.remove("flex");
        wipModal.classList.add("hidden");
    }

    // attach to triggers (idempotent)
    triggers.forEach(btn => {
        if (btn.dataset.wipInit === '1') return;
        btn.addEventListener('click', openModal);
        btn.dataset.wipInit = '1';
    });

    // attach close handlers once
    if (wipModal.dataset.wipInitialized !== '1') {
        const closeModal = document.getElementById("closeModal");
        const closeBtn = document.getElementById("closeBtn");

        if (closeModal) closeModal.addEventListener("click", hideModal);
        if (closeBtn) closeBtn.addEventListener("click", hideModal);

        // close when clicking outside
        wipModal.addEventListener("click", (e) => {
            if (e.target === wipModal) {
                hideModal();
            }
        });

        wipModal.dataset.wipInitialized = '1';
    }
}