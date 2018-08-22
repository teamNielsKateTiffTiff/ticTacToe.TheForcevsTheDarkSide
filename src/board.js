import React, { Component } from 'react';
import './App.css';
import './board.css'
import Square from './square';
import SelectPlayer from './selectPlayer'
import starwarsthemesong from './sounds/starwarsthemesong.mp3';

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

//Function to check for optimal moves.
function checkMoves(squares, player, ai){
  //Declare an Array of possible choices.
  const moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  for(let i = 0; i < moves.length; i++){
    const [a,b,c] = moves[i];
    //Checks for combinations of 2 AI and a null value. returns index of null.
    if(squares[a] === ai && squares[b] === ai && !squares[c]){
      return c;
    }
    if(squares[a] === ai && squares[c] === ai && !squares[b]){
      return b;
    }
    if(squares[c] === ai && squares[b] === ai && !squares[a]){
      return a;
    }
    //Check for combinations of 2 PLayers and a null value and return index of null
    if(squares[a] === player && squares[b] === player && !squares[c]){
      return c;
    }
    if(squares[a] === player && squares[c] === player && !squares[b]){
      return b;
    }
    if(squares[b] === player && squares[c] === player && !squares[a]){
      return a;
    }
  }
  //if no conditions matches return false.
  return false;
}

//Determines AI move
function aiMove(squares, player, ai, p_last, firstMove){
  // Declare null move value
  let newMove = null;
  //Check is this is the firstMove
  if(firstMove){
    //Checks if Player move is middle square
    if(squares.indexOf(player) === 4){
      //Assigns a random square that is not the middle.
      while(newMove !== p_last){
        newMove = Math.floor(Math.random()*(squares.length-1));
        console.log(newMove);
        return newMove;
      }
    }
    //If player move is not the middle, AI move is the middle.
    else{
      newMove = 4;
      return newMove;
    }
  }
  //Check other move if not first move.
  if(checkMoves(squares, player, ai)){
    console.log("checking move")
    return checkMoves(squares, player, ai);
  } else { // If checkmove returns false, then loops array and assigns first null value as move.
    console.log("no moves...");
    for(let i = 0; i < squares.length; i++){
      if(squares[i] === null){
        return i;
      }
    }
  }
}

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {

      squares: Array(9).fill(null), //generate Array length 9 of null values.
      player1: {selected: false, icon: null, name: null}, //object to store player1 data
      player2: {selected: false, icon: null, name: null}, //object to store player2 data.
      is1stPlayer: true,
<<<<<<< HEAD
      sounds: [new Audio(starwarsthemesong)],
      ai: {on: false, firstMove: true}
=======
      sounds: [new Audio(starwarsthemesong)]

>>>>>>> abd8ac0bdccbc8862de503b5aab5800e992c584b
    };
  }

  squareClick = (i) => {
    let { squares, player1, player2, is1stPlayer, ai } = this.state;
    //End and return nothing if both player are not selected.
    if(!player1.selected || !player2.selected){
      return
    }
    //End and return nothing if a player has won, or current square has value
    if(calculateWinner(squares) || squares[i]){
      return;
    }
      //Assign value to squares for player 1 and player 2 alternating.
      if(!ai.on){
        squares[i] = this.state.is1stPlayer ? player1.icon : player2.icon;
        this.setState({ squares: squares, is1stPlayer: !is1stPlayer })
      }
      //If AI on, assigns value to squares for player1 and then AI
      if(ai.on){
        squares[i] = player1.icon;
        let move = aiMove(squares, player1.icon, player2.icon, i, ai.firstMove);
        squares[move] = player2.icon;
        this.setState({ squares: squares, ai: {on: true, firstMove: false } });
      }
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
    let status = "Select your side";
    let sound = this.state.sounds[0];
    const winner = calculateWinner(squares);
    const arrFull = isArrFull(squares);
    // if both players have been selected... check status.
    if(player1.selected && player2.selected)
      if(winner){ //if winner - set status to current player name + wins
         status = (!is1stPlayer ? player1.name : player2.name)+" Wins!";
         sound.play()
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

  //Sets state of ai to true of false
  aiStatus(status){
    console.log(status);
    this.setState({ai: {on: status, firstMove: this.state.ai.firstMove}});
    console.log("STATE: BOARDS", this.state);
  }

  reset(){ //set state back to start, and call reset on child component.
    this.setState({
      squares: Array(9).fill(null),
      player1: {selected: false, icon: null, name: null},
      player2: {selected: false, icon: null, name: null},
      is1stPlayer: true,
      ai: {on: false, firstMove: true}
    });
    this.refs.selectPlayer.reset();
    this.state.sounds[0].pause()
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
<<<<<<< HEAD
      <div className="status">
          {!isHidden && status}
          {!isHidden && <SelectPlayer ref="selectPlayer" selectPlayer={this.selectPlayer.bind(this)} aiStatus={this.aiStatus.bind(this)}/>}
          <button onClick={this.reset.bind(this)}>Reset</button>
        <main>
          {grid}
        </main>
=======
      <div>
        <div className="status">
            {!isHidden && status}
            {!isHidden && <SelectPlayer ref="selectPlayer" selectPlayer={this.selectPlayer.bind(this)}/>}
            <button onClick={this.reset.bind(this)}>Reset</button>
          <main>
            {grid}
          </main>

        </div>
>>>>>>> abd8ac0bdccbc8862de503b5aab5800e992c584b
      </div>
    );
  }

}

export default Board;
