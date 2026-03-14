 const MobileFirstslides = [
    {
      eyebrow: "THE mobile-solution",
      heading: "One unified platform.<br>Total institutional control.",
      subtext: "Replace fragmented systems with a single operating layer that connects academics, finance, compliance, and communication in real time.",
      image: "https://www.plainconcepts.com/wp-content/uploads/2021/04/modulo-dashboards.png",
      features: [
        { icon: "✓", title: "Centralized Governance", desc: "Unified data across departments and campuses." },
        { icon: "✓", title: "Automated Workflows",    desc: "Reduce manual operations and approval delays." },
        { icon: "✓", title: "Built-in Compliance",    desc: "Audit trails and policies embedded from day one." },
      ]
    },
    {
      eyebrow: "MOBILE-FIRST",
      heading: "Built for phones.<br>Designed for everyone.",
      subtext: "Teachers mark attendance, parents pay fees, and principals see live analytics — all from their pocket.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      features: [
        { icon: "✓", title: "Native iOS & Android Apps",  desc: "Separate purpose-built apps for teachers, parents & admin." },
        { icon: "✓", title: "Offline Mode",               desc: "Mark attendance and access data even without internet." },
        { icon: "✓", title: "Instant Push Notifications", desc: "Fee alerts, absence notifications, exam results in real time." },
      ]
    },
    {
      eyebrow: "ANALYTICS",
      heading: "Real-time insights.<br>Smarter decisions.",
      subtext: "Live dashboards surface the metrics that matter most — from fee collection rates to student attendance trends.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        { icon: "✓", title: "Live Dashboards", desc: "See every KPI update the moment it changes." },
        { icon: "✓", title: "Trend Reports",   desc: "Weekly and monthly breakdowns emailed automatically." },
        { icon: "✓", title: "Goal Tracking",   desc: "Set targets for enrolment, fees, and attendance." },
      ]
    },
    {
      eyebrow: "SECURITY",
      heading: "Enterprise-grade.<br>School-friendly.",
      subtext: "Role-based access, end-to-end encryption, and full audit logs keep every piece of student data safe.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      features: [
        { icon: "✓", title: "Role-Based Access",     desc: "Every user sees only what they need to see." },
        { icon: "✓", title: "End-to-End Encryption", desc: "Data encrypted at rest and in transit." },
        { icon: "✓", title: "Full Audit Logs",        desc: "Every action tracked and reportable." },
      ]
    },
  ];

  /* ── DOM ── */
  const stickyWrap     = document.getElementById("stickyWrap");
  const eyebrowEl      = document.getElementById("eyebrow");
  const headingEl      = document.getElementById("cardHeading");
  const subtextEl      = document.getElementById("cardSubtext");
  const featuresEl     = document.getElementById("cardFeatures");
  const imageEl        = document.getElementById("cardImage");
  const slideContent   = document.getElementById("slideContent");
  const vpDotsWrap     = document.getElementById("vpDotsWrap");
  const prevBtn        = document.getElementById("prevBtn");
  const nextBtn        = document.getElementById("nextBtn");
  const scrollHint     = document.getElementById("scrollHint");
  const counterCurrent = document.getElementById("counterCurrent");
  const counterTotal   = document.getElementById("counterTotal");

  /* ── State ── */
  let current      = 0;
  let transitioning= false;

  /* ── Setup ── */
  counterTotal.textContent = MobileFirstslides.length;
  // Each slide = 1 viewport of scroll travel
  stickyWrap.style.height  = (MobileFirstslides.length * 100) + "vh";

  /* ── Build dots ── */
  function buildProgress() {
    vpDotsWrap.innerHTML = "";
    MobileFirstslides.forEach((_, i) => {
      const step = document.createElement("div");
      step.className = "vp-step" + (i === current ? " active" : i < current ? " done" : "");
      step.innerHTML = `<div class="vp-dot"></div>`;
      step.addEventListener("click", () => scrollToSlide(i));
      vpDotsWrap.appendChild(step);
    });
    counterCurrent.textContent = current + 1;
    scrollHint.classList.toggle("hidden", current > 0);
  }

  /* ── Render features ── */
  function renderFeatures(s) {
    featuresEl.innerHTML = s.features.map(f => `
      <div class="feature">
        <div class="icon">${f.icon}</div>
        <div><h4>${f.title}</h4><p>${f.desc}</p></div>
      </div>`).join("");
  }

  /* ── Transition to slide ── */
  function goTo(idx, dir) {
    if (transitioning) return;
    idx = Math.max(0, Math.min(MobileFirstslides.length - 1, idx));
    if (idx === current) return;
    transitioning = true;

    const outClass = dir === "up" ? "out-up" : "out-down";
    slideContent.classList.add(outClass);
    imageEl.classList.add("img-out");

    setTimeout(() => {
      current = idx;
      const s = MobileFirstslides[current];
      eyebrowEl.textContent = s.eyebrow;
      headingEl.innerHTML   = s.heading;
      subtextEl.textContent = s.subtext;
      imageEl.src           = s.image;
      renderFeatures(s);

      slideContent.classList.remove(outClass);
      imageEl.classList.remove("img-out");
      buildProgress();

      setTimeout(() => { transitioning = false; }, 460);
    }, 400);
  }

  /* ── Map scroll → target slide ── */
  function getTargetSlide() {
    const wrapTop    = stickyWrap.getBoundingClientRect().top;
    const scrolledIn = -wrapTop;   // px scrolled past top of wrapper
    const maxScroll  = stickyWrap.offsetHeight - window.innerHeight;
    if (scrolledIn <= 0)          return 0;
    if (scrolledIn >= maxScroll)  return MobileFirstslides.length - 1;
    const progress = scrolledIn / maxScroll;
    return Math.round(progress * (MobileFirstslides.length - 1));
  }

  /* ── Scroll listener (passive, rAF throttled) ── */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const target = getTargetSlide();
      if (target !== current) goTo(target, target > current ? "down" : "up");
      ticking = false;
    });
  }, { passive: true });

  /* ── Button clicks: scroll page to matching position ── */
  function scrollToSlide(idx) {
    idx = Math.max(0, Math.min(MobileFirstslides.length - 1, idx));
    const maxScroll = stickyWrap.offsetHeight - window.innerHeight;
    const targetY   = stickyWrap.offsetTop + (idx / (MobileFirstslides.length - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollToSlide(current - 1));
  nextBtn.addEventListener("click", () => scrollToSlide(current + 1));

  /* ── Init ── */
  renderFeatures(MobileFirstslides[0]);
  buildProgress();