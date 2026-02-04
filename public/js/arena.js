import { renderBoard } from "./chessLogic.js";
import { Chess } from "chess.js";
const boardElement = document.getElementById("chessboard");

if (!boardElement) {
  console.error("❌ chessboard div not found");
}

const chess = new Chess();

renderBoard(chess, boardElement);
