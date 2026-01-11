const solution = [
  [1,6,8,4,7,9,5,2,3],
  [9,2,5,3,6,1,7,4,8],
  [4,3,7,8,5,2,9,6,1],
  [8,9,2,7,1,6,3,5,4],
  [6,1,4,5,9,3,8,7,2],
  [5,7,3,2,8,4,1,9,6],
  [3,5,1,9,2,8,6,4,7],
  [7,4,6,1,3,5,2,8,9],
  [2,8,9,6,4,7,0,1,5]
];

let board = solution.map(r => [...r]);
let pencilMode = false;
let selectedCell = null;
let history = [];

const grid = document.getElementById("digits");
const numberBar = document.getElementById("number-bar");

/* ===== Difficulty ===== */
const params = new URLSearchParams(location.search);
const level = params.get("level") || "board1";
let blanks = level === "board1" ? 35 : level === "board2" ? 45 : 55;

while (blanks > 0) {
  let r = Math.floor(Math.random() * 9);
  let c = Math.floor(Math.random() * 9);
  if (board[r][c] !== 0) {
    board[r][c] = 0;
    blanks--;
  }
}

/* ===== Draw Board ===== */
function drawBoard() {
  grid.innerHTML = "";

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement("div");
      cell.className = "cube";
      cell.dataset.row = r;
      cell.dataset.col = c;

      const pencilGrid = document.createElement("div");
      pencilGrid.className = "pencil-grid";

      for (let i = 1; i <= 9; i++) {
        const note = document.createElement("div");
        note.className = "pencil-note";
        note.dataset.num = i;
        pencilGrid.appendChild(note);
      }

      cell.appendChild(pencilGrid);

      if (board[r][c] !== 0) {
        const final = document.createElement("div");
        final.className = "final-number";
        final.textContent = board[r][c];
        cell.appendChild(final);
        cell.classList.add("cube_start");
      }

      cell.onclick = () => selectedCell = cell;
      grid.appendChild(cell);
    }
  }
}

/* ===== Number Bar ===== */
for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "number-btn";
  btn.onclick = () => placeNumber(i);
  numberBar.appendChild(btn);
}

/* ===== Place Number / Pencil ===== */
function placeNumber(num) {
  if (!selectedCell || selectedCell.classList.contains("cube_start")) return;

  history.push(selectedCell.innerHTML);

  const pencilGrid = selectedCell.querySelector(".pencil-grid");
  const final = selectedCell.querySelector(".final-number");

  if (pencilMode) {
    if (final) return;

    const slot = pencilGrid.querySelector(`[data-num='${num}']`);
    slot.textContent = slot.textContent ? "" : num;
  } else {
    selectedCell.innerHTML = "";

    const finalNum = document.createElement("div");
    finalNum.className = "final-number";
    finalNum.textContent = num;

    selectedCell.appendChild(finalNum);
  }
}

/* ===== Undo ===== */
function undoMove() {
  if (!selectedCell || history.length === 0) return;
  selectedCell.innerHTML = history.pop();
}

/* ===== Pencil Toggle ===== */
function togglePencil() {
  pencilMode = !pencilMode;
  alert(pencilMode ? "✏️ Pencil ON" : "✏️ Pencil OFF");
}

/* ===== Check ===== */
function check() {
  let i = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = grid.children[i++];
      const final = cell.querySelector(".final-number");
      if (!final || parseInt(final.textContent) !== solution[r][c]) {
        alert("❌ There are mistakes.");
        return;
      }
    }
  }
  alert("🎉 Puzzle Solved!");
}

function restart() {
  location.reload();
}

drawBoard();
