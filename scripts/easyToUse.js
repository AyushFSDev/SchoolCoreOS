const addIon = `
<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22">
<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
</svg>
`;

const crossIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22">
<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
</svg>
`;

const data = [
  {
    title: "Upload Thousands of Records in Seconds",
    desc: "Upload thousands of records in seconds — no friction, no complexity.",
    img: "../assets/images/bulk-upload-image.png",
  },
  {
    title: "Speak your institution's language.",
    desc: "Custom terminology support for departments and faculties.",
    img: "https://via.placeholder.com/600x400?text=Language+Settings",
  },
  {
    title: "See your campus. Live.",
    desc: "Real-time interactive map showing occupancy and status.",
    img: "https://via.placeholder.com/600x400?text=Live+Map",
  },
  {
    title: "Training Plans",
    desc: "Onboarding workflows for staff and students.",
    img: "https://via.placeholder.com/600x400?text=Training",
  },
  {
    title: "Scheduling. On demand.",
    desc: "Automated resource allocation and room booking.",
    img: "https://via.placeholder.com/600x400?text=Scheduling",
  },
  {
    title: "Assets. Under control.",
    desc: "Inventory management for institutional assets.",
    img: "https://via.placeholder.com/600x400?text=Assets",
  },
];

let current = 0;

function init() {
  const list = document.getElementById("desktopList");

  data.forEach((item, i) => {
    const group = document.createElement("div");

    group.className = `feature-group ${i === 0 ? "active" : ""}`;

    group.innerHTML = `
<div class="feature-pill ${i === 0 ? "active" : ""}" onclick="setFeature(${i})">

<div class="icon-wrapper">
${i === 0 ? crossIcon : addIon}
</div>

<span>${item.title}</span>

</div>

<div class="description-box">
${item.desc}
</div>
`;

    list.appendChild(group);
  });

  update();
}

function setFeature(i) {
  current = i;
  update();
}

function move(dir) {
  current = (current + dir + data.length) % data.length;
  update();
}

function update() {
  const item = data[current];

  document.getElementById("mainPreview").src = item.img;
  document.getElementById("mobilePreview").src = item.img;

  document.querySelectorAll(".feature-group").forEach((g, i) => {
    g.classList.toggle("active", i === current);

    g.querySelector(".feature-pill").classList.toggle("active", i === current);

    g.querySelector(".icon-wrapper").innerHTML =
      i === current ? crossIcon : addIon;
  });

  const mobile = document.getElementById("mobileDetails");

  mobile.innerHTML = `
<div class="feature-pill active">

<div class="icon-wrapper">
${crossIcon}
</div>

<span>${item.title}</span>

</div>

<div class="description-box" style="max-height:200px;opacity:1;padding:24px">

${item.desc}

</div>
`;
}

init();
