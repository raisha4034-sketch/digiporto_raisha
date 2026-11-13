/* =========================================
   LITTLE UNIVERSE ✿
   Digital Diary Script (diary.js)
   ========================================= */

// 1. Cerita bawaan di buku harian (Caca bisa ubah teksnya di sini!)
const defaultEntries = [
    {
        id: 'entry-1',
        date: 'NOVEMBER 10, 2026',
        category: 'campus',
        mood: '🎓 Campus Life',
        title: 'First Semester Adventures in Information Systems',
        story: `Stepping into university life felt a little overwhelming at first—new faces, new schedules, and learning things like algorithms, matrices, and programming.\n\nYet somewhere between coding assignments and campus walks, I realized I am genuinely enjoying the process. Every small error I fix feels like a tiny victory. Here is to growing step by step! ✿`,
        isCustom: false
    },
    {
        id: 'entry-2',
        date: 'NOVEMBER 04, 2026',
        category: 'everyday',
        mood: '✿ Everyday',
        title: 'Building My Own Little Corner on the Internet',
        story: `Today I spent hours choosing pastel colors and fonts for Little Universe. I wanted this website to feel like opening a warm, cozy scrapbook rather than a rigid tech page.\n\nHaving a space that reflects both my IT journey and my soft, creative side makes me so happy ♡`,
        isCustom: false
    },
    {
        id: 'entry-3',
        date: 'OCTOBER 27, 2026',
        category: 'thoughts',
        mood: '☁ Late Night Thoughts',
        title: 'A Gentle Reminder to Slow Down',
        story: `Sometimes it feels like everyone is running so fast toward their goals. Tonight, listening to soft music, I reminded myself that flowers do not bloom all at once.\n\nTaking a deep breath, enjoying quiet moments, and appreciating how far I have come is more than enough.`,
        isCustom: false
    },
    {
        id: 'entry-4',
        date: 'OCTOBER 18, 2026',
        category: 'everyday',
        mood: '✿ Everyday',
        title: 'Afternoon Drives & Favorite Playlists',
        story: `There is something magical about driving around Bandung in the late afternoon while playing my favorite songs.\n\nGolden sunlight filtering through the trees, cool breeze, and zero rush—definitely one of my favorite simple joys.`,
        isCustom: false
    }
];

// Ambil elemen HTML
const diaryGrid = document.getElementById('diaryGrid');
const diaryForm = document.getElementById('diaryForm');
const filterButtons = document.querySelectorAll('.filter-btn');

// Elemen Modal Baca Cerita
const diaryModal = document.getElementById('diaryModal');
const closeDiaryModal = document.getElementById('closeDiaryModal');
const modalMood = document.getElementById('modalMood');
const modalDate = document.getElementById('modalDate');
const modalTitle = document.getElementById('modalTitle');
const modalStory = document.getElementById('modalStory');

let currentFilter = 'all';

// 2. Ambil catatan tambahan dari localStorage (jika Caca pernah menulis baru)
function getCustomEntries() {
    const saved = localStorage.getItem('littleUniverseDiary');
    return saved ? JSON.parse(saved) : [];
}

function saveCustomEntries(entries) {
    localStorage.setItem('littleUniverseDiary', JSON.stringify(entries));
}

// 3. Tampilkan semua kartu diari ke layar
function renderDiary() {
    const allEntries = [...getCustomEntries(), ...defaultEntries];

    const filteredEntries = currentFilter === 'all'
        ? allEntries
        : allEntries.filter(item => item.category === currentFilter);

    diaryGrid.innerHTML = '';

    filteredEntries.forEach(entry => {
        // Buat ringkasan singkat (maksimal 135 huruf)
        const shortText = entry.story.length > 135
            ? entry.story.substring(0, 135) + '...'
            : entry.story;

        const card = document.createElement('article');
        card.className = 'diary-card';
        card.innerHTML = `
            <div>
                <span class="diary-mood-tag">${entry.mood}</span>
                <span class="diary-date">${entry.date}</span>
                <h3>${entry.title}</h3>
                <p class="diary-excerpt">${shortText}</p>
            </div>
            <div class="diary-card-footer">
                <button class="read-entry-btn" data-id="${entry.id}">
                    Read full entry <i class="fa-solid fa-arrow-right"></i>
                </button>
                ${entry.isCustom ? `<button class="delete-entry-btn" data-delete="${entry.id}" title="Delete note"><i class="fa-regular fa-trash-can"></i></button>` : ''}
            </div>
        `;

        diaryGrid.appendChild(card);
    });

    // Pasang fungsi klik "Read full entry"
    document.querySelectorAll('.read-entry-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = allEntries.find(item => item.id === btn.dataset.id);
            if (target) {
                modalMood.textContent = target.mood;
                modalDate.textContent = target.date;
                modalTitle.textContent = target.title;
                modalStory.textContent = target.story;
                diaryModal.classList.add('open');
            }
        });
    });

    // Pasang fungsi hapus khusus catatan yang ditulis sendiri
    document.querySelectorAll('.delete-entry-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const updated = getCustomEntries().filter(item => item.id !== btn.dataset.delete);
            saveCustomEntries(updated);
            renderDiary();
        });
    });
}

// 4. Tambah catatan baru dari formulir
diaryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('entryTitle').value.trim();
    const categoryInput = document.getElementById('entryCategory').value;
    const storyInput = document.getElementById('entryStory').value.trim();

    if (!titleInput || !storyInput) return;

    const moodLabels = {
        everyday: '✿ Everyday',
        campus: '🎓 Campus Life',
        thoughts: '☁ Late Night Thoughts'
    };

    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).toUpperCase();

    const newEntry = {
        id: 'custom-' + Date.now(),
        date: today,
        category: categoryInput,
        mood: moodLabels[categoryInput],
        title: titleInput,
        story: storyInput,
        isCustom: true
    };

    const customEntries = getCustomEntries();
    customEntries.unshift(newEntry);
    saveCustomEntries(customEntries);

    diaryForm.reset();
    renderDiary();
});

// 5. Tombol filter kategori
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderDiary();
    });
});

// 6. Tutup modal cerita
closeDiaryModal.addEventListener('click', () => {
    diaryModal.classList.remove('open');
});

diaryModal.addEventListener('click', (e) => {
    if (e.target === diaryModal) {
        diaryModal.classList.remove('open');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        diaryModal.classList.remove('open');
    }
});

// Jalankan pertama kali saat halaman dibuka
renderDiary();
