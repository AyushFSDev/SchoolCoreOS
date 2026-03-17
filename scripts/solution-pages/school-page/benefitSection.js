const asaTrack   = document.getElementById('asa-scroll-track');
    const asaPrevBtn = document.getElementById('asa-prev-btn');
    const asaNextBtn = document.getElementById('asa-next-btn');

    function asaCardWidth() {
      const card = asaTrack.querySelector('.asa-feature-card');
      if (!card) return 212;
      const gap = parseInt(getComputedStyle(asaTrack).gap) || 12;
      return card.offsetWidth + gap;
    }

    function asaUpdateButtons() {
      asaPrevBtn.disabled = asaTrack.scrollLeft <= 8;
      asaNextBtn.disabled = asaTrack.scrollLeft + asaTrack.clientWidth >= asaTrack.scrollWidth - 8;
    }

    asaPrevBtn.addEventListener('click', () => {
      asaTrack.scrollBy({ left: -asaCardWidth() * 2, behavior: 'smooth' });
    });

    asaNextBtn.addEventListener('click', () => {
      asaTrack.scrollBy({ left: asaCardWidth() * 2, behavior: 'smooth' });
    });

    asaTrack.addEventListener('scroll', asaUpdateButtons);
    window.addEventListener('resize', asaUpdateButtons);
    asaUpdateButtons();

    let asaIsDragging = false, asaStartX, asaScrollLeft;

    asaTrack.addEventListener('mousedown', e => {
      asaIsDragging = true;
      asaStartX = e.pageX - asaTrack.offsetLeft;
      asaScrollLeft = asaTrack.scrollLeft;
      asaTrack.style.scrollSnapType = 'none';
    });

    document.addEventListener('mouseup', () => {
      if (!asaIsDragging) return;
      asaIsDragging = false;
      asaTrack.style.scrollSnapType = 'x mandatory';
      asaUpdateButtons();
    });

    document.addEventListener('mousemove', e => {
      if (!asaIsDragging) return;
      e.preventDefault();
      const x = e.pageX - asaTrack.offsetLeft;
      asaTrack.scrollLeft = asaScrollLeft - (x - asaStartX);
    });

    asaTrack.addEventListener('touchend', () => {
      setTimeout(asaUpdateButtons, 100);
    }, { passive: true });