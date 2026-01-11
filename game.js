// =====================
// Sudoku data (static)
// =====================
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
let history = []; // store {index, prevHTML}

// DOM refs
const grid = document.getElementById("digits");
const numberBar = document.getElementById("number-bar");

// read level param (lowercase 'level')
const params = new URLSearchParams(location.search);
const level = params.get("level") || "board1";
let blanks = level === "board1" ? 35 : level === "board2" ? 45 : 55;

// remove numbers to create puzzle
(function makePuzzle() {
  let removed = 0;
  while (removed < blanks) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      removed++;
    }
  }
})();

// draw grid
function drawBoard() {
  grid.innerHTML = "";
  let idx = 0;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement("div");
      cell.className = "cube";
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.dataset.index = idx;

      // pencil grid (9 slots)
      const pencilGrid = document.createElement("div");
      pencilGrid.className = "pencil-grid";
      for (let n = 1; n <= 9; n++) {
        const slot = document.createElement("div");
        slot.className = "pencil-note";
        slot.dataset.num = n;
        pencilGrid.appendChild(slot);
      }
      cell.appendChild(pencilGrid);

      if (board[r][c] !== 0) {
        const final = document.createElement("div");
        final.className = "final-number";
        final.textContent = board[r][c];
        cell.appendChild(final);
        cell.classList.add("cube_start");
      }

      // click to select
      cell.addEventListener("click", () => {
        if (selectedCell) selectedCell.classList.remove("selected");
        selectedCell = cell;
        cell.classList.add("selected");
      });

      grid.appendChild(cell);
      idx++;
    }
  }
}

// number bar
function buildNumberBar() {
  numberBar.innerHTML = "";
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.className = "number-btn";
    btn.textContent = i;
    btn.addEventListener("click", () => placeNumber(i));
    numberBar.appendChild(btn);
  }
}

// place number or pencil
function placeNumber(num) {
  if (!selectedCell) return;

  const index = parseInt(selectedCell.dataset.index, 10);
  // don't allow editing starting cells
  if (selectedCell.classList.contains("cube_start")) return;

  // save for undo
  history.push({ index, prevHTML: selectedCell.innerHTML });

  const pencilGrid = selectedCell.querySelector(".pencil-grid");
  const final = selectedCell.querySelector(".final-number");

  if (pencilMode) {
    // in pencil mode, toggle the pencil slot
    if (final) return; // don't add pencil if final exists
    const slot = pencilGrid.querySelector(`[data-num='${num}']`);
    slot.textContent = slot.textContent ? "" : num;
  } else {
    // place final number: clear pencil slots and set final
    selectedCell.innerHTML = "";
    const newPencilGrid = document.createElement("div");
    newPencilGrid.className = "pencil-grid";
    for (let n = 1; n <= 9; n++) {
      const s = document.createElement("div");
      s.className = "pencil-note";
      s.dataset.num = n;
      newPencilGrid.appendChild(s);
    }
    const finalNum = document.createElement("div");
    finalNum.className = "final-number";
    finalNum.textContent = num;

    selectedCell.appendChild(newPencilGrid);
    selectedCell.appendChild(finalNum);
  }
}

// undo last change (global undo)
function undoMove() {
  if (history.length === 0) return;
  const last = history.pop();
  const cell = grid.querySelector(`[data-index='${last.index}']`);
  if (cell) {
    cell.innerHTML = last.prevHTML;
  }
}

// toggle pencil
function togglePencil() {
  pencilMode = !pencilMode;
  // small visual feedback
  alert(pencilMode ? "✏️ Pencil ON" : "✏️ Pencil OFF");
}

// check solution
function check() {
  let allOk = true;
  let idx = 0;
  for (let r = 0; r < 9 && allOk; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = grid.children[idx++];
      const final = cell.querySelector(".final-number");
      if (!final || parseInt(final.textContent, 10) !== solution[r][c]) {
        allOk = false;
        break;
      }
    }
  }
  if (allOk) alert("🎉 Puzzle solved!");
  else alert("❌ There are mistakes or missing numbers.");
}

// restart
function restart() { location.reload(); }

// initial setup
drawBoard();
buildNumberBar();

// keyboard support: digits 1-9 to place; 'p' toggle pencil; 'z' undo
window.addEventListener("keydown", (e) => {
  if (e.key >= '1' && e.key <= '9') placeNumber(parseInt(e.key, 10));
  if (e.key === 'p' || e.key === 'P') togglePencil();
  if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
    e.preventDefault();
    undoMove();
  }
});
