/**
 * Global variabale declerations
 */

let player = "X";
let boardLocked = false;

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
 * @param index number - Carries the index of the spot that the user has selected
 * Get the spot on the board that the user has selected
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
 * @param index number - Carries the index of the spot that the user has selected
 * Handles the changing of the player
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

    setTimeout(computerPlayer, 1000);
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
 * @param player string - Carries the current player that is being checked for a win
 * Checks the current status of the game to see if a player has won or not
 */
function checkIfPlayerWon(player) {
  for (let p = 0; p <= 7; p++) {
    const winCondition = winningConditions[p];

    let a = gameStatus[winCondition[0]];
    let b = gameStatus[winCondition[1]];
    let c = gameStatus[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      if (player === "X") {
        Swal.fire({
          title: "X Won the Game",
          imageUrl: "./img/celebration.png",
          showCancelButton: true,
          confirmButtonText: "New Game",
        }).then((result) => {
          if (result.isConfirmed) {
            setUpNewGame();
          } else {
            all.forEach((element) =>
              element.removeEventListener("click", getSelection)
            );
          }
        });
        winner = true;
      }
      if (player === "O") {
        Swal.fire({
          title: "O Won the Game",
          imageUrl: "./img/celebration.png",
          showCancelButton: true,
          confirmButtonText: "New Game",
        }).then((result) => {
          if (result.isConfirmed) {
            setUpNewGame();
          } else {
            all.forEach((element) =>
              element.removeEventListener("click", getSelection)
            );
          }
        });
        winner = true;
      }
    }
  }
}
/**
 * Checks if there is a tie in the game if no winner has been selected
 */
function checkIfTie() {
  if (!gameStatus.includes("") && winner == false) {
    Swal.fire({
      title: "Tie Game",
      imageUrl: "./img/tie.png",
      showCancelButton: true,
      confirmButtonText: "New Game",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpNewGame();
      } else {
        all.forEach((element) =>
          element.removeEventListener("click", getSelection)
        );
      }
    });
  }
}

/**
 * Sets up a new game to be played
 */
function setUpNewGame() {
  gameStatus.fill("");
  player = "X";
  window.location.reload();
}

/**
 * If a game is being played and the user selects the "2 player" button again then it resets the game
 */
function twoPlayer() {
  setUpNewGame();
}

/*--------------------------*/
/* START COMPUTER CODE */

/**
 * Initiates the starting of the computer code
 */
function computerStart() {
  computer = true;
  document.getElementById("gametype").textContent = "Computer";
}

/**
 * Runs the picking of the computer code
 */
function computerPlayer() {
  let occurrences = gameStatus.reduce((a, v) => (v === "O" ? a + 1 : a), 0);
  switch (occurrences) {
    case 0:
      randomPick(); //move one
      break;
    case 1:
      pickSpot2(); // move two
      break;
    case 2:
      randomPick(); // move three
      break;
    case 3:
      randomPick(); // move four
      break;
    default:
  }
}

/**
 * @param index number - Carries the index of the spot that the computer has selected
 * Runs the computer move
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
 * Function for picking the second spot for the computer
 */
function pickSpot2() {
  let spotPicked = false;
  let xarray = [];
  for (let m = 0; m < gameStatus.length; m++) {
    if (gameStatus[m] === "X") {
      xarray.push(m);
    }
  }
  for (let p = 0; p <= 7; p++) {
    const winCondition = winningConditions[p];

    let a = winCondition[0];
    let b = winCondition[1];
    let c = winCondition[2];

    if (a === xarray[0] || a === xarray[1]) {
      if (b === xarray[0] || b === xarray[1]) {
        spotPicked = true;
        setTimeout(function () {
          if (gameStatus[c] === "O") {
            // call to make a random pick since above condition was met
            randomPick();
          } else {
            computerMove(c);
          }
        }, 2000);
      } else if (c === xarray[0] || c === xarray[1]) {
        spotPicked = true;
        setTimeout(function () {
          if (gameStatus[b] === "O") {
            // call to make a random pick since above conditon was met
            randomPick();
          } else {
            computerMove(b);
          }
        }, 2000);
      }
    }
  }
  if (spotPicked === false) {
    randomPick();
  }
}

/**
 * Finding a random spot on the board that is open to be selected for the computer
 */
function randomPick() {
  let pick = Math.floor(Math.random() * 9);
  if (gameStatus[pick] === "") {
    setTimeout(function () {
      computerMove(pick);
    }, 2000);
  } else {
    randomPick();
  }
}

/**
 * Helper functions for disabling and enabling the board when the computer is playing
 */
function lockBoard() {
  boardLocked = true;
}

function unlockBoard() {
  boardLocked = false;
}
