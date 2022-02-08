var player = "x";
var spotsPlayed = [];
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
// gameTypePlayer.addEventListener("click", playerStart);

let gameTypeComputer = document.getElementById("computer");
gameTypeComputer.addEventListener("click", computerStart);
let computer = false;

let restart = document.getElementById("restart");
restart.addEventListener("click", setUpNewGame);

let all = document.querySelectorAll(".slot");
all.forEach((element) => element.addEventListener("click", getSelection));

/**
 * Get the spot on the board that the user has selected
 */
function getSelection() {
	for (let i = 0; i <= 8; i++) {
		if (all[i].checked === true) {
			checkSelection(i);
		}
	}
}
/**
 * Validates the spot that the user selected to make sure it is free to be used
 * @param i number - Carries the number of the spot in which the user selected
 */
function checkSelection(i) {
	let exists = spotsPlayed.find((e) => e === i);
	if (typeof exists == "number") {
		/* Do nothing as the number has already been selected */
	} else {
		spotsPlayed.push(i);
		handlePlayer(i);
	}
}
/**
 * Handles the changing of the player
 * @param i number - Carries the number of the spot in which the user selected
 */
function handlePlayer(i) {
	if (player === "x" && computer === false) {
		xspot(i);
		checkIfPlayerWon();
		checkIfTie();
		player = "o";
		document.getElementById("player").textContent = "O";
	} else if (player === "o" && computer === false) {
		ospot(i);
		checkIfPlayerWon();
		checkIfTie();
		player = "x";
		document.getElementById("player").textContent = "X";
	}

	if (player === "x" && computer === true) {
		all.forEach((element) =>
			element.removeEventListener("click", getSelection)
		);
		xspot(i);
		checkIfPlayerWon();
		checkIfTie();
		player = "computer";
		document.getElementById("player").textContent = "Computer";
		setTimeout(function () {
			if (player === "computer") {
				if (winner === false) {
					computerPlayer(i);
					setTimeout(function () {
						checkIfPlayerWon();
						checkIfTie();
						document.getElementById("player").textContent = "X";
						player = "x";
						all.forEach((element) =>
							element.addEventListener("click", getSelection)
						);
					}, 3000);
				} else if (winner === true) {
					// Do nothing as there has been a winner found
				}
			}
		}, 1000);
	}
}
/**
 * Marks the spot selected with a X
 * @param i number - Carries the number of the spot in which the user selected
 */
function xspot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			document.getElementById(xspots[j]).style.visibility = "visible";
			document.getElementById(ospots[j]).style.visibility = "hidden";
			gameStatus.splice(i, 1, "X"); // Splice method used here means that at spot i replace 1 element with the conets of "X"
		}
	}
}
/**
 * Marks the spot selected with a O
 * @param i number - Carries the number of the spot in which the user selected
 */
function ospot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			document.getElementById(xspots[j]).style.visibility = "hidden";
			document.getElementById(ospots[j]).style.visibility = "visible";
			gameStatus.splice(i, 1, "O"); // Splice method used here means that at spot i replace 1 element with the conets of "O"
		}
	}
}
/**
 * Checks the current status of the game to see if a player has won or not
 */
function checkIfPlayerWon() {
	for (let p = 0; p <= 7; p++) {
		const winCondition = winningConditions[p];

		let a = gameStatus[winCondition[0]];
		let b = gameStatus[winCondition[1]];
		let c = gameStatus[winCondition[2]];

		if (a === "" || b === "" || c === "") {
			continue;
		}

		if (a === b && b === c) {
			if (player === "x") {
				swal({
					title: "X Won the Game",
					icon: "./img/celebration.png",
					buttons: {
						okay: "Ok",
						newGame: "New Game",
					},
				}).then((value) => {
					switch (value) {
						case "newGame":
							setUpNewGame();
							break;
						case "okay":
							all.forEach((element) =>
								element.removeEventListener("click", getSelection)
							);
							break;
						default:
							all.forEach((element) =>
								element.removeEventListener("click", getSelection)
							);
					}
				});
				winner = true;
			}
			if (player === "o" || player === "computer") {
				swal({
					title: "O Won the Game",
					icon: "./img/celebration.png",
					buttons: {
						okay: "Ok",
						newGame: "New Game",
					},
				}).then((value) => {
					switch (value) {
						case "newGame":
							setUpNewGame();
							break;
						case "okay":
							all.forEach((element) =>
								element.removeEventListener("click", getSelection)
							);
							break;
						default:
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
	if (spotsPlayed.length == 9 && !gameStatus.includes("") && winner == false) {
		swal({
			title: "Tie Game",
			icon: "./img/tie.png",
			buttons: {
				okay: "Ok",
				newGame: "New Game",
			},
		}).then((value) => {
			switch (value) {
				case "newGame":
					setUpNewGame();
					break;
				case "okay":
					all.forEach((element) =>
						element.removeEventListener("click", getSelection)
					);
					break;
				default:
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
	for (let r = 0; r < spotsPlayed.length; r++) {
		const found = gameStatus[spotsPlayed[r]];
		if (found === "X") {
			document.getElementById(xspots[spotsPlayed[r]]).style.visibility =
				"hidden";
		} else if (found === "O") {
			document.getElementById(ospots[spotsPlayed[r]]).style.visibility =
				"hidden";
		}
	}
	for (let t = 0; t < gameStatus.length; t++) {
		if (gameStatus[t] !== "") {
			gameStatus[t] = "";
		}
	}
	spotsPlayed = [];
	player = "x";
	window.location.reload();
}

/* Computer Code */

function computerStart() {
	computer = true;
	document.getElementById("gametype").textContent = "Computer";
}

function computerPlayer(i) {
	let occurrences = gameStatus.reduce((a, v) => (v === "O" ? a + 1 : a), 0);
	switch (occurrences) {
		case 0:
			pickSpot1();
			break;
		case 1:
			pickSpot2();
			break;
		case 2:
			pickSpot3();
			break;
		case 3:
			pickSpot4();
			break;
		default:
	}
}

function pickSpot1() {
	randomPick();
}

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
						ospot(c);
						spotsPlayed.push(c);
					}
				}, 2000);
			} else if (c === xarray[0] || c === xarray[1]) {
				spotPicked = true;
				setTimeout(function () {
					if (gameStatus[b] === "O") {
						// call to make a random pick since above conditon was met
						randomPick();
					} else {
						ospot(b);
						spotsPlayed.push(b);
					}
				}, 2000);
			}
		}
	}
	if (spotPicked === false) {
		randomPick();
	}
}

function pickSpot3() {
	randomPick();
}

function pickSpot4() {
	randomPick();
}

function randomPick() {
	let pick = Math.floor(Math.random() * 9);
	let taken = spotsPlayed.find((p) => p === pick);
	if (typeof taken === "undefined") {
		setTimeout(function () {
			ospot(pick);
			spotsPlayed.push(pick);
		}, 2000);
	} else {
		randomPick();
	}
}
