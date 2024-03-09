var titlescreen=document.createElement("img");
var scanlineFilter=document.createElement("img");
var gardenSpriteSheet=document.createElement("img");

var playerFacingDown=document.createElement("img");
var playerFacingLeft=document.createElement("img");
var playerFacingRight=document.createElement("img");
var playerFacingUp=document.createElement("img");
var playerSprites=document.createElement("img");

var zombieSprite1=document.createElement("img");
var zombieSprite2=document.createElement("img");
var ghostSprite1=document.createElement("img");
var ghostSprite2=document.createElement("img");
var wallHuggerSprite1=document.createElement("img");
var wallHuggerSprite2=document.createElement("img");
var turretSprite1=document.createElement("img");
var turretSprite2=document.createElement("img");


var healthIcon=document.createElement("img");
var boomstickIcon=document.createElement("img");
var swordIcon=document.createElement("img");

var bullet0=document.createElement("img");
var bullet1=document.createElement("img");
var bullet2=document.createElement("img");


//var keyPickup=document.createElement("img");
//var pickupIcons=document.createElement("img");
var pickupPotion=document.createElement("img");
var pickupAmmo=document.createElement("img");
var pickupKey=document.createElement("img");
var pickupMasterKey=document.createElement("img");
var pickupSpellScroll=document.createElement("img");


var tilePics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}
function beginLoadingImage(imgVar, fileName, locX, locY, width, height, offSetX, offSetY) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
	imgVar.locX = locX;
	imgVar.locY = locY;
	if (typeof width !== 'undefined') {
		imgVar.width = width;
	  }
	imgVar.height = height;
	imgVar.offSetX = offSetX;
	imgVar.offSetY = offSetY;
	//console.log(imgVar.locX)
}
function loadImageForTileCode(tileCode, fileName, locX, locY, width, height, offSetX, offSetY)  {
	tilePics[tileCode] = document.createElement("img");
	beginLoadingImage(tilePics[tileCode], fileName, locX, locY, width, height, offSetX, offSetY);	
}


