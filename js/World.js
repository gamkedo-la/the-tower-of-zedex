// world, room, and tile constants, variables
const ROOM_COLS = 25;
const ROOM_ROWS = 15;

var roomGrid =
	[	20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
		 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  2, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	  	20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,

	  //  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	  //  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	  // 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
	];

const TILE_W = 32;
const TILE_H = 32;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_SPIKE = 6;
const TILE_MASTER_KEY = 7;
const TILE_AMMO = 8;
const TILE_POTION = 9;
const TILE_CHEST = 10;
//		EMPTY_CHEST
//		SPIKE_WALL

const TILE_GHOST = 60;
const TILE_ZOMBIE = 61;
const TILE_WALL_HUGGER = 62;

const TILE_CRYPT_WALL1 = 20;
const TILE_CRYPT_WALL2 = 21;
const TILE_CRYPT_WALL3 = 22;
const TILE_CRYPT_DAMAGE_FLOOR = 23;

const TILE_GARDEN_WALL1 = 30;
const TILE_GARDEN_WALL2 = 31;
const TILE_GARDEN_WALL3 = 32;
const TILE_GRASS = 33;
const TILE_BUSH_TOP = 34;
const TILE_BUSH_BOTTOM = 35;
const TILE_GARDEN_WATER1 = 38;
const TILE_GARDEN_WATER2 = 39;

const TILE_TREE_TOPLEFT = 	40
const TILE_TREE_TOPRIGHT = 	41;
const TILE_TREE_MIDLEFT = 	42;
const TILE_TREE_MIDRIGHT = 	43;
const TILE_TREE_BOTLEFT = 	44;
const TILE_TREE_BOTRIGHT = 	45;






	//WORKED OUT WITH CHRIS
function levelHasValue(checkValue) {
	for(var i=0; i<roomGrid.length; i++) {
		if( roomGrid[i] == checkValue) {
			return true;
		}
	}
	return false;
}


function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
	 tileRow < 0 || tileRow >= ROOM_ROWS) {
	 document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
	 return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

// function tileTypeHasTransparency(checkTileType) {
//   return (checkTileType == TILE_GOAL ||
// 		  checkTileType == TILE_KEY ||
// 		  checkTileType == TILE_DOOR);
// }

function loadLevel(level) {
  roomGrid = level.slice();
  if(MapEditingMode == false) {
		spawnEnemiesAndPlay();
  }
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) {
	tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
	for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) {

		var tileTypeHere = roomGrid[ tileIndex ];
		var useImg = tilePics[tileTypeHere];
		var spriteX = tilePics[tileTypeHere].locX;
		var spriteY = tilePics[tileTypeHere].locY;
		var spriteWidth = tilePics[tileTypeHere].width;
		var spriteHeight = tilePics[tileTypeHere].height;
		var spriteOffSetX = tilePics[tileTypeHere].offSetX + tileLeftEdgeX;
		var spriteOffSetY = tilePics[tileTypeHere].offSetY + tileTopEdgeY;

		if(tilePics[tileTypeHere] != null) {
			
			// canvasContext.drawImage(useImg, tileLeftEdgeX, tileTopEdgeY);
			// canvasContext.drawImage(tilePics[tileTypeHere], tilePics[tileTypeHere].locX, tilePics[tileTypeHere].locY, 32,32, tileLeftEdgeX, tileTopEdgeY, 32,32 )
			canvasContext.drawImage(useImg, spriteX, spriteY, spriteWidth, spriteHeight, spriteOffSetX, spriteOffSetY, spriteWidth, spriteHeight)

		} else {
			canvasContext.fillStyle = "yellow";
			canvasContext.fillRect(tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H);
			canvasContext.fillStyle = "black";
			canvasContext.fillText(""+tileTypeHere,tileLeftEdgeX+TILE_W*0.25, tileTopEdgeY+TILE_H*0.5);
		}
		tileIndex++;
		tileLeftEdgeX += TILE_W;
	} 

	tileTopEdgeY += TILE_H;
	
  }    
}
