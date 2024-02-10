// tuning constants
const PLAYER_MOVE_SPEED = 4.0;

function warriorClass() {
	// variables to keep track of position
	this.x = 75;
	this.y = 75;

	// boomstick shot list
	this.myShotList = [];
	this.totalShots = 3;

	this.facingDirection = "down";
	
	this.sx = 0;
	this.sy = 0;

	// keyboard hold state variables, to use keys more like buttons
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;

	this.ticks = 0;
	this.ticksUntilDamage;
	this.ticksUntilNextAnimationFrame;
	

	// key controls used for this
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.init = function(whichGraphic,whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}
	
	this.reset = function() {
	hudDisplay.currentHealth = hudDisplay.maxHealth;
		this.keysHeld = 0;
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++) {
				if( roomGrid[i] == TILE_PLAYER) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol = i%ROOM_COLS;
					this.homeX = tileCol * TILE_W + 0.5*TILE_W;
					this.homeY = tileRow * TILE_H + 0.5*TILE_H;
					roomGrid[i] = TILE_GROUND;
					console.log("removing player tile")
					break; // found it, so no need to keep searching 
				} // end of if
			} // end of for
		} // end of if position not saved yet
		
		this.x = this.homeX;
		this.y = this.homeY;

	} // end of reset

	this.swordAttack = function() {
		console.log("sword attack initiated");

		var attackX;
		var attackY;
		var attackW = TILE_W
		var attackH = TILE_H

		if(this.facingDirection == "down") {
			attackX = this.x - TILE_W/2;
			attackY = this.y + TILE_H/2;
			attackW = TILE_W*1.5;
		}
		if(this.facingDirection == "up") {
			attackX = this.x - TILE_W/2;
			attackY = this.y - TILE_H*1.5;
			attackW = TILE_W*1.5;
		}
		if(this.facingDirection == "left") {
			attackX = this.x - TILE_W*1.5;
			attackY = this.y - TILE_H;
			attackH = TILE_H*1.5;
		}
		if(this.facingDirection == "right") {
			attackX = this.x + TILE_W/2;
			attackY = this.y - TILE_H/2;
			attackH = TILE_H*1.5
		}

		colorRect(attackX, attackY, attackW, attackH, "white");
		swordSwing.play();

		// loop through enemy list and check if enemy overlaps hitbox
		for(var i = 0; i < enemyList.length; i++){
			if(	enemyList[i].x > attackX-TILE_W && 
				enemyList[i].x < attackX+TILE_W &&
				enemyList[i].y > attackY &&
				enemyList[i].y < attackY+TILE_H ){
					console.log(enemyList[i]+" has taken 1 damage.");
					console.log(enemyList[i]+" Health: "+enemyList[i].health);
					enemyList[i].health -= 1;
					if( enemyList[i].health < 1){
						enemyList[i].readyToRemove = true;
					}
				}
		}
		
	}


	this.boomStickShot = function(){
		if(hudDisplay.currentAmmo > 0){
			if(this.myShotList.length < this.totalShots){
				let tempShot = new BoomStickClass();
				tempShot.shootFrom(this);
				this.myShotList.push(tempShot);
				hudDisplay.currentAmmo -=1;
				boomstickFire.play();
			}
		}
		
	}
	
	this.removeBullet = function(){
		for(var i = this.myShotList.length - 1; i >= 0 ; i--){
			if(this.myShotList[i].readyToRemove){
				this.myShotList.splice(i,1);
			}
		}
	}
	
	this.handleEnemyCollision = function(){
		this.ticksUntilDamage = 10;
		this.ticks += 1;

		// BASIC SINGLE POINT COLLISION CHECK
		// NEED TO UPGRADE TO CHECK ALL EDGES/SIDES
		for(var i = 0; i < enemyList.length; i++){
			// console.log(enemyList[i])
			if(	this.x > enemyList[i].x &&
				this.x < enemyList[i].x + TILE_W &&
				this.y > enemyList[i].y &&
				this.y < enemyList[i].y + TILE_H ) 
			{
				console.log("Player and Enemy in collision")
				
				if(this.ticks >= this.ticksUntilDamage) {
					this.ticks = 0;
					hudDisplay.currentHealth -= 1;
					playerHurt.play();
				}
			}
		}
	}

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		this.removeBullet()

		if(this.keyHeld_North) {
			nextY -= PLAYER_MOVE_SPEED;
			this.myBitmap = playerFacingUp;
			this.sx = 0;
			
		}
		if(this.keyHeld_East) {
			nextX += PLAYER_MOVE_SPEED;
			this.myBitmap = playerFacingRight;
			this.sx = 32;
			
		}
		if(this.keyHeld_South) {
			nextY += PLAYER_MOVE_SPEED;
			this.myBitmap = playerFacingDown;
			this.sx = 64;
			
		}
		if(this.keyHeld_West) {
			nextX -= PLAYER_MOVE_SPEED;
			this.myBitmap = playerFacingLeft;
			this.sx = 96;
			
		}
				
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if( walkIntoTileIndex != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}
		
		switch( walkIntoTileType ) {
			case TILE_GROUND:
				this.handleEnemyCollision();
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GOAL:
				currentLevel += 1;
				loadLevel(level[currentLevel]);
				break;
			case TILE_DOOR:
				for(var i = 0; i<hudDisplay.inventory.length; i++){
					if(hudDisplay.inventory[i] == 3 || hudDisplay.inventory[i] == 4){
						hudDisplay.inventory[i] = 0;
						useKey.play();
						return;
					}
				}
				roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
				break;
			case TILE_MASTER_KEY:
				for(var i = 0; i<hudDisplay.inventory.length; i++){
					if(hudDisplay.inventory[i] == 0){
						hudDisplay.inventory[i] = 4;
						roomGrid[walkIntoTileIndex] = TILE_GROUND;
						pickup.play();
						return;
					}
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_KEY:
				for(var i = 0; i<hudDisplay.inventory.length; i++){
					if(hudDisplay.inventory[i] == 0){
						hudDisplay.inventory[i] = 3;
						roomGrid[walkIntoTileIndex] = TILE_GROUND;
						pickup.play();
						return;
					}
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_POTION:
				for(var i = 0; i<hudDisplay.inventory.length; i++){
					if(hudDisplay.inventory[i] == 0){
						hudDisplay.inventory[i] = 1;
						roomGrid[walkIntoTileIndex] = TILE_GROUND;
						pickup.play();
						return;
					}
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_AMMO:
				for(var i = 0; i<hudDisplay.inventory.length; i++){
					if(hudDisplay.inventory[i] == 0){
						hudDisplay.inventory[i] = 2;
						roomGrid[walkIntoTileIndex] = TILE_GROUND;
						pickup.play();
						return;
					}
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_CHEST:
				roomGrid[walkIntoTileIndex] = TILE_MASTER_KEY;
				
				break;
			case TILE_SPIKE:
				this.ticksUntilDamage = 5;
				this.ticks += 1;
				this.x = nextX;
				this.y = nextY;
				
				if(this.ticks >= this.ticksUntilDamage) {
					this.ticks = 0;
					hudDisplay.currentHealth -= 1
					playerHurt.play();
				}
				break;
			case TILE_CRYPT_DAMAGE_FLOOR:
				this.ticksUntilDamage = 5;
				this.ticks += 1;
				this.x = nextX;
				this.y = nextY;
				
				if(this.ticks >= this.ticksUntilDamage) {
					this.ticks = 0;
					hudDisplay.currentHealth -= 5
					playerHurt.play();
				}
				break;
			case TILE_WALL:
			default:
				// any other tile type number was found... do nothing, for now
				break;
			
		}

		// this.handleEnemyCollision();

		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();	
		}

	}


	this.drawPlayerAttackHitBoxes = function() {
		var attackX;
		var attackY;
		var attackW = TILE_W
		var attackH = TILE_H

		if(this.facingDirection == "down") {
			attackX = this.x - TILE_W/2;
			attackY = this.y + TILE_H/2;
			attackW = TILE_W*1.5;

		}
		if(this.facingDirection == "up") {
			attackX = this.x - TILE_W/2;
			attackY = this.y - TILE_H*1.5;
			attackW = TILE_W*1.5;
		}
		if(this.facingDirection == "left") {
			attackX = this.x - TILE_W*1.5;
			attackY = this.y - TILE_H;
			attackH = TILE_H*1.5;
		}
		if(this.facingDirection == "right") {
			attackX = this.x + TILE_W/2;
			attackY = this.y - TILE_H/2;
			attackH = TILE_H*1.5
		}
		canvasContext.strokeStyle = "white";
		canvasContext.lineWidth = 1;
		canvasContext.strokeRect(attackX, attackY, attackW, attackH);
	}


	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
		//canvasContext.drawImage(playerSprites, this.sx, this.sy, this.tileSize, this.tileSize, this.x, this.y)

		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}
	}

} // end of class