/* =========================================================
   NAVBAR (Mobile Toggle)
   ========================================================= */
export function initNavbar() {
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

// Close mobile menu
function closeMobileMenu() {
  burgerBtn.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
}

// Toggle mobile menu open/close
function toggleMobileMenu() {
  const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
  burgerBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
}

burgerBtn.addEventListener("click", toggleMobileMenu);

// Close menu when clicking a mobile link
mobileMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-link")) {
    closeMobileMenu();
  }
});
}