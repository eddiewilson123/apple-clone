// JavaScript for the slideshow
document.querySelectorAll('.product-card').forEach(card => {
  const slides = card.querySelectorAll('.slide');
  const nextArrow = card.querySelector('.next-arrow');
  let currentSlide = 0;

  nextArrow.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    slides[currentSlide].classList.add('active');
  });
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