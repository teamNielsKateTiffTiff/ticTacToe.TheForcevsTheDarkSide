import React, { Component } from 'react';
import './App.css';
import './board.css'
import Square from './square';
import SelectPlayer from './selectPlayer'
//import Sounds from './sounds';
import starwarsthemesong from './sounds/starwarsthemesong.mp3';


function calculateWinner(squares){ //Takes in squares array, and evalutes if winner, and who is winner.
  const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return;
}

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      player1: {selected: false, icon: null, name: null},
      player2: {selected: false, icon: null, name: null},
      gameStart: false,
      is1stPlayer: true,
      sounds: [new Audio(starwarsthemesong)]
    };
  }

  squareClick = (i) => {
    let { squares, player1, player2, is1stPlayer } = this.state;
    if(!player1.selected || !player2.selected){
      return
    }
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.is1stPlayer ? "./img/"+player1.icon+".png" : "./img/"+player2.icon+".png";
    this.setState({ squares: squares, is1stPlayer: !is1stPlayer })
  }

  selectPlayer(obj){
    let { id, value } = obj;
    console.log("in boards.. ", id, value);
    if(id === 'X'){
      console.log("in id X... ");
      this.setState({ player1: {selected: true, icon: value, name: value} })
    }
    if(id === 'O'){
      console.log("in id O)... ");
      this.setState({ player2: {selected: true, icon: value, name: value} })
    }
  }

  reset(){
    this.setState({
      squares: Array(9).fill(null),
      player1: {selected: false, icon: null, name: null},
      player2: {selected: false, icon: null, name: null},
      gameStart: false,
      is1stPlayer: true
    });
  }

  render() {
    console.log("STATE Boards: ", this.state);
    let { squares, player1, player2, is1stPlayer } = this.state;
    let status = "Please select players";
    const winner = calculateWinner(squares);
    if(player1.selected && player2.selected)
      if(winner){
        status = (!is1stPlayer ? player1.name : player2.name)+" Wins!";
      } else {
        status = (is1stPlayer ? player1.name : player2.name)+"'s Turn";
      }
    let grid = squares.map((square, i) => {
      return (
        <Square key={i.toString()} val={squares[i]} squareClick={this.squareClick.bind(this, i)} />
      );
    })
    return (
      <div className="status">
          {!this.state.isHidden && <SelectPlayer selectPlayer={this.selectPlayer.bind(this)}/>}
          {!this.state.isHidden && status}
        <main>
          {grid}
        </main>
        <button onClick={this.reset.bind(this)}>Reset</button>
      </div>
    );
  }

}

export default Board;
