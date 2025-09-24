const suits = ["S", "H", "D", "C"]; // Spades, Hearts, Diamonds, Clubs
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

let columns = [[],[],[],[],[],[],[],[]];
let freeCells = [null,null,null,null];
let foundations = [[],[],[],[]];
let dragging = null;

function createDeck() {
  let deck = [];
  for (let s of suits) {
    for (let v of values) {
      deck.push({suit: s, value: v});
    }
  }
  return shuffle(deck);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function deal(deck) {
  columns = [[],[],[],[],[],[],[],[]];
  let col = 0;
  while(deck.length) {
    columns[col].push(deck.pop());
    col = (col+1)%8;
  }
}

function render() {
  const colZone = document.getElementById("columns");
  colZone.innerHTML = "";
  columns.forEach((col, i) => {
    const div = document.createElement("div");
    div.className = "column";
    div.dataset.col = i;
    col.forEach((card, j) => {
      const el = document.createElement("div");
      el.className = "card";
      el.draggable = true;
      el.dataset.col = i;
      el.dataset.index = j;

      const img = document.createElement("img");
      img.src = `Cards/${card.value}${card.suit}.jpg`;
      img.alt = card.value + card.suit;
      el.appendChild(img);

      el.addEventListener("dragstart", onDragStart);
      div.appendChild(el);
    });
    div.addEventListener("dragover", e
