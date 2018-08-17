import React, { Component } from 'react';
import './App.css';
import './board.css'
import Square from './square';
import SelectPlayer from './selectPlayer'


function calculateWinner(squares){ //Takes in squares array, and evalutes if winner, and who is winner.
  //Win conditions:
  const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    //Check square array against win condition.
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return;
}

function isArrFull(squares){ // Check if the arr of squares has no null values:
  let checkNotNull = [];
  for(let i = 0; i < squares.length; i++){
    if(squares[i] !== null){
      checkNotNull.push(squares[i]);
    }
  }
  if(checkNotNull.length === squares.length){
    return true;
  }
  return false;
}

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null), //generate Array length 9 of null values.
      player1: {selected: false, icon: null, name: null}, //object to store player1 data
      player2: {selected: false, icon: null, name: null}, //object to store player2 data.
      is1stPlayer: true
    };
  }

  squareClick = (i) => {
    let { squares, player1, player2, is1stPlayer } = this.state;
    //End and return nothing if both player are not selected.
    if(!player1.selected || !player2.selected){
      return
    }
    //End and return nothing if a player has won, or current square has value
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //Assign value to
    squares[i] = this.state.is1stPlayer ? player1.icon : player2.icon;
    this.setState({ squares: squares, is1stPlayer: !is1stPlayer })
  }

  selectPlayer(obj){
    let { id, value } = obj;
    //split value of name, and add '-'
    let icon = value.split(" ").join("-");
    //create img icon path.
    let img = "./img/"+icon+".png";
    console.log("in boards.. ", id, value, icon);
    //setState for players.
    if(id === 'X'){
      console.log("in id X... ");
      this.setState({ player1: {selected: true, icon: img, name: value} })
    }
    if(id === 'O'){
      console.log("in id O)... ");
      this.setState({ player2: {selected: true, icon: img, name: value} })
    }
  }

  checkStatus(){
    let { squares, player1, player2, is1stPlayer } = this.state;
    //Declare status, winner, and isArrFull.
    let status = "Please select players";
    const winner = calculateWinner(squares);
    const arrFull = isArrFull(squares);
    // if both players have been selected... check status.
    if(player1.selected && player2.selected)
      if(winner){ //if winner - set status to current player name + wins
         status = (!is1stPlayer ? player1.name : player2.name)+" Wins!";
      } else { //set status to current player's turn
         status = (is1stPlayer ? player1.name : player2.name)+"'s Turn";
      }
      if(arrFull && !winner){ //Check if array of squares is full, and no winner exists..
        //check if Han and Greedo are playing.
        if(player1.name === "han solo" && player2.name === "greedo"){
           status = "Game is tied, but Han shot first!"
        } else {
           status = "Game is tied"
        }
      }
      return status;
  }

  reset(){ //set state back to start, and call reset on child component.
    this.setState({
      squares: Array(9).fill(null),
      player1: {selected: false, icon: null, name: null},
      player2: {selected: false, icon: null, name: null},
      is1stPlayer: true
    });
    this.refs.selectPlayer.reset();
  }

  render() {
    console.log("STATE Boards: ", this.state);
    let { squares, player1, player2, is1stPlayer, isHidden } = this.state;
    let status = this.checkStatus();
    //create grid of Square child elements
    let grid = squares.map((square, i) => {
      return (
        <Square key={i.toString()} val={squares[i]} squareClick={this.squareClick.bind(this, i)} />
      );
    })
    //isHidden flips to hide elements after selection
    return (
      <div className="status">
          {!isHidden && <SelectPlayer ref="selectPlayer" selectPlayer={this.selectPlayer.bind(this)}/>}
          {!isHidden && status}
        <main>
          {grid}
        </main>
        <button onClick={this.reset.bind(this)}>Reset</button>
      </div>
    );
  }

}

export default Board;
