import Board from "./components/Board";
import History from "./components/Histroy";
import { useState } from "react";
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  //   const [status, setStatus] = useState(getNextPlayer());
  // react 中 当执行了 setStatus 时 会重新执行 Board 这个渲染函数 所以 这里的 status 会发生变化
  const winner = calcWinner(squares);

  // 固定循环次数
  function calcWinner(square) {
    // 胜利的条件
    const winConditions = [
      // 横向胜利的格子索引
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // 竖向胜利的格子索引
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // 对角线胜利的格子索引
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < winConditions.length; index++) {
      const cod = winConditions[index];

      const [aIdx, bIdx, cIdx] = cod;

      if (
        square[aIdx] &&
        square[aIdx] === square[bIdx] &&
        square[aIdx] === square[cIdx]
      ) {
        return square[aIdx];
      }
    }

    // if (square.filter((item) => item === "X" || item === "O").length === 9) {
    //     return 'Nobody'
    // }
    // 全都填满了
    if (square.filter((item) => item === null).length === 0) {
      return "Nobody";
    }
    return null;
  }

  return (
    <div className="App">
      <div className="game-board">
        <Board winner={winner} squares={squares} setSquares={setSquares} />
      </div>
      <div className="game-history">{winner !== null ? <History /> : null}</div>
    </div>
  );
}

export default App;
