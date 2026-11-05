```javascript
// ===================================
// LITTLE UNIVERSE
// GLOBAL INTERACTIVE JAVASCRIPT
// ===================================


// 1. GLOBAL DARK MODE
// ===================================

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

// Apply saved theme immediately
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}


// Update theme icon
function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

updateThemeIcon();


// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );

        updateThemeIcon();

    });
}


// 2. GLOBAL MOBILE NAVIGATION
// ===================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// Update menu icon
function updateMenuIcon() {
    if (!menuToggle) return;

    const icon = menuToggle.querySelector("i");

    if (!icon) return;

    if (navLinks && navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}


// Toggle mobile menu
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        updateMenuIcon();

    });


    // Close menu after selecting a page
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            updateMenuIcon();

        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", function (event) {

        const clickedInsideNavbar =
            navLinks.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideNavbar) {

            navLinks.classList.remove("show");

            updateMenuIcon();

        }

    });

}


// 3. RANDOM DAILY QUOTES
// ===================================

const quoteElement = document.getElementById("dailyQuote");
const newQuoteButton = document.getElementById("newQuote");

const quotes = [
    "Bloom at your own pace.",
    "Little things make life beautiful.",
    "You are allowed to grow slowly.",
    "Every day is a new little beginning.",
    "Make room for beautiful things.",
    "Your story is still unfolding.",
    "Collect moments, not perfection.",
    "There is magic in ordinary days.",
    "Dream big, start small.",
    "Be proud of how far you've come."
];


if (quoteElement && newQuoteButton) {

    newQuoteButton.addEventListener("click", function () {

        const currentQuote =
            quoteElement.textContent.trim();

        let randomQuote;

        do {

            randomQuote =
                quotes[Math.floor(Math.random() * quotes.length)];

        } while (randomQuote === currentQuote);

        quoteElement.textContent = randomQuote;

    });

}


// ===================================
// END OF LITTLE UNIVERSE JS
// ===================================
```
