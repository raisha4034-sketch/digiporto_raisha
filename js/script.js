
// ===================================
// LITTLE UNIVERSE - INTERACTIVE JS
// ===================================


// 1. DARK MODE
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }
    });

    // Remember theme preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");

        const icon = themeToggle.querySelector("i");
        icon.classList.replace("fa-moon", "fa-sun");
    }
}


// 2. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("show")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");

            const icon = menuToggle.querySelector("i");
            icon.classList.replace("fa-xmark", "fa-bars");
        });
    });
}


// 3. RANDOM DAILY QUOTES
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
        const currentQuote = quoteElement.textContent;

        let randomQuote;

        do {
            randomQuote = quotes[
                Math.floor(Math.random() * quotes.length)
            ];
        } while (randomQuote === currentQuote);

        quoteElement.textContent = randomQuote;
    });
}


// ===================================
// END OF LITTLE UNIVERSE JS
// ===================================

