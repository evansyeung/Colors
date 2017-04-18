var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var rgbDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var buttonReset = document.querySelector("#reset");
var buttonModes = document.querySelectorAll(".mode");

init();

buttonReset.addEventListener("click", reset);

//*****************************************************************

//Function to change the color of squares to the winning color
function changeColors() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.background = pickedColor;
	}
}

//Function to pick a random color from our array
function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
	var temp = [];
	for(var i = 0; i < num; i++) {	
		temp.push(randomColor());
	}
	return temp;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	rgbDisplay.textContent = pickedColor;

	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		}
		else {
			// turn display off for last 3 squares in easy mode
			squares[i].style.display = "none";
		}
	}

	h1.style.background = "steelblue";
	message.textContent = "";
	buttonReset.textContent = "New Colors";
}

//Mode button event listeners
function setUpModeButtons() {
	for (var i = 0; i < buttonModes.length; i++) {
		buttonModes[i].addEventListener("click", function(){
			buttonModes[0].classList.remove("selected");
			buttonModes[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6
			reset();
		});
	}
}

//Sqaure button event listeners
function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			if(clickedColor === pickedColor) {
				message.textContent = "Correct";
				h1.style.background = clickedColor;
				buttonReset.textContent = "Play Again?";
				changeColors();
			}
			else {
				message.textContent = "Try Again";
				this.style.background = "#232323";
			}
		});
	}
}

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}