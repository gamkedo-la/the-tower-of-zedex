
function EnemyClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.reset();
  }
  
  this.reset = function() {} 


  
  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingUp;
    }
    if(this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingRight;
    }
    if(this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingDown;
    }
    if(this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingLeft;
    }
        
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
    
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
        break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_SPIKE:
        this.x = nextX;
        this.y = nextY;
        if(!healthDisplay.isInvincible){
          healthDisplay.currentHealth--;
          healthDisplay.isInvincible=true;
        }
        else{
          console.log("walking through spikes when you're invincible!")
        }
        
        
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
      
    }
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
  }

} // end of class