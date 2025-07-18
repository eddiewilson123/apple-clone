// Toggle the sidebar menu
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu.style.width === "250px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "250px";
  }
}

// Ensure the menu starts closed on page load
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("sideMenu");
  menu.style.width = "0";
});