const solution = [
  [3,8,7,4,9,1,6,2,5],
  [2,4,1,5,6,8,3,7,9],
  [5,6,9,3,2,7,4,1,8],
  [7,5,8,6,1,9,2,3,4],
  [1,2,3,7,8,4,5,9,6],
  [4,9,6,2,5,3,1,8,7],
  [9,3,4,1,7,6,8,5,2],
  [6,7,5,8,3,2,9,4,1],
  [8,1,2,9,4,5,7,6,3]
];

const params = new URLSearchParams(location.search);
const level = params.get("level") || "board1";

let blanks = level === "board1" ? 20 : level === "board2" ? 40 : 60;
let board = solution.map(r => [...r]);

while (blanks > 0) {
  let r = Math.floor(Math.random()*9);
  let c = Math.floor(Math.random()*9);
  if (board[r][c] !== 0) {
    board[r][c] = 0;
    blanks--;
  }
}

const grid = document.getElementById("digits");

function draw() {
  grid.innerHTML = "";
  for (let r=0;r<9;r++) {
    for (let c=0;c<9;c++) {
      const cell = document.createElement("input");
      cell.className = "cube";
      cell.maxLength = 1;

      if (board[r][c] !== 0) {
        cell.value = board[r][c];
        cell.disabled = true;
        cell.classList.add("cube_start");
      } else {
        cell.oninput = () => {
          cell.value = cell.value.replace(/[^1-9]/g,"");
        };
      }

      cell.id = `${r}-${c}`;
      grid.appendChild(cell);
    }
  }
}

function check() {
  for (let r=0;r<9;r++) {
    for (let c=0;c<9;c++) {
      const v = document.getElementById(`${r}-${c}`).value;
      if (parseInt(v) !== solution[r][c]) {
        alert("❌ Mistakes found");
        return;
      }
    }
  }
  alert("🎉 You solved it!");
}

function restart() {
  location.reload();
}

draw();
