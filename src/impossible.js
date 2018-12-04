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

var startDebugging = false;

//Determines AI move when Impossible level is selected
export const aiMoveImpossible = (origBoard, aiPlayer) => {
		//Prevents code leak into board
		var newBoard = origBoard.slice()
	return minimax(newBoard, aiPlayer).index;
}

//Logic behind AI move when Impossible level is selected
const minimax = (newBoard, player) => {

	
	//Finds empty spaces on board
	var availSpots = emptySquares(newBoard);
	
	console.log("minimax")
	console.log(availSpots)

	//Determines if the player is AI or human by looping through const huPlayer & aiPlayer arrays and returns a boolean
	var isaiPlayer;

	for (let i = 0; i < aiPlayer.length; i++) {
		if (player === aiPlayer[i] || player === aiPlayer) {
			isaiPlayer = true;
			player = aiPlayer[i]
		} else if (player === huPlayer[i] || player === huPlayer) {
			isaiPlayer = false;
			player = huPlayer[i]
		}
	}

	console.log(player)
	console.log(isaiPlayer)

	//Assigns a score to the winning move based on which player has won
	if(checkWin(newBoard, player)) {
		console.log("checkWin player ", checkWin(newBoard, player))
		debugger
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)){
		console.log("checkWin aiPlayer", checkWin(newBoard, aiPlayer))
		debugger
		return {score: 10};
	} else if (availSpots.length === 0) {
		debugger
		startDebugging = true;
		return {score: 0}; 
	}

	console.log("postcw")
	
	//Establishes the moves array
	var moves = [];

	if (startDebugging){
		debugger;
	}

	//Assigns a score to each move and pushes it to the moves array
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		console.log("move index 1 - "  + move.index)
		
		if (isaiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;

		// console.log("inside moves" + moves)
		console.log("inside move", move)

		// console.log("move score" + move.score)
		// console.log("move index 2 - "  + move.index)
		moves.push(move);
	}

	//Maximizes the best score when the AI player is playing and minimizes the best score when the human is playing
	var bestMove;

	if(isaiPlayer){
		var bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				console.log(moves[i])
				bestMove = i;
			}
		}
	} else {
		bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	console.log(moves[bestMove])
	console.log("moves", moves)

	//Returns the best move for the AI player to play in
	return moves[bestMove];

}


//Determines which index was the winning move and which player has won
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for(let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)){
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}


//Determines empty squares on the board
function emptySquares(aBoard) { 
	let emptySpots = [], i;
	for (let i = 0; i < aBoard.length; i++)
		if (typeof aBoard[i] === 'number')
			emptySpots.push(i)
	return emptySpots;
}

