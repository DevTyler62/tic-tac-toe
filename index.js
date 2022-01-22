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

var one = document.getElementById("one");
let all = document.querySelectorAll(".slot");

console.log(all);

all.forEach((element) => element.addEventListener("click", getSelection));

function getSelection() {
	for (let i = 0; i <= 8; i++) {
		if (all[i].checked === true) {
			checkSelection(i);
		}
	}
}

function checkSelection(i) {
	console.log(i);
	let exists = gameStatus.find((e) => e === i);
	if (typeof exists == "number") {
		/* Do nothing as the number has already been selected */
	} else {
		gameStatus.push(i);
		handlePlayer(i);
	}
}

function handlePlayer(i) {
	console.log("handle player");
	if (player === "x") {
		xspot(i);
		player = "o";
	} else if (player === "o") {
		ospot(i);
		player = "x";
	}
}

/* marks the spot that was selected into a X */
function xspot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			console.log(xspots[j]);
			document.getElementById(xspots[j]).style.visibility = "visible";
			document.getElementById(ospots[j]).style.visibility = "hidden";
		}
	}
}
/* marks the spot that was selected into a O */
function ospot(i) {
	for (let j = 0; j <= 8; j++) {
		if (j === i) {
			console.log(ospots[j]);
			document.getElementById(xspots[j]).style.visibility = "hidden";
			document.getElementById(ospots[j]).style.visibility = "visible";
		}
	}
}
