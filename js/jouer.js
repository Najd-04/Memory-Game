// Sélectionne toutes les cartes de mémoire
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; 
let lockBoard = false; 
let firstCard, secondCard; 

// Variables pour le compteur de coups et le score
let moves = 0;
let score = 0;

// Affichage initial du compteur de coups et du score
const movesCounter = document.getElementById('moves-counter');
const scoreCounter = document.getElementById('score-counter');
const message = document.getElementById('message');

updateCounters();

// Fonction pour mettre à jour l'affichage du compteur de coups et du score
function updateCounters() {
  movesCounter.textContent = `Coups: ${moves}`;
  scoreCounter.textContent = `Score: ${score}`;
}

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
  moves++;
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
  if (isMatch) {
    score++;
    disableCards();
    if (score === cards.length / 2) {
      endGame();
    }
  } else {
    unflipCards();
  }
  updateCounters();
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

// Fonction pour mélanger les cartes
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length); 
    card.style.order = randomPos; 
  });
}

// Ajoute l'événement clic à chaque carte
cards.forEach(card => card.addEventListener('click', flipCard));

// Fonction de fin de partie
function endGame() {
  message.style.display = 'block';
  document.addEventListener('keydown', handleRestart);
}

// Fonction pour redémarrer le jeu
function handleRestart(event) {
  if (event.code === 'Space') {
    message.style.display = 'none';
    document.removeEventListener('keydown', handleRestart);
    resetGame();
  }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  moves = 0;
  score = 0;
  updateCounters();
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
}

// Appel initial à la fonction shuffle pour mélanger les cartes au démarrage du jeu
shuffle();
