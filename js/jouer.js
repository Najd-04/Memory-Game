// Sélectionne toutes les cartes de mémoire
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; 
let lockBoard = false; 
let firstCard, secondCard; 
// retourner et marquer les cartes
function flipCard() {
  if (lockBoard) return; 
  if (this === firstCard) return; 

  this.classList.add('flip'); 
  if (!hasFlippedCard) {
    hasFlippedCard = true; 
    firstCard = this; 
    return;
  }
  secondCard = this;
  checkForMatch(); 
}
// verifier si les deux cartes match
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
  isMatch ? disableCards() : unflipCards(); 
}
// desactive le click sur
function disableCards() {
  firstCard.removeEventListener('click', flipCard); 
  secondCard.removeEventListener('click', flipCard); 
  resetBoard(); 
}
// verrouille le plateau en retournant les carte face cachée
function unflipCards() {
  lockBoard = true; 

  setTimeout(() => {
    firstCard.classList.remove('flip'); 
    secondCard.classList.remove('flip'); 
    resetBoard(); 
  }, 1500); 
}
// réinitialiser l'états et les cartes
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; 
  [firstCard, secondCard] = [null, null];
}
// mélange des carte (position aléatoire des cartes)
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); 
    card.style.order = randomPos; 
  });
})();
// Ajoute l'événement clic à chaque carte
cards.forEach(card => card.addEventListener('click', flipCard)); 


