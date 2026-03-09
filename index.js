

// Close on nav link click
offcanvas.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeMenu);
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Easy to use section start -------------------
const data = [
  {
    title: "Upload Thousands of Records in Seconds",
    desc: "Upload thousands of records in seconds no friction, no complexity.",
    img: "./assets/bulk-upload.png",
  },
  {
    title: "Speak your institution's language.",
    desc: "Adapt every label and workflow to align with your academic terminology.",
    img: "https://via.placeholder.com/600x400/10b981/ffffff?text=Language",
  },
  {
    title: "See your campus. Live.",
    desc: "Visualise operations in real-time with an interactive, live map.",
    img: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Live+Map",
  },
  {
    title: "Training Plans",
    desc: "Create comprehensive onboarding paths tailored to individual roles.",
    img: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Training",
  },
  {
    title: "Scheduling. On demand.",
    desc: "Dynamic resource scheduling allows instantaneous adjustments.",
    img: "https://via.placeholder.com/600x400/ec4899/ffffff?text=Scheduling",
  },
  {
    title: "Assets. Under control.",
    desc: "Track every asset, from software to equipment, with oversight.",
    img: "https://via.placeholder.com/600x400/000000/ffffff?text=Assets",
  },
  {
    title: "Intelligence built in.",
    desc: "Built-in analytics turn data into actionable operational insights.",
    img: "https://via.placeholder.com/600x400/64748b/ffffff?text=Intelligence",
  },
];

const featureList = document.getElementById("featureList");
const mobileTrack = document.getElementById("mobileTrack");
const dotsContainer = document.getElementById("dotsContainer");

function init() {
  data.forEach((item, i) => {
    // Desktop list
    const div = document.createElement("div");
    div.className = `feature-item ${i === 0 ? "active" : ""}`;
    div.onclick = () => setActive(i);
    div.innerHTML = `<div class="title-row"><svg class="icon-circle-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg><span class="feature-title">${item.title}</span></div><p class="feature-description">${item.desc}</p>`;
    featureList.appendChild(div);

    // Mobile cards
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.innerHTML = `<img src="${item.img}" alt="img">`;
    mobileTrack.appendChild(card);

    // Dots
    const dot = document.createElement("div");
    dot.className = `dot ${i === 0 ? "active" : ""}`;
    dotsContainer.appendChild(dot);
  });
  setActive(0);
}

function setActive(index) {
  // Desktop logic
  const items = document.querySelectorAll(".feature-item");
  items.forEach((item, i) => item.classList.toggle("active", i === index));
  document.getElementById("desktopImage").src = data[index].img;

  // Mobile logic update text
  document.getElementById("mobileTitle").innerText = data[index].title;
  document.getElementById("mobileDesc").innerText = data[index].desc;

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function scrollCarousel(direction) {
  const cardWidth = mobileTrack.offsetWidth;
  mobileTrack.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

mobileTrack.addEventListener("scroll", () => {
  const index = Math.round(mobileTrack.scrollLeft / mobileTrack.offsetWidth);
  setActive(index);
});

init();


