//VARIABILI GLOBALI - DOM
const startBtn = document.getElementById('btn-start');
const cellsContainer = document.getElementById('cells-container');
const difficultySelect = document.getElementById('difficulty');

// VARIABILI GLOBALI
let cellsTotal, bombs, score, cellsFreeTotal, isGameOver;

// Al click ...
startBtn.addEventListener('click', () => {
  // Controllo che la difficoltà selezionata sia valida
  if (!difficultySelect.value) {
    alert('Seleziona una difficoltà');
    return;
  }

  // Recupero il numero totale delle celle della griglia
  cellsTotal = parseInt(difficultySelect.value);

  // Resetto la variabile isGameOver
  isGameOver = false;

  // Valorizzo le bombe
  bombs = generateBombs(1, cellsTotal, 16);
  // console.log(bombs);

  // Valorizzo il punteggio
  score = 0;

  // Valorizzo totale celle libere
  cellsFreeTotal = cellsTotal - bombs.length;

  // Generazione della griglia
  generateGriglia();
});

// FUNZIONI

// Genera griglia
function generateGriglia() {
  // Reset per la nuova partita
  cellsContainer.innerHTML = '';

  // Per tante volte quanto è il numero totale delle celle della griglia
  for (let i = 1; i <= cellsTotal; i++) {
    // genero una cella
    const generatedCell = generateCella(i);
    cellsContainer.append(generatedCell);
  }
}

// GENERA CELLA
function generateCella(cellText) {
  // Creo una cella - le associo un testo - una classe - una classe modificatore per la dimensione
  const cell = document.createElement('li');
  cell.innerHTML = cellText;
  cell.classList.add('cell');
  cell.classList.add('cell-' + cellsTotal);

  // AL CLICK
  cell.addEventListener('click', function () {
    // controllo che non sia game over - che la cella non sia stata cliccata (in caso interrompo)
    if (isGameOver || this.classList.contains('cell-clicked')) return;

    // Recupero il numero della cella e lo trasformo in intero
    const cellNumber = parseInt(this.innerText);

    console.log('clicked ' + cellNumber);

    // Determino se una cella è una bomba
    if (bombs.includes(cellNumber)) {
      // Gestisco click cella bomba (cambio sfondo + fine partita)
      this.classList.add('cell-bomb');

      // Lancio "fine partita" per click bomba
      endgame('Fine partita. Hai totalizzato ' + score + ' punti');
    } else {
      // Gestisco click cella libera (cambio sfondo + incremento punteggio)
      this.classList.add('cell-clicked');
      score++;

      // Lancio "fine partita" per fine celle libere
      if (score >= cellsFreeTotal) {
        endgame(
          'Fine partita. Hai totalizzato ' +
            score +
            " punti. Congratulazioni! E' un punteggio perfetto"
        );
      }
    }
  });

  // Ritorno la cella
  return cell;
}

// RANDOM NUMBER
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * max - min + 1) + min;

// GENERA ARRAY NUMERICO RANDOMICO CON VALORI UNICI
const generateBombs = (min, max, qty) => {
  const uniqueArray = [];

  while (uniqueArray.length < qty) {
    const uniqueNumber = generateRandomNumber(min, max);
    if (!uniqueArray.includes(uniqueNumber)) uniqueArray.push(uniqueNumber);
  }

  return uniqueArray;
};

// END GAME
const endgame = (msg) => {
  // stampo il punteggio
  alert(msg);

  // evito che si possa cliccare su altre celle
  isGameOver = true;

  //scopro le bombe nascoste.
  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    const cellNumber = parseInt(cell.innerText);
    if (bombs.includes(cellNumber)) cell.classList.add('cell-bomb');
  }
};