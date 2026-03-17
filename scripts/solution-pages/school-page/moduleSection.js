/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP: fade-in entrance for category rows via IntersectionObserver
       ═══════════════════════════════════════════════════════════════════════ */
(function () {
    const io = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        }),
        { threshold: 0.12 }
    );
    document.querySelectorAll('.module-category').forEach(el => io.observe(el));
})();


/* ═══════════════════════════════════════════════════════════════════════
   MOBILE SECTION SLIDER
   ─ Single slider; each slide = one full category (title + all cards).
   ─ Only active on ≤ 768 px. No-op on desktop.
   ─ Reinitialises cleanly on resize via debounced listener.
═══════════════════════════════════════════════════════════════════════ */
(function () {
    const BREAKPOINT = 768;

    const track = document.getElementById('module-track');
    const counter = document.getElementById('module-counter');
    const dotsWrap = document.getElementById('module-dots');
    const btnPrev = document.getElementById('module-btn-prev');
    const btnNext = document.getElementById('module-btn-next');
    const slides = Array.from(track.querySelectorAll('.module-mob-slide'));
    const total = slides.length;

    let current = 0;
    let isActive = false;   // true when slider is running (mobile)
    let dots = [];

    /* ── Build dot buttons ───────────────────────────────────────────── */
    function buildDots() {
        dotsWrap.innerHTML = '';
        dots = slides.map((_, i) => {
            const d = document.createElement('button');
            d.className = 'module-mob-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('role', 'tab');
            d.setAttribute('aria-label', `Section ${i + 1} of ${total}`);
            d.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(d);
            return d;
        });
    }

    /* ── Navigate to slide n ─────────────────────────────────────────── */
    function goTo(n) {
        current = Math.max(0, Math.min(n, total - 1));
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.textContent = `${current + 1} / ${total}`;
        btnPrev.disabled = current === 0;
        btnNext.disabled = current === total - 1;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    /* ── Arrow handlers ──────────────────────────────────────────────── */
    function onPrev() { goTo(current - 1); }
    function onNext() { goTo(current + 1); }

    /* ── Touch / swipe ───────────────────────────────────────────────── */
    let touchStartX = 0;
    function onTouchStart(e) { touchStartX = e.changedTouches[0].clientX; }
    function onTouchEnd(e) {
        const delta = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 44) goTo(delta > 0 ? current + 1 : current - 1);
    }

    /* ── Activate (mobile) ───────────────────────────────────────────── */
    function activate() {
        if (isActive) return;
        isActive = true;
        buildDots();
        goTo(current);                    // reset to current (or 0 on first run)
        btnPrev.addEventListener('click', onPrev);
        btnNext.addEventListener('click', onNext);
        track.addEventListener('touchstart', onTouchStart, { passive: true });
        track.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    /* ── Deactivate (desktop) ────────────────────────────────────────── */
    function deactivate() {
        if (!isActive) return;
        isActive = false;
        /* Reset track so desktop layout is completely unaffected */
        track.style.transform = '';
        counter.textContent = '';
        dotsWrap.innerHTML = '';
        dots = [];
        btnPrev.disabled = false;
        btnNext.disabled = false;
        current = 0;
        btnPrev.removeEventListener('click', onPrev);
        btnNext.removeEventListener('click', onNext);
        track.removeEventListener('touchstart', onTouchStart);
        track.removeEventListener('touchend', onTouchEnd);
    }

    /* ── Check breakpoint ────────────────────────────────────────────── */
    function check() {
        window.innerWidth <= BREAKPOINT ? activate() : deactivate();
    }

    /* ── Debounced resize listener ───────────────────────────────────── */
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(check, 120);
    });

    /* Initial run */
    check();
})();