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


// =======================
// Lightbox (Work Gallery)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = Array.from(document.querySelectorAll(".gallery-thumb"));
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImage");
  const caption = document.getElementById("lightboxCaption");
  const btnClose = modal?.querySelector(".zb-close");
  const btnPrev = modal?.querySelector(".zb-prev");
  const btnNext = modal?.querySelector(".zb-next");

  if (!thumbs.length || !modal || !modalImg || !caption || !btnClose || !btnPrev || !btnNext) return;

  let currentIndex = 0;

  function openModal(index){
    currentIndex = index;

    const t = thumbs[currentIndex];
    const fullSrc = t.dataset.full || t.src;

    modalImg.src = fullSrc;
    modalImg.alt = t.alt || "Artwork";
    caption.textContent = t.alt || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  function showNext(){
    currentIndex = (currentIndex + 1) % thumbs.length;
    openModal(currentIndex);
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    openModal(currentIndex);
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => openModal(index));
  });

  btnClose.addEventListener("click", closeModal);
  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);

  // Click outside the image closes
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});