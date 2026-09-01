const opening = document.getElementById("opening");
const openButton = document.getElementById("openInvitation");
const body = document.body;

function openSite() {
  if (!opening) return;
  opening.classList.add("is-open");
  body.classList.remove("locked");
  document.documentElement.style.overflow = "";
  sessionStorage.setItem("newtonInvitationOpened", "true");
  window.setTimeout(() => {
    opening.style.display = "none";
  }, 950);
}

if (openButton) {
  openButton.addEventListener("click", openSite);
  openButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    openSite();
  }, { passive: false });
}

if (sessionStorage.getItem("newtonInvitationOpened") === "true") {
  opening.style.display = "none";
  body.classList.remove("locked");
}

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 40));

const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");
menuButton.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  siteNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const weddingDate = new Date("2027-09-25T14:00:00-04:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    countdown.innerHTML = "<div><strong>Today</strong><span>We say I do</span></div>";
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  countdown.innerHTML = `
    <div><strong>${days}</strong><span>Days</span></div>
    <div><strong>${hours}</strong><span>Hours</span></div>
    <div><strong>${minutes}</strong><span>Minutes</span></div>
    <div><strong>${seconds}</strong><span>Seconds</span></div>`;
}
updateCountdown();
setInterval(updateCountdown, 1000);
