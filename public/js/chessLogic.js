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

      // if (square) {
      //   squareElement.textContent = square.type.toUpperCase();
      // }

      boardElement.appendChild(squareElement);
    });
  });
}

// export function renderBoard() {
//   console.log("Board rendered");
// }
