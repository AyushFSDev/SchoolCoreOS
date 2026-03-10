// roles section start
  function scrollTrack(direction) {
        const track = document.getElementById('roleTrack');
        // Calculate dynamic width (Card width + gap)
        const style = getComputedStyle(document.documentElement);
        const cardWidth = parseInt(style.getPropertyValue('--card-width'));
        const gap = parseInt(style.getPropertyValue('--card-gap'));
        
        const moveAmount = cardWidth + gap;
        
        track.scrollBy({
            left: direction * moveAmount,
            behavior: 'smooth'
        });
    }