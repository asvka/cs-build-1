import React from "react";

export default function About() {
  return (
    <div className='about'>
        <p>
      The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
      </p>
      <h2>Rules</h2>
      <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
        <p>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
        <p>2. Any live cell with two or three live neighbours lives on to the next generation.</p>
        <p>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
        <p>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
      </div>
  );
}