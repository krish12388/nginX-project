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

export function getpiece(){

}

export function movePiece(chess, move) {
  const moveResult = chess.move(move);
  if (moveResult) {
    renderBoard(chess, document.getElementById("chessboard"));
  }
}
