// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();

var enemyList = [];

var TitleScreen = true;
var MapEditingMode = false;

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

function spawnEnemiesAndPlay() {
	enemyList = [];
	p1.init(playerFacingUp, "Blue");

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
}


function loadingDoneSoStartGame() {
	// these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
	setInterval(function() {
			moveEverything();
			drawEverything();
		}, 1000/framesPerSecond);

	initInput(); 
	setupTileButtons();
	//loadLevel(levelOne)
	
}

/*
function nextLevel() {
	levelNow++;
	if(levelNow > level.length) {
		levelNow = 0;
	}
	loadLevel(level[levelNow]);
}

*/

function moveEverything() {
	if(TitleScreen || MapEditingMode){
		return;
	}
	if(hudDisplay.currentHealth < 1){
		p1.reset();
	}
	console.log("moving everything")
	hudDisplay.checkInvisibility();
	p1.move();
	moveEnemies();
}

function drawEverything() {
	colorRect(0,0, canvas.width, canvas.height, "black")

	if (MapEditingMode){
		loadLevel(freshMap)
		drawRoom();
	} 
	else if (TitleScreen){
		printText(" The Tower of Zedex ", canvas.width/4, 300, 40, "white");
		printText(" press -P- to Play ", canvas.width/4, 360, 16, "grey");
		printText(" press -E- for Map Editing Mode ", canvas.width/4, 390, 16, "grey");
		
	} else {
		loadLevel(level[0])
		drawRoom();
	
		p1.draw();
		drawEnemies();

		hudDisplay.draw();
		p1.drawPlayerAttackHitBoxes();
	}
	
}