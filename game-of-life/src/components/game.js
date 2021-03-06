import React from 'react'
import './game.css'

const CELL_SIZE = 10
const WIDTH = 600
const HEIGHT = 400

class Cell extends React.Component{
    render() {
        const { x, y } = this.props;
        return(
            <div className ='Cell' style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }}/>
        );
    }
}

class Game extends React.Component{
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }
    state = {
        cells: [],
        interval: 1000,
        isRunning: false,
        generation: 0,
    }
    makeEmptyBoard() {
        let board = [];
        for(let y = 0; y < this.rows; y++) {
            board[y] = [];
            for(let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++){
                if(this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }
    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }
    handleClick = (e) => {
        const elemOffset = this.getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }
    handleRandomColor = () => {
        this.setState({ pickColor: true})
    }

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells(), generation: 0, pickColor: false });
    }
    handleRandom = () => {
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                this.board[y][x] = (Math.random() >= 0.80);
            }
        }
        this.setState({ cells: this.makeCells() });
    }
    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }
    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    handleIntervalChanges = (e) => {
        this.setState({ interval: e.target.value });
    }
    runIteration() {
        console.log('Iteration running...');
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.assessNeighbor(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() })

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
               
        }, this.state.interval);
        this.state.generation++;
    }
    assessNeighbor(board, x, y) {
        let neighbors = 0;
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    render() {
        const { cells, interval, isRunning, generation, pickColor=false } = this.state;
        const randomColor1 = this.backgroundColor = Math.floor(Math.random() * Math.floor(255));
        const randomColor2 = this.backgroundColor = Math.floor(Math.random() * Math.floor(255));
        const randomColor3 = this.backgroundColor = Math.floor(Math.random() * Math.floor(255));        
        return (
            <div>
                <div className='Board'
                style={{
                            width: WIDTH,
                            height: HEIGHT,
                            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                            backgroundColor: pickColor ? `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})` : '#fab1e5' 
                        }}
                            onClick={!isRunning ? this.handleClick : null}
                            ref={(n) => {
                                this.boardRef = n;}}>
                                {cells.map(cell => (
                                    <Cell x={cell.x} y={cell.y}
                                    key={`${cell.x},${cell.y}`}
                                    />
                                ))}
                    </div>
                    <div className='ctrl-container'>
                    <div className = 'ctrl'>Update every <input value={interval} onChange={this.handleIntervalChanges}/> msec 
                    <div className='btn-container'>
                    {isRunning ?
                    <button className='btn' onClick={this.stopGame}><i class="fas fa-pause"/></button> :
                    <button className='btn' onClick={this.runGame}><i class="fas fa-play"/></button> }
                    <button className='btn' onClick={this.handleClear}><i class="fas fa-stop"/></button>
                    <button className='btn' onClick={this.handleRandom}><i class="fas fa-random"/></button>
                    <button className='btn' onClick={this.handleRandomColor}><i class="far fa-star"/></button>
                    </div>
                    </div>
                    <div className='gen-container'>Current Generation: {generation}</div>
                    </div>
            </div>
        )
    }
}
export default Game;