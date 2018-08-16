import React, { Component } from 'react';
import Square from './square'
import './board.css'

class Board extends Component {
  render() {
    return (
      <main>
        <Square /><Square /><Square />
        <Square /><Square /><Square />
        <Square /><Square /><Square />
      </main>
    );
  }
}

export default Board;
