// Sélectionne toutes les cartes de mémoire
const cards = document.querySelectorAll('.memory-card');
const scoreElement = document.getElementById('score'); // Sélectionne l'élément de score
const messageElement = document.getElementById('message'); // Sélectionne l'élément de message de fin de partie
let score = 0; // Initialise le score
let pairsFound = 0; // Compte les paires trouvées

let hasFlippedCard = false; // Indique si une carte a été retournée
let lockBoard = false; // Empêche de retourner d'autres cartes temporairement
let firstCard, secondCard; // Stocke les deux cartes retournées

function flipCard() {
  if (lockBoard) return; // Ne rien faire si le plateau est verrouillé
  if (this === firstCard) return; // Ne rien faire si la même carte est cliquée deux fois

  this.classList.add('flip'); // Retourne la carte

  if (!hasFlippedCard) {
    hasFlippedCard = true; // Marque que la première carte a été retournée
    firstCard = this; // Stocke la première carte
    return;
  }

  secondCard = this; // Stocke la deuxième carte
  checkForMatch(); // Vérifie si les cartes correspondent
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // Compare les deux cartes
  isMatch ? disableCards() : unflipCards(); // Si elles correspondent, désactive les cartes, sinon les retourne
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard); // Désactive l'événement clic sur la première carte
  secondCard.removeEventListener('click', flipCard); // Désactive l'événement clic sur la deuxième carte
  updateScore(); // Met à jour le score
  pairsFound++; // Incrémente le compteur de paires trouvées
  if (pairsFound === cards.length / 2) {
    endGame(); // Si toutes les paires sont trouvées, termine le jeu
  }
  resetBoard(); // Réinitialise les variables
}

function unflipCards() {
  lockBoard = true; // Verrouille le plateau

  setTimeout(() => {
    firstCard.classList.remove('flip'); // Retourne la première carte face cachée
    secondCard.classList.remove('flip'); // Retourne la deuxième carte face cachée
    resetBoard(); // Réinitialise les variables
  }, 1500); // Attends 1,5 seconde
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; // Réinitialise les états
  [firstCard, secondCard] = [null, null]; // Réinitialise les cartes
}

function updateScore() {
  score += 1; // Incrémente le score
  scoreElement.textContent = `Score: ${score}`; // Met à jour l'affichage du score
}

function endGame() {
  messageElement.style.display = 'block'; // Affiche le message de fin de partie
}

function resetGame() {
  score = 0; // Réinitialise le score
  pairsFound = 0; // Réinitialise le compteur de paires trouvées
  scoreElement.textContent = `Score: ${score}`; // Réinitialise l'affichage du score
  messageElement.style.display = 'none'; // Cache le message de fin de partie
  cards.forEach(card => {
    card.classList.remove('flip'); // Retourne toutes les cartes face cachée
    card.addEventListener('click', flipCard); // Réactive l'événement clic sur toutes les cartes
  });
  shuffle(); // Mélange les cartes
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // Génère une position aléatoire
    card.style.order = randomPos; // Applique l'ordre aléatoire aux cartes
  });
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    resetGame(); // Redémarre le jeu lorsque la touche espace est pressée
  }
});

cards.forEach(card => card.addEventListener('click', flipCard)); // Ajoute l'événement clic à chaque carte
shuffle(); // Mélange les cartes au démarrage du jeu
