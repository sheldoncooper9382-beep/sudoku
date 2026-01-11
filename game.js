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

      if (board[r][c] !== 0) {
        cell.textContent = board[r][c];
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

/* ===== Place Number ===== */
function placeNumber(num) {
  if (!selectedCell || selectedCell.classList.contains("cube_start")) return;

  history.push({
    cell: selectedCell,
    value: selectedCell.textContent
  });

  if (pencilMode) {
    selectedCell.classList.add("pencil");
    let set = new Set(selectedCell.textContent.split(""));
    set.has(String(num)) ? set.delete(String(num)) : set.add(String(num));
    selectedCell.textContent = [...set].sort().join("");
  } else {
    selectedCell.classList.remove("pencil");
    selectedCell.textContent = num;
  }
}

/* ===== Undo ===== */
function undoMove() {
  const last = history.pop();
  if (last) last.cell.textContent = last.value;
}

/* ===== Pencil Toggle ===== */
function togglePencil() {
  pencilMode = !pencilMode;
  alert(pencilMode ? "✏️ Pencil ON" : "✏️ Pencil OFF");
}

/* ===== Check ===== */
function check() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = grid.children[r * 9 + c];
      if (parseInt(cell.textContent) !== solution[r][c]) {
        alert("❌ Mistakes found");
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
