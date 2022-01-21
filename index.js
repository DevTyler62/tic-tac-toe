var gameStart = "x";

var one = document.getElementById("onetest");

one.addEventListener("click", () => {
	var checked = one.checked;
	console.log(checked);

	if (checked === true) {
		document.getElementById("x").style.visibility = "visible";
		document.getElementById("o").style.visibility = "hidden";
	} else {
		document.getElementById("o").style.visibility = "visible";
		document.getElementById("x").style.visibility = "hidden";
	}
});
