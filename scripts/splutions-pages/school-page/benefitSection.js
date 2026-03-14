  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cardWidth = 220 + 16; // card width + gap

  function updateButtons() {
    prevBtn.disabled = track.scrollLeft <= 8;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateButtons);
  updateButtons();

  // Drag to scroll
  let isDragging = false, startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.scrollSnapType = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.scrollSnapType = 'x mandatory';
    updateButtons();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX);
  });