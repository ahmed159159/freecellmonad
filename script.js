const suits = ["C", "D", "H", "S"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

let deck = [];
let columns = [[],[],[],[],[],[],[],[]];
let freecells = [null,null,null,null];
let foundations = [[],[],[],[]];
let dragging = null;

function createDeck() {
  deck = [];
  for (let s of suits) {
    for (let v of values) {
      deck.push({value: v, suit: s});
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function deal() {
  columns = [[],[],[],[],[],[],[],[]];
  let col = 0;
  for (let card of deck) {
    columns[col].push(card);
    col = (col + 1) % 8;
  }
}

function render() {
  const colsDiv = document.getElementById("columns");
  colsDiv.innerHTML = "";
  columns.forEach((col, ci) => {
    const div = document.createElement("div");
    div.className = "column";
    col.forEach((card, i) => {
      const img = document.createElement("img");
      img.src = `Cards/${card.value}${card.suit}.jpg`;
      img.className = "card";
      img.dataset.col = ci;
      img.dataset.index = i;
      img.draggable = true;
      img.addEventListener("dragstart", onDragStart);
      img.addEventListener("dragend", onDragEnd);
      div.appendChild(img);
    });
    div.addEventListener("dragover", e => e.preventDefault());
    div.addEventListener("drop", e => onDrop(e, ci));
    colsDiv.appendChild(div);
  });
}

function onDragStart(e) {
  const col = parseInt(e.target.dataset.col);
  const index = parseInt(e.target.dataset.index);
  const stack = columns[col].slice(index);

  // السماح بسحب الاستاك كامل (من غير معادلة معقدة الأول)
  dragging = {stack, fromCol: col, index};
}

function onDragEnd() {
  dragging = null;
}

function onDrop(e, col) {
  if (!dragging) return;
  columns[col] = columns[col].concat(dragging.stack);
  columns[dragging.fromCol] = columns[dragging.fromCol].slice(0, dragging.index);
  render();
}

function restartGame() {
  createDeck();
  shuffle(deck);
  deal();
  render();
}

restartGame();
