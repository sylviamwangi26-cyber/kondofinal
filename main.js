const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==================== TRANSLATION SYSTEM ====================
let currentLang = localStorage.getItem('siteLanguage') || 'it';

function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            // Check if it's a placeholder or similar attribute
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translations[currentLang][key];
                } else {
                    el.value = translations[currentLang][key];
                }
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });

    // Update active state of global lang buttons
    document.querySelectorAll('.global-btn-lang').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Special case for page titles
    const pageTitleKey = `title-${window.location.pathname.split('/').pop().replace('.html', '') || 'index'}`;
    if (translations[currentLang][pageTitleKey]) {
        document.title = translations[currentLang][pageTitleKey];
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLanguage', lang);
    updateContent();

    // Dispatch event for other scripts (like package.js)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}

// Global lang switcher buttons in NAV
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('global-btn-lang')) {
        const lang = e.target.getAttribute('data-lang');
        setLanguage(lang);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});

// ==================== INFINITE SLIDER ====================
const sliderTrack = document.querySelector('.slider-track');

if (sliderTrack) {

    sliderTrack.addEventListener('mouseenter', () => {
        sliderTrack.style.animationPlayState = 'paused';
    });

    sliderTrack.addEventListener('mouseleave', () => {
        sliderTrack.style.animationPlayState = 'running';
    });

    let isDragging = false;
    let startX;
    let scrollLeft;

    sliderTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - sliderTrack.offsetLeft;
        scrollLeft = sliderTrack.scrollLeft;
        sliderTrack.style.cursor = 'grabbing';
        sliderTrack.style.animationPlayState = 'paused';
    });

    sliderTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        sliderTrack.style.cursor = 'grab';
        sliderTrack.style.animationPlayState = 'running';
    });

    sliderTrack.addEventListener('mouseup', () => {
        isDragging = false;
        sliderTrack.style.cursor = 'grab';
        sliderTrack.style.animationPlayState = 'running';
    });

    sliderTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderTrack.offsetLeft;
        const walk = (x - startX) * 2;
        sliderTrack.scrollLeft = scrollLeft - walk;
    });
}

// ==================== RATING SYSTEM ====================
const ratingForm = document.getElementById('ratingForm');
const testimonialGrid = document.getElementById('testimonialGrid');

function loadReviews() {
    const savedReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    savedReviews.forEach(data => {
        addReviewToDOM(data.stars, data.review, data.name);
    });
}

function addReviewToDOM(starsCount, review, name) {
    const stars = "⭐".repeat(starsCount);
    const newCard = document.createElement('div');
    newCard.className = 'testimonial-card';
    newCard.innerHTML = `
        <div class="stars">${stars}</div>
        <p>${review}</p>
        <span class="author">– ${name}</span>
    `;
    testimonialGrid.prepend(newCard);
}

if (ratingForm && testimonialGrid) {
    loadReviews();

    ratingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ratingInput = ratingForm.querySelector('input[name="rating"]:checked');
        const review = document.getElementById('reviewText').value;
        const name = document.getElementById('reviewerName').value;

        if (!ratingInput) {
            alert("Per favore, seleziona una valutazione!");
            return;
        }

        const ratingVal = parseInt(ratingInput.value);

        // Save to localStorage
        const savedReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
        savedReviews.push({ stars: ratingVal, review, name });
        localStorage.setItem('userReviews', JSON.stringify(savedReviews));

        // Add to DOM
        addReviewToDOM(ratingVal, review, name);

        alert("Grazie per la tua recensione!");
        ratingForm.reset();
    });
}
