/* =========================================
   LITTLE UNIVERSE ✿
   Memories Lightbox Script (memories.js)
   ========================================= */

const memoryCards = document.querySelectorAll('.memory-card');
const lightbox = document.getElementById('memoryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');

memoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const image = card.querySelector('img');

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = card.dataset.caption;

        lightbox.classList.add('active');
    });
});

function closeMemory() {
    lightbox.classList.remove('active');
}

closeLightbox.addEventListener('click', closeMemory);

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeMemory();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMemory();
    }
});
