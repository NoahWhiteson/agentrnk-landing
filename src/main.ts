import "./style.css";

const header = document.querySelector<HTMLElement>(".header");
const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function onScroll() {
  if (!header) return;
  header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
