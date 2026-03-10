const slides = [
    {
      eyebrow: "THE SOLUTION",
      heading: "One unified platform.<br>Total institutional control.",
      subtext: "Replace fragmented systems with a single operating layer that connects academics, finance, compliance, and communication in real time.",
      image: "https://www.plainconcepts.com/wp-content/uploads/2021/04/modulo-dashboards.png",
      features: [
        { icon: "✓", title: "Centralized Governance",  desc: "Unified data across departments and campuses." },
        { icon: "✓", title: "Automated Workflows",     desc: "Reduce manual operations and approval delays." },
        { icon: "✓", title: "Built-in Compliance",     desc: "Audit trails and policies embedded from day one." },
      ]
    },
    {
      eyebrow: "MOBILE-FIRST",
      heading: "Built for phones.<br>Designed for everyone.",
      subtext: "Teachers mark attendance, parents pay fees, and principals see live analytics — all from their pocket.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      features: [
        { icon: "📱", title: "Native iOS & Android Apps",   desc: "Separate purpose-built apps for teachers, parents & admin." },
        { icon: "📶", title: "Offline Mode",                desc: "Mark attendance and access data even without internet." },
        { icon: "🔔", title: "Instant Push Notifications",  desc: "Fee alerts, absence notifications, exam results in real time." },
      ]
    },
    {
      eyebrow: "ANALYTICS",
      heading: "Real-time insights.<br>Smarter decisions.",
      subtext: "Live dashboards surface the metrics that matter most — from fee collection rates to student attendance trends.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        { icon: "📊", title: "Live Dashboards",       desc: "See every KPI update the moment it changes." },
        { icon: "📈", title: "Trend Reports",         desc: "Weekly and monthly breakdowns emailed automatically." },
        { icon: "🎯", title: "Goal Tracking",         desc: "Set targets for enrolment, fees, and attendance." },
      ]
    },
    {
      eyebrow: "SECURITY",
      heading: "Enterprise-grade.<br>School-friendly.",
      subtext: "Role-based access, end-to-end encryption, and full audit logs keep every piece of student data safe.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      features: [
        { icon: "🔒", title: "Role-Based Access",    desc: "Every user sees only what they need to see." },
        { icon: "🛡️", title: "End-to-End Encryption", desc: "Data encrypted at rest and in transit." },
        { icon: "📋", title: "Full Audit Logs",       desc: "Every action tracked and reportable." },
      ]
    },
  ];

  let current = 0;
  let transitioning = false;
  let autoTimer = null;

  const eyebrowEl  = document.getElementById("eyebrow");
  const headingEl  = document.getElementById("cardHeading");
  const subtextEl  = document.getElementById("cardSubtext");
  const featuresEl = document.getElementById("cardFeatures");
  const imageEl    = document.getElementById("cardImage");
  const vpWrap     = document.getElementById("vpDotsWrap");
  const prevBtn    = document.getElementById("prevBtn");
  const nextBtn    = document.getElementById("nextBtn");

  // ---- BUILD VERTICAL PROGRESS ----
  function buildProgress() {
    vpWrap.innerHTML = "";
    slides.forEach((_, i) => {
      // Step dot
      const step = document.createElement("div");
      step.className = "vp-step" + (i === current ? " active" : i < current ? " done" : "");
      step.dataset.index = i;
      step.innerHTML = `<div class="vp-dot-wrap"><div class="vp-dot"></div></div>`;
      step.addEventListener("click", () => goTo(i));
      vpWrap.appendChild(step);

      // Line between dots (not after last)
      if (i < slides.length - 1) {
        const line = document.createElement("div");
        line.className = "vp-line";
        line.innerHTML = `<div class="vp-line-fill" style="height:${i < current ? '100%' : '0%'}"></div>`;
        vpWrap.appendChild(line);
      }
    });
  }

  // ---- RENDER FEATURES ----
  function renderFeatures(slide) {
    featuresEl.innerHTML = slide.features.map(f => `
      <div class="feature">
        <div class="icon">${f.icon}</div>
        <div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // ---- GO TO SLIDE ----
  function goTo(idx) {
    if (transitioning || idx === current) return;
    transitioning = true;
    resetAuto();

    // Fade out text
    headingEl.classList.add("fade-out");
    subtextEl.classList.add("fade-out");
    featuresEl.classList.add("fade-out");
    imageEl.classList.add("img-fade-out");

    setTimeout(() => {
      current = (idx + slides.length) % slides.length;
      const s = slides[current];

      // Update content
      eyebrowEl.textContent   = s.eyebrow;
      headingEl.innerHTML     = s.heading;
      subtextEl.textContent   = s.subtext;
      imageEl.src             = s.image;
      renderFeatures(s);

      // Remove fade-out, trigger fade-in
      headingEl.classList.remove("fade-out");
      subtextEl.classList.remove("fade-out");
      featuresEl.classList.remove("fade-out");
      imageEl.classList.remove("img-fade-out");

      headingEl.classList.add("fade-in");
      subtextEl.classList.add("fade-in");
      featuresEl.classList.add("fade-in");

      setTimeout(() => {
        headingEl.classList.remove("fade-in");
        subtextEl.classList.remove("fade-in");
        featuresEl.classList.remove("fade-in");
        transitioning = false;
      }, 450);

      buildProgress();
    }, 380);
  }

  // ---- ARROW BUTTONS ----
  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  // ---- AUTO PLAY ----
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  // ---- INIT ----
  renderFeatures(slides[0]);
  buildProgress();
  resetAuto();