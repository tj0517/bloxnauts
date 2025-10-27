const container = document.getElementById('gallery');
let cards = [];
let startIndex = 0;

fetch('game.json')
  .then(res => res.json())
  .then(data => {
    cards = data;
    renderCarousel();
    initCarousel();
  })
  .catch(err => console.error('Błąd ładowania JSON:', err));

function getVisibleCount() {
  const w = window.innerWidth;
  if (w >= 900) return 3;
  if (w >= 600) return 2;
  return 1;
}

function renderCarousel() {
  const visible = getVisibleCount();
  container.innerHTML = '';
  for (let i = 0; i < visible; i++) {
    const idx = (startIndex + i) % cards.length;
    const item = cards[idx];
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
    `;
    container.appendChild(el);
  }
}

function initCarousel() {
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');

  leftBtn.addEventListener('click', () => {
        startIndex = (startIndex + 1) % cards.length;
    renderCarousel();
  });

  rightBtn.addEventListener('click', () => {
    startIndex = (startIndex - 1 + cards.length) % cards.length;
    renderCarousel();

  });

  window.addEventListener('resize', renderCarousel);
}
