document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('projectsCarousel');
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');

    // Set total slides
    totalSlides.textContent = document.querySelectorAll('.carousel-item').length;

    // Update current slide when carousel slides
    carousel.addEventListener('slid.bs.carousel', function() {
        const activeIndex = Array.from(document.querySelectorAll('.carousel-item')).indexOf(document.querySelector('.carousel-item.active'));
        currentSlide.textContent = activeIndex + 1;
    });
});