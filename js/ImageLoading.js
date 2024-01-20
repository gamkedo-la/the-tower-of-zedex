var playerFacingDown=document.createElement("img");
var playerFacingLeft=document.createElement("img");
var playerFacingRight=document.createElement("img");
var playerFacingUp=document.createElement("img");

var healthIcon=document.createElement("img");
var boomstickIcon=document.createElement("img");
var swordIcon=document.createElement("img");

var keyPickup=document.createElement("img");

var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
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
    /*  
      enemy sprites HERE 
    */
    // {varName:keyPickup, theFile:"world_key.png"},

    {varName:healthIcon, theFile:"health_icon.png"},
    {varName:boomstickIcon, theFile:"boomstick_icon.png"},
    {varName:swordIcon, theFile:"sword_icon.png"},
    
    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL, theFile:"world_wall.png"},
    {tileType:TILE_GOAL, theFile:"world_goal.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    {tileType:TILE_SPIKE, theFile:"world_spike.png"}
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
