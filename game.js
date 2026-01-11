// ================================
// Sudoku Game Logic (Stable)
// ================================

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

// clone solution
let board = solution.map(row => [...row]);

// difficulty
const params = new URLSearchParams(window.location.search);
const level = params.get("Level") || "board1";


let blanks = level === "board1" ? 35 :
             level === "board2" ? 45 : 55;

// remove numbers
while (blanks > 0) {
  let r = Math.floor(Math.random() * 9);
  let c = Math.floor(Math.random() * 9);
  if (board[r][c] !== 0) {
    board[r][c] = 0;
    blanks--;
  }
}

const grid = document.getElementById("digits");

// ================================
// Draw Board
// ================================
function drawBoard() {
  grid.innerHTML = "";

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {

      const cell = document.createElement("input");
      cell.type = "text";
      cell.maxLength = 1;
      cell.classList.add("cube");
      cell.id = `${r}-${c}`;

      if (board[r][c] !== 0) {
        cell.value = board[r][c];
        cell.disabled = true;
        cell.classList.add("cube_start");
      } else {
        cell.value = "";
        cell.oninput = () => {
          cell.value = cell.value.replace(/[^1-9]/g, "");
        };
      }

      grid.appendChild(cell);
    }
  }
}

// ================================
// Check Solution
// ================================
function check() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = document.getElementById(`${r}-${c}`).value;
      if (parseInt(v) !== solution[r][c]) {
        alert("❌ There are mistakes.");
        return;
      }
    }
  }
  alert("🎉 Puzzle Solved!");
}

// ================================
// Restart Game
// ================================
function restart() {
  location.reload();
}

// ================================
// Init
// ================================
drawBoard();
