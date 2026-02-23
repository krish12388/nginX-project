let playerTurn=null;
let draggedpiece=null;
let sourceSquare=null;
let targetSquare=null;
let move="";


export function renderBoard(chess, boardElement) {
  const board = chess.board();
  console.log("board", board);
  boardElement.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add("square");
      squareElement.classList.add(
        (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
      );
      if(square){
        const piece = document.createElement("div");
        piece.classList.add("piece",square.color==="w"?"white":"black")
        piece.innerHTML="";
        piece.draggable= playerTurn===square.color;
        piece.addEventListener("dragstart",()=>{
          if(piece.draggable){
            sourceSquare=square;
            draggedpiece=piece;
          }
        })
        squareElement.appendChild(piece);
      }
      boardElement.appendChild(squareElement);
    });
  });
}
export function setupBoardListeners(chess, boardElement) {
  boardElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  boardElement.addEventListener("drop", (e) => {
    e.preventDefault();
    const rect = boardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const colIndex = Math.floor(x / (rect.width / 8));
    const rowIndex = Math.floor(y / (rect.height / 8));
    
    if (sourceSquare && draggedpiece) {
      const from = String.fromCharCode(97 + sourceSquare.file) + (8 - sourceSquare.rank);
      const to = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
      const moveObj = { from, to, promotion: "q" };
      movePiece(chess, moveObj);
      sourceSquare = null;
      draggedpiece = null;
    }
  });
}
export function getpiece(){

}

export function movePiece(chess, move) {
  const moveResult = chess.move(move);
  if (moveResult) {
    renderBoard(chess, document.getElementById("chessboard"));
  }
}
