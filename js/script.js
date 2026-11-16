// ===================================
// LITTLE UNIVERSE ✿
// GLOBAL INTERACTIVE JAVASCRIPT
// ===================================

// 1. GLOBAL DARK MODE
// ===================================

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}

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

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        updateThemeIcon();
    });
}


// 2. GLOBAL MOBILE NAVIGATION
// ===================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

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

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
        updateMenuIcon();
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            updateMenuIcon();
        });
    });

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
        const currentQuote = quoteElement.textContent.trim();
        let randomQuote;

        do {
            randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (randomQuote === currentQuote);

        quoteElement.textContent = randomQuote;
    });
}


// =========================================================
// 4. GLOBAL PHOTO LIGHTBOX + LOCK SCREEN + VISUAL EDITOR ✿
// =========================================================

(function () {
    // PIN Rahasia Caca (bisa diganti kapan saja di sini)
    const SECRET_PIN = "220408";

    // Daftar halaman pribadi yang otomatis terkunci gembok
    const PRIVATE_PAGES = ["diary.html", "planner.html", "campus.html"];

    let isVisualEditActive = false;

    // Otomatis arahkan link "surprises.html" ke "surprise.html"
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

    // A. GLOBAL PHOTO LIGHTBOX (Setiap foto di halaman bisa diklik untuk diperbesar!)
    function setupGlobalPhotoLightbox() {
        const style = document.createElement("style");
        style.textContent = `
            main img {
                cursor: zoom-in;
                transition: transform 0.3s ease, filter 0.3s ease;
            }
            main img:hover {
                transform: scale(1.02);
            }
            #globalPhotoLightbox {
                position: fixed;
                inset: 0;
                background: rgba(33, 25, 29, 0.85);
                backdrop-filter: blur(8px);
                z-index: 999999;
                display: none;
                justify-content: center;
                align-items: center;
                padding: 24px;
            }
            #globalPhotoLightbox.open {
                display: flex;
                animation: lbFadeIn 0.28s ease;
            }
            @keyframes lbFadeIn {
                from { opacity: 0; transform: scale(0.94); }
                to { opacity: 1; transform: scale(1); }
            }
            .lb-frame {
                position: relative;
                background: var(--cream, #fffaf3);
                padding: 14px 14px 22px;
                border-radius: 22px;
                max-width: 90vw;
                max-height: 88vh;
                text-align: center;
                box-shadow: 0 25px 65px rgba(0, 0, 0, 0.45);
                border: 2px solid var(--blush, #e9b7c7);
            }
            body.dark-mode .lb-frame {
                background: #2b2429;
            }
            .lb-frame img {
                max-width: 82vw;
                max-height: 70vh;
                border-radius: 14px;
                object-fit: contain;
                display: block;
                margin: 0 auto 12px;
            }
            .lb-caption {
                font-family: var(--heading, Georgia, serif);
                font-style: italic;
                font-size: 16px;
                color: var(--dark-rose, #a96870);
            }
            .lb-close {
                position: absolute;
                top: -14px;
                right: -14px;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                border: none;
                background: var(--pink, #fcecf1);
                color: var(--dark-rose, #a96870);
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }
            .lb-close:hover {
                background: var(--dark-rose, #a96870);
                color: white;
            }
        `;
        document.head.appendChild(style);

        const lightbox = document.createElement("div");
        lightbox.id = "globalPhotoLightbox";
        lightbox.innerHTML = `
            <div class="lb-frame">
                <button type="button" class="lb-close" id="lbCloseBtn" aria-label="Close photo">✕</button>
                <img id="lbImage" src="" alt="Preview">
                <div class="lb-caption" id="lbCaption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lbImage = document.getElementById("lbImage");
        const lbCaption = document.getElementById("lbCaption");
        const lbCloseBtn = document.getElementById("lbCloseBtn");

        document.addEventListener("click", (e) => {
            if (isVisualEditActive) return;

            const clickedImg = e.target.closest("main img");
            if (!clickedImg) return;

            const cardParent = clickedImg.closest("figure, article, div");
            const nearbyTitle = cardParent ? cardParent.querySelector("figcaption, h3, h4, span") : null;
            const captionText = clickedImg.alt || (nearbyTitle ? nearbyTitle.textContent.trim() : "Little Universe Snapshot ✿");

            lbImage.src = clickedImg.src;
            lbCaption.textContent = captionText;
            lightbox.classList.add("open");
        });

        lbCloseBtn.addEventListener("click", () => lightbox.classList.remove("open"));
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.classList.remove("open");
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") lightbox.classList.remove("open");
        });
    }

    // Kompresi gambar saat upload dari folder
    function compressImageFile(file, callback) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 900;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                callback(canvas.toDataURL("image/jpeg", 0.82));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // B. LAYAR GEMBOK PIN (Diary, Planner, & Campus Life)
    function renderLockScreen() {
        if (!isPrivatePage || isUnlocked()) return;

        const lockOverlay = document.createElement("div");
        lockOverlay.id = "privateLockOverlay";
        lockOverlay.innerHTML = `
            <style>
                #privateLockOverlay {
                    position: fixed; inset: 0;
                    background: rgba(255, 250, 243, 0.92);
                    backdrop-filter: blur(14px);
                    z-index: 99999; display: flex;
                    justify-content: center; align-items: center; padding: 20px;
                }
                body.dark-mode #privateLockOverlay { background: rgba(33, 29, 32, 0.94); }
                .lock-card {
                    background: var(--white, #ffffff);
                    border: 1.5px dashed var(--rose, #d99a9e);
                    border-radius: 26px; padding: 38px 30px;
                    max-width: 390px; width: 100%; text-align: center;
                    box-shadow: 0 20px 50px rgba(157, 111, 105, 0.18);
                }
                body.dark-mode .lock-card { background: #30282d; }
                .lock-icon {
                    width: 58px; height: 58px; border-radius: 50%;
                    background: var(--pink, #fcecf1); color: var(--dark-rose, #a96870);
                    font-size: 24px; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 16px;
                }
                .lock-card h2 {
                    font-family: var(--heading, Georgia, serif);
                    font-size: 26px; font-weight: 500;
                    color: var(--text, #5c4d4a); margin-bottom: 8px;
                }
                .lock-card p {
                    font-size: 13px; color: var(--muted, #8c7a77);
                    line-height: 1.7; margin-bottom: 20px;
                }
                .lock-input {
                    width: 100%; padding: 12px 16px; border-radius: 16px;
                    border: 1.5px solid var(--border, #f1dce1);
                    background: var(--cream, #fffaf3); color: var(--text, #5c4d4a);
                    font-size: 18px; letter-spacing: 6px; text-align: center;
                    font-weight: 700; outline: none; margin-bottom: 12px;
                }
                body.dark-mode .lock-input { background: #241e22; }
                .lock-error {
                    color: #c95c68; font-size: 12px; min-height: 18px;
                    margin-bottom: 10px; font-weight: 600;
                }
                .lock-actions { display: flex; gap: 10px; justify-content: center; }
                .lock-btn-unlock {
                    background: var(--pink, #fcecf1); color: var(--dark-rose, #a96870);
                    border: none; padding: 11px 22px; border-radius: 22px;
                    font-size: 13px; font-weight: 700; cursor: pointer;
                }
                .lock-btn-unlock:hover { background: var(--dark-rose, #a96870); color: white; }
                .lock-btn-back {
                    background: transparent; color: var(--muted, #8c7a77);
                    border: 1px solid var(--border, #f1dce1);
                    padding: 11px 18px; border-radius: 22px;
                    font-size: 13px; font-weight: 600; text-decoration: none;
                }
            </style>
            <div class="lock-card">
                <div class="lock-icon">🔒</div>
                <h2>Private Little Space</h2>
                <p>This page holds Raisha's personal diary, campus journey & plans. Enter the secret PIN to unlock ✿</p>
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
                renderAddedPhotos();
            } else {
                errorText.textContent = "Oops! Wrong PIN, try again ♡";
                input.value = "";
                input.focus();
            }
        });
    }

    // C. PENYIMPANAN TEKS, GANTI FOTO, & TAMBAH FOTO BARU
    const textStorageKey = "littleUniverseCustomEdits_" + currentPath;
    const imgReplaceKey = "littleUniverseImgReplace_" + currentPath;
    const addedPhotosKey = "littleUniverseAddedPhotos_" + currentPath;

    function loadSavedContent() {
        const savedText = localStorage.getItem(textStorageKey);
        if (savedText) {
            const edits = JSON.parse(savedText);
            const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");
            editableEls.forEach((el, idx) => {
                if (edits[idx] !== undefined) el.innerHTML = edits[idx];
            });
        }

        const savedImgs = localStorage.getItem(imgReplaceKey);
        if (savedImgs) {
            const imgMap = JSON.parse(savedImgs);
            const pageImgs = document.querySelectorAll("main img");
            pageImgs.forEach((img, idx) => {
                if (imgMap[idx]) img.src = imgMap[idx];
            });
        }

        renderAddedPhotos();
    }

    function renderAddedPhotos() {
        const existingSection = document.getElementById("customAddedGallery");
        if (existingSection) existingSection.remove();

        const savedPhotos = JSON.parse(localStorage.getItem(addedPhotosKey) || "[]");
        if (savedPhotos.length === 0) return;

        const mainEl = document.querySelector("main");
        if (!mainEl) return;

        const section = document.createElement("section");
        section.id = "customAddedGallery";
        section.style.cssText = "max-width: 1080px; margin: 50px auto 20px; padding: 0 25px;";

        section.innerHTML = `
            <div style="text-align:center; margin-bottom: 28px;">
                <span class="eyebrow">ADDED MOMENTS ✿</span>
                <h2 style="font-family: var(--heading); font-size: 28px; font-weight: 500; margin-top: 8px; color: var(--text);">
                    My Little <span style="font-style: italic; color: var(--dark-rose);">Photo Snapshots.</span>
                </h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;" id="addedPhotosGrid"></div>
        `;

        mainEl.appendChild(section);
        const grid = document.getElementById("addedPhotosGrid");

        savedPhotos.forEach((item, index) => {
            const card = document.createElement("div");
            card.style.cssText = `
                background: var(--white); border: 1px solid var(--border);
                border-radius: 18px; padding: 14px 14px 20px;
                box-shadow: var(--shadow); text-align: center;
            `;
            card.innerHTML = `
                <img src="${item.src}" alt="${item.title}" style="width:100%; aspect-ratio: 4/4; object-fit: cover; border-radius: 12px; margin-bottom: 12px;">
                <h4 style="font-family: var(--heading); font-size: 19px; color: var(--text); margin-bottom: 4px;">${item.title}</h4>
                <p style="font-size: 12.5px; color: var(--muted);">${item.caption}</p>
                ${isUnlocked() ? `<button type="button" data-del-photo="${index}" style="margin-top:10px; background: var(--pink); color: var(--dark-rose); border:none; padding: 5px 12px; border-radius: 14px; font-size: 11px; font-weight: 700; cursor: pointer;">Delete Photo</button>` : ""}
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll("[data-del-photo]").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.dataset.delPhoto, 10);
                const list = JSON.parse(localStorage.getItem(addedPhotosKey) || "[]");
                list.splice(idx, 1);
                localStorage.setItem(addedPhotosKey, JSON.stringify(list));
                renderAddedPhotos();
            });
        });
    }

    // D. POPUP TAMBAH FOTO DARI FOLDER
    function openAddPhotoModal() {
        const oldModal = document.getElementById("addPhotoModal");
        if (oldModal) oldModal.remove();

        const modal = document.createElement("div");
        modal.id = "addPhotoModal";
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(39, 29, 34, 0.72);
            backdrop-filter: blur(6px); z-index: 99999; display: flex;
            justify-content: center; align-items: center; padding: 20px;
        `;

        modal.innerHTML = `
            <div style="background: var(--cream, #fffaf3); border: 1.5px dashed var(--rose, #d99a9e); border-radius: 24px; padding: 30px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.25);">
                <h3 style="font-family: var(--heading); font-size: 24px; color: var(--dark-rose); margin-bottom: 6px;">Add Photo from Folder 📷</h3>
                <p style="font-size: 12.5px; color: var(--muted); margin-bottom: 18px;">Pick any image from your device to pin onto this page ✿</p>

                <form id="customPhotoForm" style="display: flex; flex-direction: column; gap: 12px;">
                    <input type="file" id="newPhotoFile" accept="image/*" required style="padding: 10px; border-radius: 14px; border: 1px solid var(--border); background: var(--white); font-size: 12px;">
                    <input type="text" id="newPhotoTitle" placeholder="Photo title (e.g. Afternoon Drive ♡)" required style="padding: 11px 14px; border-radius: 14px; border: 1px solid var(--border); background: var(--white); font-size: 13px; outline: none;">
                    <input type="text" id="newPhotoCaption" placeholder="Short caption or date..." style="padding: 11px 14px; border-radius: 14px; border: 1px solid var(--border); background: var(--white); font-size: 13px; outline: none;">

                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 6px;">
                        <button type="button" id="cancelPhotoModal" style="padding: 10px 18px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--muted); font-weight: 600; cursor: pointer;">Cancel</button>
                        <button type="submit" style="padding: 10px 22px; border-radius: 20px; border: none; background: var(--pink); color: var(--dark-rose); font-weight: 700; cursor: pointer;">Add to Page ✿</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById("cancelPhotoModal").addEventListener("click", () => modal.remove());

        document.getElementById("customPhotoForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const fileInput = document.getElementById("newPhotoFile");
            const titleVal = document.getElementById("newPhotoTitle").value.trim();
            const captionVal = document.getElementById("newPhotoCaption").value.trim() || "Saved memory ♡";

            if (!fileInput.files || !fileInput.files[0]) return;

            compressImageFile(fileInput.files[0], (compressedSrc) => {
                const list = JSON.parse(localStorage.getItem(addedPhotosKey) || "[]");
                list.unshift({
                    src: compressedSrc,
                    title: titleVal,
                    caption: captionVal
                });
                try {
                    localStorage.setItem(addedPhotosKey, JSON.stringify(list));
                    modal.remove();
                    renderAddedPhotos();
                } catch (err) {
                    alert("Storage penuh! Coba hapus beberapa foto lama dulu ya Caca ♡");
                }
            });
        });
    }

    // E. TOOLBAR ADMIN DI POJOK KANAN BAWAH
    function renderAdminBar() {
        const existing = document.getElementById("raishaAdminDock");
        if (existing) existing.remove();

        const dock = document.createElement("div");
        dock.id = "raishaAdminDock";

        const style = document.createElement("style");
        style.textContent = `
            #raishaAdminDock {
                position: fixed; bottom: 18px; right: 18px; z-index: 9998;
                display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
                background: rgba(255, 253, 249, 0.94); backdrop-filter: blur(8px);
                border: 1.5px solid var(--blush, #e9b7c7);
                padding: 8px 12px; border-radius: 30px;
                box-shadow: 0 10px 28px rgba(157, 111, 105, 0.22);
                font-family: var(--body, sans-serif);
            }
            body.dark-mode #raishaAdminDock { background: rgba(48, 40, 45, 0.95); }
            .adm-btn {
                border: none; background: var(--pink, #fcecf1);
                color: var(--dark-rose, #a96870); padding: 7px 13px;
                border-radius: 20px; font-size: 11.5px; font-weight: 700;
                cursor: pointer; transition: 0.25s;
            }
            .adm-btn:hover, .adm-btn.active-edit {
                background: var(--dark-rose, #a96870); color: white;
            }
            .visual-editing-highlight {
                outline: 1.5px dashed #d99a9e !important;
                border-radius: 6px; cursor: text !important;
            }
            .img-editing-highlight {
                outline: 2.5px dashed #d99a9e !important;
                cursor: pointer !important;
                filter: brightness(0.95);
            }
        `;
        document.head.appendChild(style);

        if (!isUnlocked()) {
            const keyBtn = document.createElement("button");
            keyBtn.className = "adm-btn";
            keyBtn.innerHTML = "🔒 Admin";
            keyBtn.addEventListener("click", () => {
                const pin = prompt("Enter Raisha's Secret PIN to unlock Admin Edit Mode ✿:");
                if (pin === SECRET_PIN) {
                    setUnlocked(true);
                    renderAdminBar();
                    renderAddedPhotos();
                } else if (pin !== null) {
                    alert("Wrong PIN ♡");
                }
            });
            dock.appendChild(keyBtn);
        } else {
            const hiddenReplaceInput = document.createElement("input");
            hiddenReplaceInput.type = "file";
            hiddenReplaceInput.accept = "image/*";
            hiddenReplaceInput.style.display = "none";
            document.body.appendChild(hiddenReplaceInput);

            let targetImgIndex = null;

            hiddenReplaceInput.addEventListener("change", () => {
                if (hiddenReplaceInput.files && hiddenReplaceInput.files[0] && targetImgIndex !== null) {
                    compressImageFile(hiddenReplaceInput.files[0], (compressedSrc) => {
                        const pageImgs = document.querySelectorAll("main img");
                        if (pageImgs[targetImgIndex]) {
                            pageImgs[targetImgIndex].src = compressedSrc;
                        }
                        const imgMap = JSON.parse(localStorage.getItem(imgReplaceKey) || "{}");
                        imgMap[targetImgIndex] = compressedSrc;
                        localStorage.setItem(imgReplaceKey, JSON.stringify(imgMap));
                        hiddenReplaceInput.value = "";
                    });
                }
            });

            const editToggleBtn = document.createElement("button");
            editToggleBtn.className = "adm-btn";
            editToggleBtn.innerHTML = "✎ Edit Mode";

            const addPhotoBtn = document.createElement("button");
            addPhotoBtn.className = "adm-btn";
            addPhotoBtn.innerHTML = "📷 + Photo";

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
                isVisualEditActive = !isVisualEditActive;
                const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");
                const pageImgs = document.querySelectorAll("main img");

                editableEls.forEach(el => {
                    el.contentEditable = isVisualEditActive ? "true" : "false";
                    el.classList.toggle("visual-editing-highlight", isVisualEditActive);
                });

                pageImgs.forEach((img, idx) => {
                    img.classList.toggle("img-editing-highlight", isVisualEditActive);
                    img.title = isVisualEditActive ? "Click to replace this photo from folder 📷" : "";
                    img.onclick = isVisualEditActive
                        ? (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              targetImgIndex = idx;
                              hiddenReplaceInput.click();
                          }
                        : null;
                });

                editToggleBtn.classList.toggle("active-edit", isVisualEditActive);
                editToggleBtn.innerHTML = isVisualEditActive ? "✓ Editing On" : "✎ Edit Mode";
                saveBtn.style.display = isVisualEditActive ? "inline-block" : "none";
                resetBtn.style.display = isVisualEditActive ? "inline-block" : "none";
            });

            addPhotoBtn.addEventListener("click", openAddPhotoModal);

            saveBtn.addEventListener("click", () => {
                const editableEls = document.querySelectorAll("main h1, main h2, main h3, main h4, main p, main blockquote");
                const dataToSave = {};
                editableEls.forEach((el, idx) => {
                    dataToSave[idx] = el.innerHTML;
                });
                localStorage.setItem(textStorageKey, JSON.stringify(dataToSave));
                saveBtn.innerHTML = "Saved! ♡";
                setTimeout(() => {
                    saveBtn.innerHTML = "💾 Save";
                }, 1400);
            });

            resetBtn.addEventListener("click", () => {
                if (confirm("Reset all edited texts & replaced photos on this page back to default?")) {
                    localStorage.removeItem(textStorageKey);
                    localStorage.removeItem(imgReplaceKey);
                    localStorage.removeItem(addedPhotosKey);
                    location.reload();
                }
            });

            lockNowBtn.addEventListener("click", () => {
                setUnlocked(false);
                isVisualEditActive = false;
                if (isPrivatePage) {
                    location.reload();
                } else {
                    renderAdminBar();
                    renderAddedPhotos();
                }
            });

            dock.appendChild(editToggleBtn);
            dock.appendChild(addPhotoBtn);
            dock.appendChild(saveBtn);
            dock.appendChild(resetBtn);
            dock.appendChild(lockNowBtn);
        }

        document.body.appendChild(dock);
    }

    function initAllFeatures() {
        setupGlobalPhotoLightbox();
        loadSavedContent();
        renderLockScreen();
        renderAdminBar();
    }

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", initAllFeatures);
    } else {
        initAllFeatures();
    }
})();

// ===================================
// END OF LITTLE UNIVERSE ✿
// ===================================
