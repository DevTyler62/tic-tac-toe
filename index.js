/**
 * Global variable declarations
 */

let player = "X";
let boardLocked = false;
let HUMAN = "X";
let AI = "O";
let difficulty = "easy";
let computerTimeout;

var xspots = [
  "xone",
  "xtwo",
  "xthree",
  "xfour",
  "xfive",
  "xsix",
  "xseven",
  "xeight",
  "xnine",
];
var ospots = [
  "oone",
  "otwo",
  "othree",
  "ofour",
  "ofive",
  "osix",
  "oseven",
  "oeight",
  "onine",
];

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameStatus = ["", "", "", "", "", "", "", "", ""];
let winner = false;

let gameTypePlayer = document.getElementById("twoplayer");
gameTypePlayer.addEventListener("click", twoPlayer);

let gameTypeComputer = document.getElementById("computer");
gameTypeComputer.addEventListener("click", computerStart);
let computer = false;

let restart = document.getElementById("restart");
restart.addEventListener("click", setUpNewGame);

let all = document.querySelectorAll(".slot");
all.forEach((element, index) =>
  element.addEventListener("click", () => getSelection(index))
);

/**
 * Get the spot on the board that the user has selected
 * @param index number - Carries the index of the spot that the user has selected
 * @returns - Returns nothing
 */
function getSelection(index) {
  if (boardLocked) return;
  checkSelection(index);
}
/**
 * Validates the spot that the user selected to make sure it is free to be used
 * @param i number - Carries the number of the spot in which the user selected
 */
function checkSelection(i) {
  if (gameStatus[i] !== "") return;
  makeMove(i);
}
/**
 * Handles the user making a move on the board and checks if the user has won or if there is a tie
 * @param index number - Carries the index of the spot that the user has selected
 * @returns - Returns true if the user has won, otherwise returns false
 */
function makeMove(index) {
  gameStatus[index] = player;

  renderBoard();

  if (checkIfPlayerWon(player)) return;
  if (checkIfTie()) return;

  if (computer && player === "X") {
    lockBoard();
    player = "O";

    document.getElementById("player").textContent = "Computer";

    computerTimeout = setTimeout(computerPlayer, 1000);
  } else {
    player = player === "X" ? "O" : "X";
    document.getElementById("player").textContent = player;
  }
}

/**
 * Render the board with the X and O images based on the user selection
 */
function renderBoard() {
  for (let i = 0; i <= 8; i++) {
    document.getElementById(xspots[i]).style.visibility = "hidden";
    document.getElementById(ospots[i]).style.visibility = "hidden";
    if (gameStatus[i] === "X") {
      document.getElementById(xspots[i]).style.visibility = "visible";
    }
    if (gameStatus[i] === "O") {
      document.getElementById(ospots[i]).style.visibility = "visible";
    }
  }
}

/**
 * Checks if a player has won the game and displays a message if they have
 * @param player - Carries the player that is being checked for a win
 * @returns - Returns true if the player has won, otherwise returns false
 */
function checkIfPlayerWon(player) {
  if (!checkWinner(gameStatus, player)) {
    return false;
  }

  winner = true;
  lockBoard();

  Swal.fire({
    title: `${player} Won the Game`,
    imageUrl: "./img/celebration.png",
    showCancelButton: true,
    confirmButtonText: "New Game",
  }).then((result) => {
    if (result.isConfirmed) {
      setUpNewGame();
    }
  });

  return true;
}
/**
 * Checking if a player has won based on the winning conditions and the current state of the board
 * @param board - Carries the current state of the board
 * @param player - Carries the player that is being checked for a win
 * @returns - Returns true if the player has won, otherwise returns false
 */
function checkWinner(board, player) {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if there is a tie in the game if no winner has been selected
 * @returns - Returns true if there is a tie, otherwise returns false
 */
function checkIfTie() {
  if (!gameStatus.includes("") && winner == false) {
    lockBoard();
    Swal.fire({
      title: "Tie Game",
      imageUrl: "./img/tie.png",
      showCancelButton: true,
      confirmButtonText: "New Game",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpNewGame();
      }
    });
    return true;
  }
  return false;
}

/**
 * Sets up a new game to be played
 */
function setUpNewGame() {
  if (computerTimeout) {
    clearTimeout(computerTimeout);
    computerTimeout = null;
  }

  gameStatus.fill("");
  player = "X";
  winner = false;
  boardLocked = false;

  renderBoard();

  document.getElementById("player").textContent = "X";
}

/**
 * If a game is being played and the user selects the "2 player" button again then it resets the game
 */
function twoPlayer() {
  computer = false;
  difficulty = "";

  document.getElementById("gametype").textContent = "2 Player";
  document.getElementById("difficulty").textContent = "—";

  setUpNewGame();
}

/*--------------------------*/
/* START COMPUTER CODE */

/**
 * Initiates the starting of the computer code by showing the user difficulty options to select from
 * and then calling the selectDifficulty function based on the user's selection
 */
