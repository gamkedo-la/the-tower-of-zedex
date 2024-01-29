// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();

var enemyList = [];

function moveEnemies() {
	for( var i = 0; i<enemyList.length; i++ ) {
		enemyList[i].move();
	}
	for(var i = enemyList.length - 1; i >= 0 ; i--){
		if(enemyList[i].readyToRemove){
			enemyList.splice(i,1);
		}
	}
}

function drawEnemies() {
	for( var i = 0; i<enemyList.length; i++ ) {
		enemyList[i].draw();
	}
}

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

		// WORKED OUT WITH CHRIS
	var enemyTypeFound = false;
	do { 
		enemyTypeFound = levelHasValue(TILE_ZOMBIE);
		if( enemyTypeFound ) {
			var zombie = new enemyClass();
			zombie.init( zombieSprites );
			enemyList.push(zombie);
		}
	} while (enemyTypeFound);

	do {
		enemyTypeFound = levelHasValue(TILE_GHOST);
		if( enemyTypeFound ) {
			var ghost = new ghostClass();
			ghost.init( zombieSprites ); // to do: no ghostSprites yet, but those will go here
			enemyList.push(ghost);
		}
	} while (enemyTypeFound);


	// OTHER SOLUTION
	// for(var i=0; i<roomGrid.length; i++) {
	// 	console.log("Searching for enemies...");

	// 	if(roomGrid[i] == TILE_ZOMBIE) { 
	// 		console.log("found ghost at index "+i);

	// 		var zombie = new enemyClass();
	// 		zombie.init( zombieSprites );
	//  		enemyList.push(zombie);
	// 		roomGrid[i] = 0;
	// 	}

	// 	if(roomGrid[i] == TILE_GHOST) { 
	// 		console.log("found ghost at index "+i);

	// 		var ghost = new ghostClass();
	//  		ghost.init();
	//  		enemyList.push(ghost);
	// 		roomGrid[i] = 0;
	// 	}
	// }



	initInput();  
}

function moveEverything() {
	
	if(hudDisplay.currentHealth < 1){
		p1.reset();
	}

	hudDisplay.checkInvisibility();
	p1.move();
	moveEnemies();
}

function drawEverything() {
	colorRect(0,0, canvas.width, canvas.height, "black")
	drawRoom();
	
	p1.draw();
	drawEnemies();

	hudDisplay.draw();
	p1.drawPlayerAttackHitBoxes();
}