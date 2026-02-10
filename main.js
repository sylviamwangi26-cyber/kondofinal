const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if(menuToggle && navLinks){
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ==================== INFINITE SLIDER ====================
const sliderTrack = document.querySelector('.slider-track');

if(sliderTrack){

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
