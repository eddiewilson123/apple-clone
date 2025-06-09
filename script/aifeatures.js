document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop"); // Get the Back to Top button

  if (backToTop) {
    backToTop.style.display = "none"; // Hide button by default

    // Show button when user scrolls down 300px, hide otherwise
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    // Smooth scroll to top when button is clicked
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Reveal animation for elements with .reveal class
  const reveals = document.querySelectorAll('.reveal'); // Get all elements to reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // Add .active when in viewport
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of element is visible
  );

  // Observe each .reveal element for scroll-based animation
  reveals.forEach(reveal => observer.observe(reveal));
});
