import React, { Component } from 'react';
import Square from './square'
import SelectPlayers from './selectPlayers'
import './board.css'
import bb8 from './bb8.png';
import atat from './atat.png';



function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    //create if statement that first determines if the first square in winning calculateWinner array, then compare that all the corresponding squares in that array sequence are the same value.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares [c]){
          //this is returning the winning value as the winner
        return squares[a];

      }

  }
    return null;


}


class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      player1: true,
      //player2: false
    };
  }

  playerSelect(value) {
    console.log(value);
    if (value === 'X') {
      this.setState ({
        player1: true
      });
    } else if (value === 'O') {
      console.log(value);
      this.setState ({
        player1: false
      });
    }
  }

  onClick = (i) => {
    let { player1, squares } = this.state;
      if (calculateWinner(squares) || squares[i]){
      return;
    }
      squares[i] = this.state.player1 ? bb8 : atat;
      this.setState({
      squares: squares,
      player1: !this.state.player1
    });

  }

  renderSquare(i){
    let {val, player1, player2, squares} = this.state;
    //console.log(squares);
    return (
      <Square value={this.state.squares[i]} onClick={() => this.onClick(i)} />
    )
  }

  render() {
    let {val, player1, player2, squares } = this.state;
    let status;
    const winner = calculateWinner(squares);
      if (winner){
        status = "Winner: " + (!this.state.player1 ? "BB-8" : "AT-AT");

      } else {
          status = "Next Player: " + (this.state.player1 ? "BB-8" : "AT-AT");

      }

    return (
      <div>
        <SelectPlayers playerSelect={this.playerSelect.bind(this)}/>
        <div className="status">{status}</div>
      <main>
        {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
      </main>
    </div>
    );
  }
}

export default Board;
