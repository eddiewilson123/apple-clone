// JavaScript for the slideshow
// Function to handle slideshow navigation
function setupSlideshow(slideshowContainer) {
  const slides = slideshowContainer.querySelectorAll('.slide');
  const nextArrow = slideshowContainer.querySelector('.next-arrow');
  let currentSlideIndex = 0;

  // Show the current slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  // Navigate to the next slide
  nextArrow.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  });

  // Initialize the slideshow
  showSlide(currentSlideIndex);
}

// Initialize all slideshows
document.addEventListener('DOMContentLoaded', () => {
  const slideshowContainers = document.querySelectorAll('.slideshow-container');
  slideshowContainers.forEach(setupSlideshow);

  // Ensure the sidebar menu starts closed
  const menu = document.getElementById("sideMenu");
  menu.style.width = "0";
});

// Toggle the sidebar menu
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu.style.width === "250px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "250px";
  }
}