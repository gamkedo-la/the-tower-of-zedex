// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var zombie1 = new enemyClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	loadImages();
}

function loadingDoneSoStartGame() {
	// these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
	setInterval(function() {
			moveEverything();
			drawEverything();
		}, 1000/framesPerSecond);
	
	p1.init(playerFacingDown, "Blue");
	zombie1.init( zombieSprites );
	
	initInput();  
}

function moveEverything() {
	
	if(hudDisplay.currentHealth < 1){
		p1.reset();
	}

	hudDisplay.checkInvisibility();
	p1.move();
	zombie1.move();
}

function drawEverything() {
	colorRect(0,0, canvas.width, canvas.height, "black")
	drawRoom();
	
	p1.draw();
	zombie1.draw();

	hudDisplay.draw();
}