import './styles.css'

import Square from '../Square'
import { useState } from 'react'
function Board(){

    const [squares,setSquares] = useState(Array(9).fill(null)) 


    const onClickSquare = (index)=>{
        // 已有棋子的格子不能 再下棋
        const cur_square = squares[index]
        if(cur_square) return

        // 下棋过程中为 X | O 的 格子总数 （已走的步数）
        const filterSquaresNumber = squares.filter(item => (item === 'X' || item === 'O')).length 
        const newSquares = squares.slice()
        //  X 为偶数个，下一个应为 奇数 奇数为 X
        const nextLetter = filterSquaresNumber % 2 === 0 ? 'X' : 'O'
        newSquares[index] = nextLetter
        setSquares(newSquares)
        // squares[index] = "X"   
        // setSquares(squares) // 不会起作用，因为数组的引用并没变化，所以不会触发页面重新渲染
        console.log('clicked',index)
    }

    return (
        <>
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
    )
}

export default Board