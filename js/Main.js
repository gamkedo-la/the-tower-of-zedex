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
		if(enemyList[i].hurtTimeFreeze > 0) {
			enemyList[i].hurtTimeFreeze--;
		} else {
			enemyList[i].move();
		}
	}
	for(var i = enemyList.length - 1; i >= 0 ; i--){
		if(enemyList[i].readyToRemove){
			enemyList.splice(i,1);
		}
	}
}

function drawEnemies() {
	for( var i = 0; i<enemyList.length; i++ ) {
		if(enemyList[i].hurtTimeFreeze === undefined || enemyList[i].hurtTimeFreeze<=0 ||
				enemyList[i].hurtTimeFreeze % 4 <2) {
			enemyList[i].draw();
		}
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	loadImages();
	lineWrapCredits();
}

function spawnEnemiesAndPlay() {
	enemyList = [];
	p1.init(playerFacingUp, "Blue");

		// WORKED OUT WITH CHRIS
	var enemyTypeFound = false;
	do { 
		enemyTypeFound = levelHasValue(TILE_ZOMBIE);
		if( enemyTypeFound ) {
			var zombie = new zombieClass();
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
			turret.init( turretSprites ); 
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
            console.log("YOUR HEALTH IS ZERO! GAME OVER!");
            backgroundMusic.loopSong("GameOverMusic",GAME_OVER_MUSIC_VOLUME);
			p1.reset(); // so it has full health next game
            // fixme: make a game over screen? just go back to main menu for now
            gameState = "TITLE"; 
		}
		hudDisplay.checkInvisibility();
		p1.move();
		moveEnemies();
	}
}
function drawEverything() {

	colorRect(0,0, canvas.width, canvas.height, "black")

	if(gameState == "CREDITS") {
		drawCredits();
	} else if (gameState == "EDITOR"){
		drawRoom();
	} 
	else if (gameState == "TITLE"){
		canvasContext.drawImage(titlescreen, 0,0 );
		//printText(" The Tower of Zedex ", canvas.width/4, 300, 40, "white");
		printText(" press -P- to Play ", 280, 460, 16, "white");
		printText(" press -C- for Credits ", 280, 488, 16, "white");
		
	} else if (gameState == "PLAY"){
		drawRoom();
	
		p1.draw();
		drawEnemies();

		hudDisplay.draw();
		//p1.drawPlayerAttackHitBoxes();

	}
	
	canvasContext.drawImage(scanlineFilter, 0, 0);
}

function rectCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect2.left < rect1.right &&
        rect1.top < rect2.bottom &&
        rect2.top < rect1.bottom
      );
}

function pointInRect(x, y, rect){
    return  x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
}

/**
 * @param rect should be an object with left, right, top, bottom properties
 */
function tileCollisionCheck(rect) {
	let leftTile = Math.floor(rect.left / TILE_W),
	  rightTile = Math.floor(rect.right / TILE_H),
	  topTile = Math.floor(rect.top / TILE_W),
	  bottomTile = Math.floor(rect.bottom / TILE_H);
  
	let collisions = [];
  
	for (let i = leftTile; i <= rightTile; i++) {
	  for (let j = topTile; j <= bottomTile; j++) {
		collisions.push(roomTileToIndex(i, j));
	  }
	}
  
	return collisions;
  }

  creditsList = [
"Kyle Knutson: Project lead, core gameplay, environment art, level design, main pickups and inventory, animated character sprites (player, zombie, turrets), enemy AI, map editor, keys and ammo functionality, hazard tiles,", " ",
"John Fortune: Item icons with integration (spell scroll, speed potion, shield potion, invisibility potion), title input fix"," ",
"Christer \"McFunkypants\" Kaitila: Wall hugger, music integration, gamepad support, additional songs (menu, game over), player death"," ",
"Randy Tan Shaoxian: Game event messaging (system, display, colors, hookups)"," ",
"Marvin Chong: Level music"," ",
"Vince McKeown: Player projectiles, additional level design, spiked walls"," ",
"Hamza 'Hums' Sehavdic: Ghost sprite"," ",
"Victor Debone (javascripl): Input handler improvement, collision fixes"," ",
"Patrick McKeown: Sounds (doorlock, enemy hit, hinge sounds, scroll)"," ",
"Jason Timms: Treasure chest opening sound"," ",
"Chris DeLeon: Ghost spawn fix, collision fixes",
" ",
"== PRESS ANY KEY TO RETURN =="
  ];


function drawCredits() {
	colorRect(0,0, canvas.width, canvas.height, "black")
	var lineX = 60;
    var lineY = 30;
    var creditsSize = 19;
    var lineSkip = creditsSize+2;
    for(var i=0;i<creditsList.length;i++) {
		printText(creditsList[i], lineX, lineY, creditsSize, "white");
		lineY+=lineSkip;
	}
}

function lineWrapCredits() {
    const newCut = [];
    var maxLineChar = 75;
    var findEnd;

    for(let i = 0; i < creditsList.length; i++) {
      const currentLine = creditsList[i];
      for(let j = 0; j < currentLine.length; j++) {
        /*const aChar = currentLine[j];
        if(aChar === ":") {
          if(i !== 0) {
            newCut.push("\n");
          }

          newCut.push(currentLine.substring(0, j + 1));
          newCut.push(currentLine.substring(j + 2, currentLine.length));
          break;
        } else*/ if(j === currentLine.length - 1) {
          if((i === 0) || (i >= creditsList.length - 2)) {
            newCut.push(currentLine);
          } else {
            newCut.push(currentLine.substring(0, currentLine.length));
          }
        }
      }
    }

    const newerCut = [];
    for(var i=0;i<newCut.length;i++) {
      while(newCut[i].length > 0) {
        findEnd = maxLineChar;
        if(newCut[i].length > maxLineChar) {
          for(var ii=findEnd;ii>0;ii--) {
            if(newCut[i].charAt(ii) == " ") {
              findEnd=ii;
              break;
            }
          }
        }
        newerCut.push(newCut[i].substring(0, findEnd));
        newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
      }
    }

    creditsList = newerCut;
  }        
