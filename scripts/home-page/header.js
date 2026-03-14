const hamburger = document.getElementById("hamburger");
const offcanvas = document.getElementById("offcanvas");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openMenu() {
  offcanvas.classList.add("open");
  overlay.classList.add("visible");
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  offcanvas.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  offcanvas.classList.remove("open");
  overlay.classList.remove("visible");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  offcanvas.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
