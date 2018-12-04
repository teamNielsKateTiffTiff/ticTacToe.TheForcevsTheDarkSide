export const calculateWinner = (squares) => { //Takes in squares array, and evalutes if winner, and who is winner.
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

// Check if the arr of squares has no empty values:
export const isArrFull = (squares) => {
  let checkNotNull = [];
  for(let i = 0; i < squares.length; i++){
    if( typeof squares[i] !== 'number'){
      checkNotNull.push(squares[i]);
    }
  }
  if(checkNotNull.length === squares.length){
    return true;
  }
  return false;
}


//Return emptySpaces in an Array.
export const emptySpaces = (squares) => {
  let emptySpaces = [];
  for(let i = 0; i < squares.length; i++){
    if(typeof squares[i] !== 'number'){
      emptySpaces.push(i);
    }
   }
  return emptySpaces;
} ;

//Determines AI move when Easy level is selected
export const aiMoveEasy = (squares) => {
  let emptySpots = emptySpaces(squares);
    //Edge case if only 1 space left
    if (emptySpots.length === 1){
      return emptySpots[0];
    }
    //pick random space from remaining spaces.
    let newMove = Math.floor(Math.random()*(emptySpots.length-1));
    return emptySpots[newMove];
}



//Determines AI move when Hard level is selected
export const aiMoveHard = (squares, player, ai, firstMove) => {
  // Declare null move value
  let newMove = null;
  //Check if this is the firstMove
  if(firstMove){
    //Checks if Player move is middle square
    if(squares.indexOf(player) === 4){
      // array of best moves
      let moves = [0,2,6,8];
      //pick random number while it matches the moves array
      do {
        newMove = Math.floor(Math.random()*(squares.length-1));
      } while(!moves.includes(newMove));
      return newMove;
    }
    //If player move is not the middle, AI move is the middle.
    else {
      newMove = 4;
      return newMove;
    }
  }
  //call checkMoves for other moves if not first move.
  return checkMoves(squares, player, ai);
}


//Function to check for optimal moves when aiValue is set to Hard and it is not the first move
export const checkMoves = (squares, player, ai) => {
  //Declare an Array of possible choices.
  const checks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  let moves = [];
  for(let i = 0; i < checks.length; i++){
    const [a,b,c] = checks[i];
    //Checks for combinations of 2 AI values and a number value and pushes index of number.
    if(squares[a] && squares[a] === squares[b] && !squares[c]){
      squares[a] === ai ? moves.push({idx: c, score: 1}) : moves.push({idx: c, score: 0});
    }
    if(squares[a] && squares[a] === squares[c] && !squares[b]){
      squares[a] === ai ? moves.push({idx: b, score: 1}) : moves.push({idx: b, score: 0});
    }
    if(squares[b] && squares[b] === squares[c] && !squares[a]){
      squares[b] === ai ? moves.push({idx: a, score: 1}) : moves.push({idx: a, score: 0});
    }
  }
  // Checks if there are moves
  if(moves.length > 0){
    // LOOP moves to find first move with score of 1
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score === 1){
        return moves[i].idx
      }
    }
    //If loop ends without return then return first move from array.
    return moves[0].idx;
  } else { //Edge case where no matches, array is empty
    //Assign array of emptySpaces using emptySpaces function
    let emptySpots = emptySpaces(squares);
    //Edge case if only 1 space left
    if (emptySpots.length === 1){
      return emptySpots[0];
    }
    //pick random space from remaining spaces.
    let newMove = Math.floor(Math.random()*(emptySpots.length-1));
    return emptySpots[newMove];
  }
}