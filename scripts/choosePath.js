 const cards = document.querySelectorAll('.card[data-target]');
  const grid = document.getElementById('cards-grid');
  let activeTarget = null;

  function getColumns() {
    const style = window.getComputedStyle(grid);
    return style.gridTemplateColumns.split(' ').filter(s => s.trim()).length;
  }

  function repositionPanel(card, panel) {
    const cols = getColumns();
    const allCards = Array.from(document.querySelectorAll('.card[data-target]'));
    const idx = parseInt(card.dataset.index);
    // Find last card in same row
    const rowEnd = Math.min(Math.ceil((idx + 1) / cols) * cols - 1, allCards.length - 1);
    const anchorCard = allCards[rowEnd];
    // Insert panel right after that card
    anchorCard.after(panel);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.target;
      const panel = document.getElementById(targetId);

      if (activeTarget === targetId) {
        panel.classList.remove('visible');
        card.classList.remove('active');
        activeTarget = null;
        return;
      }

      // Hide all, deactivate all
      document.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('visible'));
      cards.forEach(c => c.classList.remove('active'));

      // Reposition then show
      repositionPanel(card, panel);
      panel.classList.add('visible');
      card.classList.add('active');
      activeTarget = targetId;
    });
  });

  // Reposition on resize too
  window.addEventListener('resize', () => {
    if (activeTarget) {
      const activeCard = document.querySelector(`.card[data-target="${activeTarget}"]`);
      const panel = document.getElementById(activeTarget);
      repositionPanel(activeCard, panel);
    }
  });