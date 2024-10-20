import "./styles.css";

import Square from "../Square";
import { useState } from "react";
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  //   const [status, setStatus] = useState(getNextPlayer());
  // react 中 当执行了 setStatus 时 会重新执行 Board 这个渲染函数 所以 这里的 status 会发生变化
  let winner = calcWinner(squares);
  console.log("🚀 ~ Board ~ winner:", winner);

  const status =
    winner !== null ? `${winner} is win` : `Next Player: ${getNextPlayer()}`;

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
        return 'Nobody'
    }
    return null;
  }
  // 性能较差
  //   function calcWinner(square) {
  //     // 胜利的条件
  //     const winConditions = [
  //       // 横向胜利的格子索引
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //       // 竖向胜利的格子索引
  //       [0, 3, 6],
  //       [1, 4, 7],
  //       [2, 5, 8],
  //       // 对角线胜利的格子索引
  //       [0, 4, 8],
  //       [2, 4, 6],
  //     ];

  //     const xResult = square
  //       .map((item, index) => (item === "X" ? index : null))
  //       .filter((item) => item !== null);
  //     const oResult = square
  //       .map((item, index) => (item === "O" ? index : null))
  //       .filter((item) => item !== null);

  //     if (
  //       winConditions.some(
  //         (item) => JSON.stringify(item) === JSON.stringify(xResult)
  //       )
  //     ) {
  //       return "X";
  //     } else if (
  //       winConditions.some(
  //         (item) => JSON.stringify(item) === JSON.stringify(oResult)
  //       )
  //     ) {
  //       return "O";
  //     }
  //     return null;
  //   }

  function getNextPlayer() {
    // 下棋过程中为 X | O 的 格子总数 （已走的步数）
    const filterSquaresNumber = squares.filter(
      (item) => item === "X" || item === "O"
    ).length;

    //  X 为偶数个，下一个应为 奇数 奇数为 X
    return filterSquaresNumber % 2 === 0 ? "X" : "O";
  }

  const onClickSquare = (index) => {
    // 已有棋子的格子不能 再下棋 | 一方已经胜利
    const cur_square = squares[index];
    if (cur_square || winner !== null) return;
    const newSquares = squares.slice();
    newSquares[index] = getNextPlayer();
    setSquares(newSquares);
    // squares[index] = "X"
    // setSquares(squares) // 不会起作用，因为数组的引用并没变化，所以不会触发页面重新渲染
  };

  return (
    <>
      <div className="header">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} index={0} onClick={onClickSquare} />
        <Square value={squares[1]} index={1} onClick={onClickSquare} />
        <Square value={squares[2]} index={2} onClick={onClickSquare} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} index={3} onClick={onClickSquare} />
        <Square value={squares[4]} index={4} onClick={onClickSquare} />
        <Square value={squares[5]} index={5} onClick={onClickSquare} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} index={6} onClick={onClickSquare} />
        <Square value={squares[7]} index={7} onClick={onClickSquare} />
        <Square value={squares[8]} index={8} onClick={onClickSquare} />
      </div>
    </>
  );
}

export default Board;
