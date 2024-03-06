// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();

const EnemyType = Object.freeze({ 
    UNKNOWN: 0, 
    ZOMBIE: 1,
    GHOST: 2,
    WALL_HUGGER: 3,
    TURRET: 4
}); 
var enemyList = [];

var gameState = "TITLE"; // TITLE, EDITOR, PLAY, GAMEOVER
// var TitleScreen = true;
// var MapEditingMode = false;


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
			zombie.init( zombieSprite1 );
			enemyList.push(zombie);
		}
	} while (enemyTypeFound);

	do {
		enemyTypeFound = levelHasValue(TILE_GHOST);
		if( enemyTypeFound ) {
			var ghost = new ghostClass();
			ghost.init( ghostSprite1 ); 
			enemyList.push(ghost);
		}
	} while (enemyTypeFound);

	do {
		enemyTypeFound = levelHasValue(TILE_WALL_HUGGER);
		if( enemyTypeFound ) {
			var hug = new wallHuggerClass();
			hug.init( wallHuggerSprite1 ); 
			enemyList.push(hug);
		}
	} while (enemyTypeFound);

        do {
		enemyTypeFound = levelHasValue(TILE_TURRET);
		if( enemyTypeFound ) {
			var turret = new turretClass();
			turret.init( turretSprite1 ); 
			enemyList.push(turret);
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
	
}



function moveEverything() {
	if(gameState == "PLAY"){
		
		if(hudDisplay.currentHealth < 1){
			p1.reset();
		}
		hudDisplay.checkInvisibility();
		p1.move();
		//moveEnemies();
	}
}
function drawEverything() {

	colorRect(0,0, canvas.width, canvas.height, "black")

	if (gameState == "EDITOR"){
		drawRoom();
	} 
	else if (gameState == "TITLE"){
		canvasContext.drawImage(titlescreen, 0,0 );
		//printText(" The Tower of Zedex ", canvas.width/4, 300, 40, "white");
		printText(" press -P- to Play ", 280, 460, 16, "white");
		printText(" press -E- for Map Editing Mode ", 280, 488, 16, "white");
		
	} else if (gameState == "PLAY"){
		drawRoom();
	
		p1.draw();
		drawEnemies();

		hudDisplay.draw();
		p1.drawPlayerAttackHitBoxes();

	}
	
	canvasContext.drawImage(scanlineFilter, 0, 0);
}
