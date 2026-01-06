const boardElement = document.querySelector('.sudoku-board');
const numbers = document.querySelectorAll('.number');
const newGameBtn = document.getElementById('newGame');
const difficultySelect = document.getElementById('difficulty');
const hintBtn = document.getElementById('hint');
const undoBtn = document.getElementById('undo');
const timerEl = document.getElementById('timer');

let board = [];
let solution = [];
let moveHistory = [];
let timer = 0;
let timerInterval;

// Sudoku generation (simple random prefilled cells based on difficulty)
function generateBoard(level = 'easy') {
  board = Array.from({length: 81}, () => 0);
  solution = Array.from({length: 81}, () => 0);

  // Simple random generation for demo (can be replaced with proper solver)
  let cellsToFill = level === 'easy' ? 40 : level === 'medium' ? 30 : 20;

  while (cellsToFill > 0) {
    const index = Math.floor(Math.random() * 81);
    const num = Math.floor(Math.random() * 9) + 1;
    if (board[index] === 0) {
      board[index] = num;
      solution[index] = num;
      cellsToFill--;
    }
  }

  renderBoard();
}

// Render board cells
function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((num, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.dataset.number = num;
    if (num !== 0) cell.classList.add('prefilled');
    cell.textContent = num !== 0 ? num : '';
    boardElement.appendChild(cell);

    // Cell click
    cell.addEventListener('click', () => {
      if (!cell.classList.contains('prefilled')) {
        selectNumber(cell);
      } else {
        highlightNumber(cell.dataset.number);
      }
    });
  });
}

// Highlight all matching numbers
function highlightNumber(num) {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.toggle('highlight', cell.dataset.number == num && num != 0);
  });
}

// Number selection click
numbers.forEach(n => {
  n.addEventListener('click', () => {
    const num = n.dataset.number;
    highlightNumber(num);
  });
});

// Fill a cell with selected number
let selectedNumber = null;
function selectNumber(cell) {
  if (!selectedNumber) return;
  const prev = cell.dataset.number;
  moveHistory.push({index: cell.dataset.index, prev, next: selectedNumber});
  cell.dataset.number = selectedNumber;
  cell.textContent = selectedNumber;
  highlightNumber(selectedNumber);
}

// Number selection tracking
numbers.forEach(n => {
  n.addEventListener('click', () => {
    selectedNumber = n.dataset.number;
  });
});

// Undo move
undoBtn.addEventListener('click', () => {
  const lastMove = moveHistory.pop();
  if (lastMove) {
    const cell = boardElement.querySelector(`[data-index='${lastMove.index}']`);
    cell.dataset.number = lastMove.prev;
    cell.textContent = lastMove.prev === "0" ? "" : lastMove.prev;
  }
});

// Hint button
hintBtn.addEventListener('click', () => {
  const emptyCells = Array.from(boardElement.children).filter(c => c.dataset.number === "0");
  if (emptyCells.length === 0) return;
  const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const index = parseInt(cell.dataset.index);
  const hintNumber = Math.floor(Math.random() * 9) + 1; // Random hint for demo
  cell.dataset.number = hintNumber;
  cell.textContent = hintNumber;
  cell.classList.add('highlight');
});

// New game
newGameBtn.addEventListener('click', () => {
  generateBoard(difficultySelect.value);
  moveHistory = [];
  resetTimer();
});

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    const mins = String(Math.floor(timer / 60)).padStart(2, '0');
    const secs = String(timer % 60).padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timer = 0;
  timerEl.textContent = '00:00';
  startTimer();
}

// Initial load
generateBoard('easy');
startTimer();