function computerStart() {
  Swal.fire({
    title: "Select Difficulty",
    text: "Choose how challenging you want the computer to be.",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Easy",
    denyButtonText: "Medium",
    cancelButtonText: "Hard",
  }).then((result) => {
    if (result.isConfirmed) {
      selectDifficulty("easy");
    } else if (result.isDenied) {
      selectDifficulty("medium");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      selectDifficulty("hard");
    }
  });
}

/**
 * Setting the difficulty level for the computer and starting a new game
 * @param level - Carries the difficulty level that the user has selected
 */
function selectDifficulty(level) {
  difficulty = level;
  computer = true;

  document.getElementById("gametype").textContent = "Computer";
  document.getElementById("difficulty").textContent = `${capitalize(level)}`;
  setUpNewGame();
}

/**
 * Runs the computer player by first getting difficulty level and then getting the move that the computer will make based on the difficulty level
 */
function computerPlayer() {
  let move;

  if (difficulty === "easy") {
    move = getRandomMove();
  } else if (difficulty === "medium") {
    move = getMediumMove();
  } else if (difficulty === "hard") {
    move = getBestMove();
  }

  if (move === undefined || move === -1) {
    return;
  }

  computerMove(move);
}

/**
 * Gets a random move for the computer to make - Used for easy difficulty
 * @returns - Returns the index of the move that the computer will make
 */
function getRandomMove() {
  let availableMoves = getAvailableMoves(gameStatus);

  let randomIndex = Math.floor(Math.random() * availableMoves.length);

  return availableMoves[randomIndex];
}

/**
 * Medium difficulty move selection - tries to block the player from winning, otherwise picks a random move
 * @returns - Returns the index of the move that the computer will make
 */
function getMediumMove() {
  // Try to win
  for (const move of getAvailableMoves(gameStatus)) {
    gameStatus[move] = AI;

    if (checkWinner(gameStatus, AI)) {
      gameStatus[move] = "";
      return move;
    }

    gameStatus[move] = "";
  }

  // Try to block the player
  for (const move of getAvailableMoves(gameStatus)) {
    gameStatus[move] = HUMAN;

    if (checkWinner(gameStatus, HUMAN)) {
      gameStatus[move] = "";
      return move;
    }

    gameStatus[move] = "";
  }

  // Otherwise make a random move
  return getRandomMove();
}

/**
 * Handles the computer making a move on the board
 * @param index number - Carries the index of the spot that the computer has selected
 * @returns - Returns true if the computer has won, otherwise returns false
 */
function computerMove(index) {
  gameStatus[index] = "O";

  renderBoard();

  if (checkIfPlayerWon("O")) return;
  if (checkIfTie()) return;

  unlockBoard();
  player = "X";
  document.getElementById("player").textContent = "X";
}

/**
 * Finding the best move for the computer to make
 * @param board - Carries the current state of the board
 * @returns - Returns an array of the available moves that can be made on the board
 */
function getAvailableMoves(board) {
  let moves = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      moves.push(i);
    }
  }

  return moves;
}

/**
 * Minimax algorithm for the computer to find the best move to make
 * @param board - Carries the current state of the board
 * @param isMaximizing - Carries a boolean value to determine if the computer is maximizing or minimizing
 * @param depth - Carries the depth of the recursion
 * @returns - Returns the score of the current board state
 */
function minimax(board, isMaximizing, depth) {
  if (checkWinner(board, AI)) {
    return 10 - depth;
  }

  if (checkWinner(board, HUMAN)) {
    return depth - 10;
  }

  if (boardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (const move of getAvailableMoves(board)) {
      board[move] = AI;

      let score = minimax(board, false, depth + 1);

      board[move] = "";

      bestScore = Math.max(score, bestScore);
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (const move of getAvailableMoves(board)) {
      board[move] = HUMAN;

      let score = minimax(board, true, depth + 1);

      board[move] = "";

      bestScore = Math.min(score, bestScore);
    }

    return bestScore;
  }
}

/**
 * Getting the best move for the computer to make based on the minimax algorithm
 * @returns - Returns the index of the best move for the computer to make
 */
function getBestMove() {
  let bestScore = -Infinity;

  let move = -1;

  for (const spot of getAvailableMoves(gameStatus)) {
    gameStatus[spot] = AI;

    let score = minimax(gameStatus, false, 0);

    gameStatus[spot] = "";

    if (score > bestScore) {
      bestScore = score;
      move = spot;
    }
  }

  return move;
}

/*----------------------------*/
/* End Computer Code */

/**
 * Helper functions for disabling and enabling the board when the computer is playing
 */
function lockBoard() {
  boardLocked = true;
}

function unlockBoard() {
  boardLocked = false;
}

/**
 * checking if the board is full
 * @param board - Carries the current state of the board
 * @returns - Returns true if the board is full, otherwise returns false
 */
function boardFull(board) {
  return !board.includes("");
}

/**
 *
 * @param word - Carries the word that needs to be capitalized
 * @returns - Returns the word with the first letter capitalized
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
