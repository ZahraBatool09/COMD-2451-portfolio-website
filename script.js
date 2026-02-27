// Global hamburger menu (works on every page)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (!hamburger || !navMenu) return;

  const navLinks = document.querySelectorAll(".nav-link");

  function closeMenu(){
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when pressing ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
