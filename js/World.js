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

const TILE_GHOST = 8;
const TILE_ZOMBIE = 9;

const TILE_CRYPT_WALL1 = 20;
const TILE_CRYPT_WALL2 = 21;
const TILE_CRYPT_WALL3 = 22;
const TILE_CRYPT_DAMAGE_FLOOR = 23;




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
  console.log("level is being loaded!");
  roomGrid = level.slice();
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