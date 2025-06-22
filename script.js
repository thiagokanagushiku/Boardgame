
const board = document.getElementById("board");
const colors = ["red", "blue", "green", "yellow"];
let cells = [];

for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 6; col++) {
    let i = row * 6 + col + 1;
    if (row % 2 === 1) {
      i = row * 6 + (6 - col);
    }
    if (i === 37) break;
    const cell = document.createElement("div");
    cell.className = "cell";
    if (i === 1) {
      cell.textContent = "START";
      cell.classList.add("start");
      cell.dataset.num = 0;
    } else {
      cell.textContent = i - 1;
      cell.classList.add(colors[(i - 2) % 4]);
      cell.dataset.num = i - 1;
    }
    cell.id = `cell-${i - 1}`;
    if (i > 1) {
      cell.onclick = () => {
        window.open(`pergunta_${i - 1}.html`, "_blank");
      };
    }
    board.appendChild(cell);
    cells.push(cell);
  }
}

const animals = ["capivara", "arara", "tucano", "quati", "tamandua", "boto"];
const groups = {};

for (let i = 1; i <= 6; i++) {
  groups[i] = { position: 0 };
  const marker = document.createElement("img");
  marker.src = `imagens/${animals[i - 1]}.png`;
  marker.className = "marker";
  document.getElementById("cell-0").appendChild(marker);
  groups[i].marker = marker;
}

const controls = document.getElementById("group-buttons");

for (let i = 1; i <= 6; i++) {
  const div = document.createElement("div");
  div.className = "control";

  const img = document.createElement("img");
  img.src = `imagens/${animals[i - 1]}.png`;

  const fwd = document.createElement("button");
  fwd.innerHTML = "➕";
  fwd.onclick = () => moveGroup(i, 1);

  const back = document.createElement("button");
  back.innerHTML = "➖";
  back.onclick = () => moveGroup(i, -1);

  div.appendChild(img);
  div.appendChild(fwd);
  div.appendChild(back);
  controls.appendChild(div);
}

function moveGroup(groupNum, step) {
  let pos = groups[groupNum].position + step;
  if (pos < 0) pos = 0;
  if (pos > 36) pos = 36;
  groups[groupNum].position = pos;
  document.getElementById(`cell-${pos}`).appendChild(groups[groupNum].marker);
}
