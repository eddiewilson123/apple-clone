// JavaScript for the slideshow and page functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize slideshow functionality
  initializeSlideshows();
  
  // Ensure the sidebar menu starts closed
  const menu = document.getElementById("sideMenu");
  if (menu) {
    menu.style.width = "0";
  }
});

// Initialize slideshow for all product cards
function initializeSlideshows() {
  document.querySelectorAll('.product-card').forEach(card => {
    const slides = card.querySelectorAll('.slide');
    const nextArrow = card.querySelector('.next-arrow');
    let currentSlide = 0;

    if (nextArrow && slides.length > 0) {
      nextArrow.addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
        slides[currentSlide].classList.add('active');
      });
    }
  });
}

// Toggle the sidebar menu
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu) {
    if (menu.style.width === "250px") {
      menu.style.width = "0";
    } else {
      menu.style.width = "250px";
    }
  }
}