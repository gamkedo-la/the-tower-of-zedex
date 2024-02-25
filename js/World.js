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

const TILE_GHOST = 100;
const TILE_ZOMBIE = 101;
const TILE_WALL_HUGGER = 102;

// const TILE_CRYPT_WALL1 = 20;
// const TILE_CRYPT_WALL2 = 21;
// const TILE_CRYPT_WALL3 = 22;
const TILE_CRYPT_DAMAGE_FLOOR = 23;




const TILE_CHEST_OPEN = 			12;

const TILE_MASTERDOOR_FACING_DOWN =	14;
const TILE_MASTERDOOR_FACING_UP =	15;
const TILE_MASTERDOOR_FACING_LEFT =	16;
const TILE_MASTERDOOR_FACING_RIGHT=	17;
const TILE_BRIDGE =					18;
//OPEN

const TILE_DOOR_FACING_DOWN =		20;
const TILE_DOOR_FACING_UP =			21;
const TILE_DOOR_FACING_LEFT = 		22;
const TILE_DOOR_FACING_RIGHT =		23;
const TILE_BLOCK =					24;
//OPEN
//OPEN
//OPEN
//OPEN
//OPEN

const TILE_CRYPT_WALL1 =	30;
const TILE_CRYPT_WALL2 = 	31;
const TILE_CRYPT_WALL3 =	32;
const TILE_SKULLS =			33;
//OPEN
//OPEN
//OPEN
//OPEN
const TILE_CRYPT_DAMAGE_FLOOR1 = 38;
const TILE_CRYPT_DAMAGE_FLOOR2 = 39;

const TILE_GARDEN_WALL1 = 40;
const TILE_GARDEN_WALL2 = 41;
const TILE_GARDEN_WALL3 = 42;
const TILE_GRASS =	43;
const TILE_BUSH_TOP =	44;
const TILE_BUSH_BOTTOM = 45;
//OPEN
//OPEN
const TILE_GARDEN_WATER1 = 48;
const TILE_GARDEN_WATER2 = 49;

const TILE_TREE_TOPLEFT = 	50;
const TILE_TREE_TOPRIGHT = 	51;
const TILE_TREE_MIDLEFT = 	52;
const TILE_TREE_MIDRIGHT =	53;
const TILE_TREE_BOTLEFT =	54;
const TILE_TREE_BOTRIGHT =	55;
//OPEN
//OPEN
//OPEN
//OPEN

const TILE_UNDERWORLD_WALL1 = 60;
const TILE_UNDERWORLD_WALL2 = 61;
const TILE_UNDERWORLD_WALL3 = 62;
//OPEN
//OPEN
//OPEN
//OPEN
//OPEN
const TILE_LAVA1 = 68;
const TILE_LAVA2 = 69;



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

		if(tilePics[tileTypeHere] != null) {
			canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
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