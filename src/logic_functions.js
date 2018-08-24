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

// Check if the arr of squares has no null values:
export const isArrFull = (squares) => {
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
export const checkMoves = (squares, player, ai) => {
  console.log("checking moves...");
  //Declare an Array of possible choices.
  const checks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  let moves = [];
  for(let i = 0; i < checks.length; i++){
    const [a,b,c] = checks[i];
    //Checks for combinations of 2 AI values and a null value and pushes index of null.
    if(squares[a] && squares[a] === squares[b] && !squares[c]){
      squares[a] === ai ? moves.push({idx: c, score: 1}) : moves.push({idx: c, score: 0});
    }
    if(squares[a] && squares[a] === squares[c] && !squares[b]){
      squares[a] === ai ? moves.push({idx: b, score: 1}) : moves.push({idx: b, score: 0});
    }
    if(squares[b] && squares[b] === squares[c] && !squares[a]){
      squares[b] === ai ? moves.push({idx: a, score: 1}) : moves.push({idx: a, score: 0});
    }
    // if(squares[a] && !squares[b] && !squares[c]){
    //   squares[a] === ai ? moves.push({idx: c, score: -1}) : moves.push({idx: c, score: -2});
    // }
    // if(squares[a] && !squares[c] && !squares[b]){
    //   squares[a] === ai ? moves.push({idx: b, score: -1}) : moves.push({idx: b, score: -2});
    // }
    // if(squares[b] && !squares[c] && !squares[a]){
    //   squares[b] === ai ? moves.push({idx: a, score: -1}) : moves.push({idx: a, score: -2});
    // }
  }
  console.log(moves);
  // Checks if there are moves
  if(moves.length > 1){
    console.log("There are moves.. ", moves);
    // LOOP moves to find first move with score of 1
    for(let i = 0; i < moves.length; i++){
      console.log("looping moves.. ", moves[i]);
      if(moves[i].score === 1){
        console.log("found best move...", moves[i]);
        return moves[i].idx
      }
    }
    //If loop ends without return then return first move from array.
    console.log(moves[0].idx);
    return moves[0].idx;
  } else { //Edge case where no matches, array is empty
    console.log("no moves...");
    //Assign array of emptySpaces using emptySpaces function
    let emptySpots = emptySpaces(squares);
    //Edge case if only 1 space left
    if (emptySpots.length === 1){
      return emptySpots[0];
    }
    //pick random space from remaining spaces.
    //if(emptySpots.includes())
    let newMove = Math.floor(Math.random()*(emptySpots.length-1));
    console.log(emptySpots[newMove]);
    return emptySpots[newMove];
  }
}

//Determines AI move
export const aiMove = (squares, player, ai, p_last, firstMove) => {
  console.log("AIMOVE");
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
        console.log("in while loop");
        newMove = Math.floor(Math.random()*(squares.length-1));
        console.log(newMove);
      } while(!moves.includes(newMove));
      return newMove;
    }
    //If player move is not the middle, AI move is the middle.
    else {
      newMove = 4;
      return newMove;
      //pick random number while it matches the moves array
    //   let moves = [1,3,4,5,7];
    //   do {
    //     console.log("in while loop 2");
    //     newMove = Math.floor(Math.random()*(squares.length-1));
    //     console.log(newMove);
    //   } while(!moves.includes(newMove) || squares[newMove] === player);
    //   return newMove;
    }
  }
  //call checkMoves for other moves if not first move.
  return checkMoves(squares, player, ai);
}

//Return emptySpaces in an Array.
export const emptySpaces = (squares) => {
  let emptySpaces = [];
  for(let i = 0; i < squares.length; i++){
    if(squares[i] === null){
      emptySpaces.push(i);
    }
  }
  return emptySpaces;
};

// if(squares[a] === ai && squares[b] === ai && !squares[c]){
//   moves.push({idx: c, score: 1});
// }
// if(squares[a] === ai && squares[c] === ai && !squares[b]){
//   moves.push({idx: b, score: 1});
// }
// if(squares[c] === ai && squares[b] === ai && !squares[a]){
//   moves.push({idx: a, score: 1});
// }
// //Check for combinations of 2 player values and a null value and pushes index of null
// if(squares[a] === player && squares[b] === player && !squares[c]){
//   moves.push({idx: c, score: 0});
// }
// if(squares[a] === player && squares[c] === player && !squares[b]){
//   moves.push({idx: b, score: 0});
// }
// if(squares[b] === player && squares[c] === player && !squares[a]){
//   moves.push({idx: a, score: 0});
// }


//Assigns a random square that is not the middle. NOTE - keep for easier AI with random moves.
// while(squares[newMove] === player || squares[newMove] === ai){
//   newMove = Math.floor(Math.random()*(squares.length-1));
//   console.log(newMove);
//   return newMove;
// }