function loadImages() {

  	var imageList = [
		{varName:titlescreen, theFile:"titlescreen-ttoz.png"},
		{varName:scanlineFilter, theFile:"scanline-filter.png"},
		{varName:gardenSpriteSheet, theFile:"GardenSpriteSheet.png"},
		

		{varName:playerFacingDown, theFile:"warrior_down.png"},
		{varName:playerFacingLeft, theFile:"warrior_left.png"},
		{varName:playerFacingRight, theFile:"warrior_right.png"},
		{varName:playerFacingUp, theFile:"warrior_up.png"},
		{varName:playerSprites, theFile:"playerSpriteSheet.png"},

		{varName:zombieSprite1, theFile:"zombieSprite_1.png"},
		{varName:zombieSprite2, theFile:"zombieSprite_2.png"},
		{varName:ghostSprite1, theFile:"ghostSprite_1.png"},
		{varName:ghostSprite2, theFile:"ghostSprite_2.png"},
		{varName:wallHuggerSprite1, theFile:"wall_hugger_1.png"},
		{varName:wallHuggerSprite2, theFile:"wall_hugger_2.png"},
                {varName:turretSprite1, theFile:"turret_sprite_1.png"},
                {varName:turretSprite2, theFile:"turret_sprite_2.png"},

		{varName:healthIcon, theFile:"health_icon.png"},
		{varName:boomstickIcon, theFile:"boomstick_icon.png"},
		{varName:swordIcon, theFile:"sword_icon.png"},

		{varName:bullet0, theFile:"boomstickBullet_0.png"},
		{varName:bullet1, theFile:"boomstickBullet_1.png"},
		{varName:bullet2, theFile:"boomstickBullet_2.png"},

		//{varName:pickupIcons, theFile:"pickupIcons.png"},
		{varName:pickupPotion, theFile:"pickup_potion.png"},
		{varName:pickupAmmo, theFile:"pickup_ammo.png"},
		{varName:pickupKey, theFile:"pickup_key.png"},
		{varName:pickupMasterKey, theFile:"pickup_masterKey.png"},
		{varName:pickupSpellScroll, theFile:"pickup_spell_scroll.png"},
		
		{tileType:TILE_GROUND, theFile:"world_ground.png", 		locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_WALL, theFile:"world_wall.png", 			locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_GOAL, theFile:"world_stairs.png", 		locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_KEY, theFile:"pickup_key.png", 			locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_DOOR, theFile:"world_door.png", 			locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_SPIKE, theFile:"world_spike.png", 		locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_POTION, theFile:"pickup_potion.png", 	locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_AMMO, theFile:"pickup_ammo.png", 		locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_MASTER_KEY, theFile:"pickup_masterKey.png", 	locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_CHEST, theFile:"chest.png", 					locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_SPIKE_WALL, theFile:"world_spike_wall.png", 					locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_FREEZE_SCROLL, theFile:"pickup_spell_scroll.png", 					locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},

		{tileType:TILE_CRYPT_WALL1, theFile:"crypt_wall1.png", 				locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_CRYPT_WALL2, theFile:"crypt_wall2.png", 				locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_CRYPT_WALL3, theFile:"crypt_wall3.png", 				locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType:TILE_CRYPT_DAMAGE_FLOOR, theFile:"crypt_damageFloor.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},

		//Row 1: GardenSpriteSheet
		{tileType: TILE_GARDEN_WALL1,               theFile: "GardenSpriteSheet.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_GARDEN_WALL2,     			theFile: "GardenSpriteSheet.png", locX: 32, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_GARDEN_WALL3,               theFile: "GardenSpriteSheet.png", locX: 64, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_GRASS,       				theFile: "GardenSpriteSheet.png", locX: 96, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_BUSH_TOP,      				theFile: "GardenSpriteSheet.png", locX: 128, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_BUSH_BOTTOM,       			theFile: "GardenSpriteSheet.png", locX: 160, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		//OPEN
		//OPEN
		{tileType: TILE_GARDEN_WATER1,         		theFile: "GardenSpriteSheet.png", locX: 256, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_GARDEN_WATER2,             	theFile: "GardenSpriteSheet.png", locX: 288, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},

		//Row 2: GardenSpriteSheet
		{tileType: TILE_TREE_TOPLEFT,          	theFile: "GardenSpriteSheet.png", locX:  0, locY: 32, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TREE_TOPRIGHT,         	theFile: "GardenSpriteSheet.png", locX: 32, locY: 32, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TREE_MIDLEFT,          	theFile: "GardenSpriteSheet.png", locX: 64, locY: 32, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TREE_MIDRIGHT,       	theFile: "GardenSpriteSheet.png", locX: 96, locY: 32, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TREE_BOTLEFT,       	theFile: "GardenSpriteSheet.png", locX: 128, locY: 32, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TREE_BOTRIGHT,       	theFile: "GardenSpriteSheet.png", locX: 160, locY: 128, width: 32, height: 32, offSetX: 0, offSetY: 0},

	    	//Enemy sprites for tile map editor
		{tileType: TILE_GHOST,          	theFile: "ghostSprite_1.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_ZOMBIE,          	theFile: "zombieSprite_1.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
	    {tileType: TILE_WALL_HUGGER,          	theFile: "wall_hugger_1.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		{tileType: TILE_TURRET,          	theFile: "turret_sprite_1.png", locX:  0, locY: 0, width: 32, height: 32, offSetX: 0, offSetY: 0},
		//OPEN
		//OPEN
		//OPEN
		//OPEN

	];

  	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].tileType != undefined) {
		loadImageForTileCode( 
			imageList[i].tileType, 
			imageList[i].theFile, 
			imageList[i].locX, 
			imageList[i].locY, 
			imageList[i].width, 
			imageList[i].height, 
			imageList[i].offSetX, 
			imageList[i].offSetY);

			console.log(imageList[i].tileType, 
				imageList[i].theFile, 
				imageList[i].locX, 
				imageList[i].locY, 
				imageList[i].width, 
				imageList[i].height, 
				imageList[i].offSetX, 
				imageList[i].offSetY)

		} else {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} // end of else
	} // end of for imageList

} // end of function loadImages

