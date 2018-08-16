import React, { Component } from 'react';
//import './board.css'


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

class Game extends Component {

}

export default Game;
