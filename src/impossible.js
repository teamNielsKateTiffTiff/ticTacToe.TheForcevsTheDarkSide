var origBoard;
const huPlayer = ['X', "./img/han-solo.png", "./img/luke-skywalker.png", "./img/leia-organa.png", "./img/chewbacca.png", "./img/yoda.png", "./img/admiral-ackbar.png", "./img/c3p0.png", "./img/ewok.png", "./img/lando-calrissian.png", "./img/obiwan-kenobi.png", "./img/qui-gon-jinn.png", "./img/r2d2.png"];
const aiPlayer = ['O', "./img/darth-vader.png", "./img/emperor-palpatine.png", "./img/boba-fett.png", "./img/greedo.png", "./img/darth-maul.png", "./img/clone-trooper.png", "./img/jabba-the-hutt.png", "./img/jango-fett.png", "./img/storm-trooper.png"];
const winCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
];


// startGame();

// function startGame() {
// 	document.querySelector(".endgame").style.display = "none"
// 	origBoard = Array.from(Array(9).keys());
// 	for (var i = 0; i < cells.length; i++) {
// 		cells[i].innerText = '';
// 		cells[i].style.removeProperty('background-color');
// 		cells[i].addEventListener('click', turnClick, false);
// 	}
// }

origBoard = Array.from(Array(9).keys());


// function turnClick(square) {
// 	if (typeof origBoard[square.target.id] == 'number') {
// 		turn(square.target.id, huPlayer)
// 	if (!checkTie()) turn(bestSpot(), aiPlayer);	
// 	}
// }

// function turn(squareId, player) {
// 	origBoard[squareId] = player;
// 	document.getElementById(squareId).innerText = player;
// 	let gameWon = calculateWinner(origBoard)
// 	// if(gameWon) gameOver(gameWon)
// }

function checkWin(board, player) {
	if (
		(board[0] === player && board[1] === player && board[2] === player) ||
		(board[3] === player && board[4] === player && board[5] === player) ||
		(board[6] === player && board[7] === player && board[8] === player) ||
		(board[0] === player && board[3] === player && board[6] === player) ||
		(board[1] === player && board[4] === player && board[7] === player) ||
		(board[2] === player && board[5] === player && board[8] === player) ||
		(board[0] === player && board[4] === player && board[8] === player) ||
		(board[2] === player && board[4] === player && board[6] === player)
		) {
		return {boo: true};
		} else {
		return {boo: false};
	}
}


// function calculateWinner(squares) { //Takes in squares array, and evalutes if winner, and who is winner.
//     //Win conditions:
//     const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
//     for(let i = 0; i < lines.length; i++){
//       const [a, b, c] = lines[i];
//       //Check square array against win condition.
//       if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
//         return squares[a];
//       }
// 	}
// 	// console.log("within win func" + )
//     return;
//   }

// function gameOver(gameWon) {
// 	for (let index of winCombos[gameWon.index]){
// 		document.getElementById(index).style.backgroundColor = 
// 			gameWon.player == huPlayer ? "blue" : "red";
// 	}
// 	for (var i = 0; i < cells.length; i++) {
// 		cells[i].removeEventListener('click', turnClick, false)
// 	}
// 	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose")
// }

// function declareWinner(who) {
// 	document.querySelector(".endgame").style.display = "block";
// 	document.querySelector(".endgame .text").innerText = who;
// }


function emptySquares(aBoard) { 
	let emptySpots = [], i;
	for (let i = 0; i < aBoard.length; i++)
		if (aBoard[i] === null)
			emptySpots.push(i)
	return emptySpots;


	// let emptySpots = [];
	// emptySpots.push(aBoard.filter(s => typeof s !== 'string'));
	
	// return emptySpots;
	
	// return aBoard.filter(s => typeof s == 'number');

	// var emptySpots = [];
	// for (let i = 0; i < aBoard.length; i++) {
	// 	if (i === undefined );
	// 	emptySpots.push(aBoard.indexOf(i));
	// }
	// return emptySpots;
}
// console.log(emptySquares)

export const aiMoveImpossible = (origBoard, aiPlayer) => {
	// console.log("aiImpossible");
	// console.log(origBoard);
	// console.log(aiPlayer);
	return minimax(origBoard, aiPlayer);
}

// function checkTie() {
// 	if (emptySquares().length == 0){
// 		// for (var i = 0; i < cells.length; i++) {
// 		// 	cells[i].style.backgroundColor = "green";
// 		// 	cells[i].removeEventListener('click', turnClick, false);
// 		// }
// 		// declareWinner("Tie Game!")
// 		return true	
// 	}
// 	return false;
// }

export const minimax = (newBoard, player) => {
	var availSpots = emptySquares(newBoard);
	console.log("minimax")
	console.log(availSpots)
	// const cells = newBoard[i];

	var isaiPlayer = false;

	for (let i = 0; i < aiPlayer.length; i++) {
		if (player === aiPlayer[i]) {
			isaiPlayer = true;
		}
	}

	// var result = () => {
		if(checkWin(newBoard, player)["boo"]) {
			console.log("win result " + checkWin(newBoard, player))
			return {score: -10};
		} else if (checkWin(newBoard, aiPlayer)["boo"]){
			return {score: 10};
		} else if (availSpots.length === 0) {
			return {score: 0}; 
		}
	// }	 
	console.log("postcw")
	
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;
		var result = minimax(newBoard, player);
		console.log("move index 1 - "  + move.index)
		// move.score = result()
		if (isaiPlayer) {
			result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
		move.index = availSpots[i];
		// console.log("inside moves" + moves)
		console.log("inside move" + move)
		console.log("move score" + move.score)
		console.log("move index 2 - "  + move.index)
		moves.push(move.index);
	}

	var bestMove;
	// if(isaiPlayer){
	// 	var bestScore = -10000;
	// 	for (let i = 0; i < moves.length; i++) {
	// 		if (moves[i].score > bestScore) {}
	// 	}
	// }



	if(isaiPlayer){
		var bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				console.log(move[i])
				bestMove = moves[i];
			}
		}
	} else {
		bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = moves[i];
			}
		}
	}
	console.log(move[i])
	console.log(moves[bestMove])
	console.log("moves" + moves)
	return moves[bestMove];

}

