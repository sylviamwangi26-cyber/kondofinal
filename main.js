const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('active');
    });
}

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

if (ratingForm && testimonialGrid) {
    ratingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const rating = ratingForm.querySelector('input[name="rating"]:checked');
        const review = document.getElementById('reviewText').value;
        const name = document.getElementById('reviewerName').value;

        if (!rating) {
            alert("Per favore, seleziona una valutazione!");
            return;
        }

        const stars = "⭐".repeat(parseInt(rating.value));

        const newCard = document.createElement('div');
        newCard.className = 'testimonial-card';
        newCard.innerHTML = `
            <div class="stars">${stars}</div>
            <p>${review}</p>
            <span class="author">– ${name}</span>
        `;

        testimonialGrid.prepend(newCard);

        alert("Grazie per la tua recensione!");
        ratingForm.reset();
    });
}
