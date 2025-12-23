// background.js
const images = [
  'bg1.png',
  'bg2.png',
  'bg3.png',
  'bg4.png'
];
// attention il faut impérativement un nombre paire d'images.
let index = 0;

// Création dynamique de deux img pour le crossfade
const imgA = document.createElement('img');
const imgB = document.createElement('img');

[imgA, imgB].forEach(img => {
  img.classList.add('background-fade');
  document.body.prepend(img);
});

// Initialisation
imgA.src = images[0];
imgA.style.opacity = '1';

setInterval(() => {
  const nextIndex = (index + 1) % images.length;

  const currentImg = index % 2 === 0 ? imgA : imgB;
  const nextImg = index % 2 === 0 ? imgB : imgA;

  // Préparer la prochaine image
  nextImg.src = images[nextIndex];
  nextImg.style.opacity = '1'; // fondu entrant
  currentImg.style.opacity = '0'; // fondu sortant

  index = nextIndex;
}, 5000);

const filterDiv = document.createElement('div');
filterDiv.style.position = 'fixed';
filterDiv.style.top = '0';
filterDiv.style.left = '0';
filterDiv.style.width = '100%';
filterDiv.style.height = '100%';
filterDiv.style.backgroundColor = 'rgba(59, 46, 42, 0.9)';
filterDiv.style.zIndex = '1';
filterDiv.style.pointerEvents = 'none';

document.body.prepend(filterDiv);
