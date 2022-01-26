var player = "x";
var gameStatus = [];
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

// var xwins = [
// 	["xone", "xtwo", "xthree"],
// 	["xfour", "xfive", "xsix"],
// 	["xseven", "xeight", "xnine"],
// 	["xone", "xfive", "xseven"],
// 	["xtwo", "xsix", "xeight"],
// 	["xthree", "xseven", "xnine"],
// 	["xone", "xfive", "xnine"],
// 	["xthree", "xfive", "xseven"],
// ];

var owins = [
	["oone", "otwo", "othree"],
	["ofour", "ofive", "osix"],
	["oseven", "oeight", "onine"],
	["oone", "ofive", "oseven"],
	["otwo", "osix", "oeight"],
	["othree", "oseven", "onine"],
	["oone", "ofive", "onine"],
	["othree", "ofive", "oseven"],
];

var xwins = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

var xselections = [];
var oselections = [];

console.log(xwins);
console.log(owins);

var one = document.getElementById("one");
let all = document.querySelectorAll(".slot");

console.log(all);

all.forEach((element) => element.addEventListener("click", getSelection));
/* Get the spot that user selected */
function getSelection() {
	for (let i = 0; i <= 8; i++) {
		if (all[i].checked === true) {
			checkSelection(i);
		}
	}
}
/* Checks the spot that the user has selected */
function checkSelection(i) {
	// console.log(i);
	let exists = gameStatus.find((e) => e === i);
	if (typeof exists == "number") {
		/* Do nothing as the number has already been selected */
	} else {
		gameStatus.push(i);
		handlePlayer(i);
	}
}
/* Handles the player change of the game */
function handlePlayer(i) {
	if (player === "x") {
		xspot(i);
		checkIfPlayerWon();
		player = "o";
	} else if (player === "o") {
		ospot(i);
		/*Check if player won */
		player = "x";
	}
}

/* marks the spot that was selected into a X */
function xspot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			// console.log(xspots[j]);
			document.getElementById(xspots[j]).style.visibility = "visible";
			document.getElementById(ospots[j]).style.visibility = "hidden";
			xselections.push("X");
			// console.log(xselections);
		}
	}
}
/* marks the spot that was selected into a O */
function ospot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			// console.log(ospots[j]);
			document.getElementById(xspots[j]).style.visibility = "hidden";
			document.getElementById(ospots[j]).style.visibility = "visible";
			oselections.push(ospots[j]);
			// console.log(oselections);
		}
	}
}

function checkIfPlayerWon() {
	for (let p = 0; p <= 7; p++) {
		const winCondition = xwins[p];
		// console.log(winCondition);
		// console.log(xselections[winCondition[0]]);
		let a = xselections[winCondition[0]];
		let b = xselections[winCondition[1]];
		let c = xselections[winCondition[2]];
		console.log(a);
		console.log(b);
		console.log(c);
		if (
			typeof a === "undefined" ||
			typeof b === "undefined" ||
			typeof c === "undefined"
		) {
			continue;
		}
		if (a === b && b === c) {
			console.log("X has won the game");
		}
	}
	// let j = 0;
	// for (let k = 0; k < xselections.length; k++) {
	// 	for (let p = 0; p < xwins.length; p++) {
	// 		let check1 = xwins[p][0].includes(xselections[j]);
	// 		console.log(check1);
	// 		if (check1 == true) {
	// 			let check2 = xwins[p][1].includes(xselections[j + 1]);
	// 			console.log(check2);
	// 			if (check2 == true) {
	// 				let check3 = xwins[p][2].includes(xselections[j + 2]);
	// 				console.log(check3);
	// 			}
	// 		}
	// 	}
	// }
}
