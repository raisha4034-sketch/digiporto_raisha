// ===================================
// LITTLE UNIVERSE ✿
// GLOBAL INTERACTIVE JAVASCRIPT
// ===================================

// 1. GLOBAL DARK MODE
// ===================================

const themeToggle = document.getElementById("themeToggle");

// Gunakan satu penyimpanan tema untuk seluruh halaman
const savedTheme = localStorage.getItem("theme");

// Terapkan tema saat halaman dibuka
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}

// Update moon and sun icon
function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    if (document.body.classList.contains("dark-mode")) {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-regular fa-moon";
    }
}

// Set icon when page loads
updateThemeIcon();

// Toggle dark mode
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const isDarkMode = document.body.classList.contains("dark-mode");

        // Save theme for all pages
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");

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
        icon.className = "fa-solid fa-xmark";
    } else {
        icon.className = "fa-solid fa-bars";
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

// Activate only on pages with quote elements
if (quoteElement && newQuoteButton) {
    newQuoteButton.addEventListener("click", function () {
        const currentQuote = quoteElement.textContent.trim();
        let randomQuote;

        do {
            randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (randomQuote === currentQuote);

        quoteElement.textContent = randomQuote;
    });
}


// =========================================================
// 4. PRIVATE LOCK SCREEN + VISUAL ADMIN EDIT MODE ✿
// =========================================================

(function () {
    // PIN Rahasia Caca (bisa diganti kapan saja di sini)
    const SECRET_PIN = "220408";

    // Daftar halaman pribadi yang otomatis terkunci gembok
    const PRIVATE_PAGES = ["diary.html", "planner.html"];

    // Otomatis arahkan semua link "surprises.html" ke "surprise.html"
    document.querySelectorAll('a[href="surprises.html"]').forEach(link => {
        link.setAttribute("href", "surprise.html");
    });

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const isPrivatePage = PRIVATE_PAGES.includes(currentPath);

    function isUnlocked() {
        return sessionStorage.getItem("raishaAdminUnlocked") === "true";
    }

    function setUnlocked(state) {
        if (state) {
            sessionStorage.setItem("raishaAdminUnlocked", "true");
        } else {
            sessionStorage.removeItem("raishaAdminUnlocked");
        }
    }

    // Tampilan Gembok PIN untuk halaman pribadi
    function renderLockScreen() {
        if (!isPrivatePage || isUnlocked()) return;

        const lockOverlay = document.createElement("div");
        lockOverlay.id = "privateLockOverlay";
        lockOverlay.innerHTML = `
            <style>
                #privateLockOverlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(255, 250, 243, 0.92);
                    backdrop-filter: blur(14px);
                    z-index: 99999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                body.dark-mode #privateLockOverlay {
                    background: rgba(33, 29, 32, 0.94);
                }
                .lock-card {
                    background: var(--white, #ffffff);
                    border: 1.5px dashed var(--rose, #d99a9e);
                    border-radius: 26px;
                    padding: 38px 30px;
                    max-width: 390px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(157, 111, 105, 0.18);
                }
                body.dark-mode .lock-card {
                    background: #30282d;
                }
                .lock-icon {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: var(--pink, #fcecf1);
                    color: var(--dark-rose, #a96870);
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                }
                .lock-card h2 {
                    font-family: var(--heading, Georgia, serif);
                    font-size: 26px;
                    font-weight: 500;
                    color: var(--text, #5c4d4a);
                    margin-bottom: 8px;
                }
                .lock-card p {
                    font-size: 13px;
                    color: var(--muted, #8c7a77);
                    line-height: 1.7;
                    margin-bottom: 20px;
                }
                .lock-input {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 16px;
                    border: 1.5px solid var(--border, #f1dce1);
                    background: var(--cream, #fffaf3);
                    color: var(--text, #5c4d4a);
                    font-size: 18px;
                    letter-spacing: 6px;
                    text-align: center;
                    font-weight: 700;
                    outline: none;
                    margin-bottom: 12px;
                }
                body.dark-mode .lock-input {
                    background: #241e22;
                }
                .lock-error {
                    color: #c95c68;
                    font-size: 12px;
                    min-height: 18px;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .lock-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                .lock-btn-unlock {
                    background: var(--pink, #fcecf1);
                    color: var(--dark-rose, #a96870);
                    border: none;
                    padding: 11px 22px;
                    border-radius: 22px;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .lock-btn-unlock:hover {
                    background: var(--dark-rose, #a96870);
                    color: white;
                }
                .lock-btn-back {
                    background: transparent;
                    color: var(--muted, #8c7a77);
                    border: 1px solid var(--border, #f1dce1);
                    padding: 11px 18px;
                    border-radius: 22px;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                }
            </style>
            <div class="lock-card">
                <div class="lock-icon">🔒</div>
                <h2>Private Little Space</h2>
                <p>This page holds Raisha's personal diary & plans. Enter the secret PIN to unlock ✿</p>
                <form id="pinUnlockForm">
                    <input type="password" id="pinInputField" class="lock-input" maxlength="8" placeholder="••••••" required autofocus>
                    <div class="lock-error" id="pinErrorText"></div>
                    <div class="lock-actions">
                        <a href="index.html" class="lock-btn-back">← Home</a>
                        <button type="submit" class="lock-btn-unlock">Unlock ✿</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(lockOverlay);

        const form = document.getElementById("pinUnlockForm");
        const input = document.getElementById("pinInputField");
        const errorText = document.getElementById("pinErrorText");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (input.value.trim() === SECRET_PIN) {
                setUnlocked(true);
                lockOverlay.remove();
                renderAdminBar();
            } else {
                errorText.textContent = "Oops! Wrong PIN, try again ♡";
                input.value = "";
                input.focus();
            }
        });
    }

    // Muat teks yang pernah diedit lewat Visual Admin Mode
    const storageKey = "littleUniverseCustomEdits_" + currentPath;

    function loadSavedEdits() {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return;
        const edits = JSON.parse(saved);
        const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");
        editableEls.forEach((el, idx) => {
            if (edits[idx] !== undefined) {
                el.innerHTML = edits[idx];
            }
        });
    }

    // Panel Kontrol Admin & Visual Edit Mode di pojok kanan bawah
    function renderAdminBar() {
        const existing = document.getElementById("raishaAdminDock");
        if (existing) existing.remove();

        const dock = document.createElement("div");
        dock.id = "raishaAdminDock";

        const style = document.createElement("style");
        style.textContent = `
            #raishaAdminDock {
                position: fixed;
                bottom: 18px;
                right: 18px;
                z-index: 9998;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                background: rgba(255, 253, 249, 0.94);
                backdrop-filter: blur(8px);
                border: 1.5px solid var(--blush, #e9b7c7);
                padding: 8px 12px;
                border-radius: 30px;
                box-shadow: 0 10px 28px rgba(157, 111, 105, 0.22);
                font-family: var(--body, sans-serif);
            }
            body.dark-mode #raishaAdminDock {
                background: rgba(48, 40, 45, 0.95);
            }
            .adm-btn {
                border: none;
                background: var(--pink, #fcecf1);
                color: var(--dark-rose, #a96870);
                padding: 7px 13px;
                border-radius: 20px;
                font-size: 11.5px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.25s;
            }
            .adm-btn:hover {
                background: var(--dark-rose, #a96870);
                color: white;
            }
            .adm-btn.active-edit {
                background: var(--dark-rose, #a96870);
                color: white;
            }
            .visual-editing-highlight {
                outline: 1.5px dashed #d99a9e !important;
                border-radius: 6px;
                cursor: text !important;
            }
        `;
        document.head.appendChild(style);

        if (!isUnlocked()) {
            const keyBtn = document.createElement("button");
            keyBtn.className = "adm-btn";
            keyBtn.title = "Owner Admin Login";
            keyBtn.innerHTML = "🔒 Admin";
            keyBtn.addEventListener("click", () => {
                const pin = prompt("Enter Raisha's Secret PIN to unlock Admin Edit Mode ✿:");
                if (pin === SECRET_PIN) {
                    setUnlocked(true);
                    renderAdminBar();
                } else if (pin !== null) {
                    alert("Wrong PIN ♡");
                }
            });
            dock.appendChild(keyBtn);
        } else {
            let isEditing = false;

            const editToggleBtn = document.createElement("button");
            editToggleBtn.className = "adm-btn";
            editToggleBtn.innerHTML = "✎ Edit Text";

            const saveBtn = document.createElement("button");
            saveBtn.className = "adm-btn";
            saveBtn.innerHTML = "💾 Save";
            saveBtn.style.display = "none";

            const resetBtn = document.createElement("button");
            resetBtn.className = "adm-btn";
            resetBtn.innerHTML = "↺ Reset";
            resetBtn.style.display = "none";

            const lockNowBtn = document.createElement("button");
            lockNowBtn.className = "adm-btn";
            lockNowBtn.innerHTML = "🔒 Lock";

            editToggleBtn.addEventListener("click", () => {
                isEditing = !isEditing;
                const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");

                editableEls.forEach(el => {
                    el.contentEditable = isEditing ? "true" : "false";
                    el.classList.toggle("visual-editing-highlight", isEditing);
                });

                editToggleBtn.classList.toggle("active-edit", isEditing);
                editToggleBtn.innerHTML = isEditing ? "✓ Editing On" : "✎ Edit Text";
                saveBtn.style.display = isEditing ? "inline-block" : "none";
                resetBtn.style.display = isEditing ? "inline-block" : "none";
            });

            saveBtn.addEventListener("click", () => {
                const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");
                const dataToSave = {};
                editableEls.forEach((el, idx) => {
                    dataToSave[idx] = el.innerHTML;
                });
                localStorage.setItem(storageKey, JSON.stringify(dataToSave));
                saveBtn.innerHTML = "Saved! ♡";
                setTimeout(() => {
                    saveBtn.innerHTML = "💾 Save";
                }, 1400);
            });

            resetBtn.addEventListener("click", () => {
                if (confirm("Reset all edited texts on this page back to default?")) {
                    localStorage.removeItem(storageKey);
                    location.reload();
                }
            });

            lockNowBtn.addEventListener("click", () => {
                setUnlocked(false);
                if (isPrivatePage) {
                    location.reload();
                } else {
                    renderAdminBar();
                }
            });

            dock.appendChild(editToggleBtn);
            dock.appendChild(saveBtn);
            dock.appendChild(resetBtn);
            dock.appendChild(lockNowBtn);
        }

        document.body.appendChild(dock);
    }

    // Jalankan langsung atau saat DOM siap
    function initPrivateAndAdmin() {
        loadSavedEdits();
        renderLockScreen();
        renderAdminBar();
    }

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", initPrivateAndAdmin);
    } else {
        initPrivateAndAdmin();
    }
})();

// ===================================
// END OF LITTLE UNIVERSE ✿
// ===================================
