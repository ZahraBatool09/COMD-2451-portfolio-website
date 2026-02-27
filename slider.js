// Slideshow (auto + arrows + dots)
// Supports slides as <img class="mySlides"> inside optional <a> wrappers.

let slideIndex = 1;
let autoTimer = null;

function getSlides() {
  return document.getElementsByClassName("mySlides");
}

function getSlideWrappers(slides) {
  // wrapper is the parent element (could be <a> or the container)
  const wrappers = [];
  for (let i = 0; i < slides.length; i++) {
    wrappers.push(slides[i].parentElement);
  }
  return wrappers;
}

function showSlides(n) {
  const slides = getSlides();
  const dots = document.getElementsByClassName("dot");
  if (!slides || slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  const wrappers = getSlideWrappers(slides);

  // Hide all slides (and wrappers if they exist)
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if (wrappers[i] && wrappers[i].style) wrappers[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");

  // Show current
  slides[slideIndex - 1].style.display = "block";
  if (wrappers[slideIndex - 1] && wrappers[slideIndex - 1].style) {
    wrappers[slideIndex - 1].style.display = "block";
  }

  if (dots.length >= slideIndex) dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
  restartAuto();
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
  restartAuto();
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => {
    slideIndex += 1;
    showSlides(slideIndex);
  }, 3500);
}

function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

function restartAuto() { startAuto(); }

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
  startAuto();
});
