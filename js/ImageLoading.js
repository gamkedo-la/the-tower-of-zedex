var playerFacingDown=document.createElement("img");
var playerFacingLeft=document.createElement("img");
var playerFacingRight=document.createElement("img");
var playerFacingUp=document.createElement("img");
var playerSprites=document.createElement("img");

var healthIcon=document.createElement("img");
var boomstickIcon=document.createElement("img");
var swordIcon=document.createElement("img");

var keyPickup=document.createElement("img");
var pickupIcons=document.createElement("img");



var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload=countLoadedImageAndLaunchIfReady;
	imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages() {

  var imageList = [
	{varName:playerFacingDown, theFile:"warrior_down.png"},
	{varName:playerFacingLeft, theFile:"warrior_left.png"},
	{varName:playerFacingRight, theFile:"warrior_right.png"},
	{varName:playerFacingUp, theFile:"warrior_up.png"},
	{varName:playerSprites, theFile:"playerSpriteSheet.png"},

	{varName:healthIcon, theFile:"health_icon.png"},
	{varName:boomstickIcon, theFile:"boomstick_icon.png"},
	{varName:swordIcon, theFile:"sword_icon.png"},
	{varName:pickupIcons, theFile:"pickupIcons.png"},
	
	{tileType:TILE_GROUND, theFile:"world_ground.png"},
	{tileType:TILE_WALL, theFile:"world_wall.png"},
	{tileType:TILE_CHEST, theFile:"chest.png"},
	{tileType:TILE_KEY, theFile:"pickup_key.png"},
	{tileType:TILE_DOOR, theFile:"world_door.png"},
	{tileType:TILE_SPIKE, theFile:"world_spike.png"},
	{tileType:TILE_POTION, theFile:"pickup_potion.png"},
	{tileType:TILE_AMMO, theFile:"pickup_ammo.png"},
	{tileType:TILE_MASTER_KEY, theFile:"pickup_masterKey.png"},

	{tileType:TILE_CRYPT_WALL1, theFile:"crypt_wall1.png"},
	{tileType:TILE_CRYPT_WALL2, theFile:"crypt_wall2.png"},
	{tileType:TILE_CRYPT_WALL3, theFile:"crypt_wall3.png"},
	{tileType:TILE_CRYPT_DAMAGE_FLOOR, theFile:"crypt_damageFloor.png"},
	];

  	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].tileType != undefined) {
		loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
		} else {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} // end of else
	} // end of for imageList

} // end of function loadImages
