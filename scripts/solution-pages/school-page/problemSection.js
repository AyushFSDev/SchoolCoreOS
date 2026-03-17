  const track = document.getElementById("problem-track");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const dotsEl = document.getElementById("dots");

      const TOTAL = 6;
      let current = 0;
      let visible = getVisible();
      let pages = Math.ceil(TOTAL / visible);

      function getVisible() {
        return window.innerWidth <= 700 ? 1 : 3;
      }

      function buildDots() {
        dotsEl.innerHTML = "";
        for (let i = 0; i < pages; i++) {
          const d = document.createElement("div");
          d.className = "dot" + (i === current ? " active" : "");
          d.addEventListener("click", () => goTo(i));
          dotsEl.appendChild(d);
        }
      }

      function getSlideOffset() {
        const card = track.querySelector(".card");
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        return (card.offsetWidth + gap) * visible * current;
      }

      function updateCarousel() {
        track.style.transform = `translateX(-${getSlideOffset()}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= pages - 1;
        document
          .querySelectorAll(".dot")
          .forEach((d, i) => d.classList.toggle("active", i === current));
      }

      function slide(dir) {
        current = Math.max(0, Math.min(pages - 1, current + dir));
        updateCarousel();
      }

      function goTo(page) {
        current = page;
        updateCarousel();
      }

      // On resize — rebuild if visible count changes
      window.addEventListener("resize", () => {
        const newVisible = getVisible();
        if (newVisible !== visible) {
          visible = newVisible;
          pages = Math.ceil(TOTAL / visible);
          current = 0;
          buildDots();
        }
        updateCarousel();
      });

      // Keyboard
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") slide(-1);
        if (e.key === "ArrowRight") slide(1);
      });

      // Touch swipe
      let startX = 0;
      track.addEventListener(
        "touchstart",
        (e) => (startX = e.touches[0].clientX),
        { passive: true },
      );
      track.addEventListener("touchend", (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1);
      });

      // Init
      buildDots();
      updateCarousel();
