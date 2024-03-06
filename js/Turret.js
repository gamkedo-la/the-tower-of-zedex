const TICKS_TO_WAIT_AFTER_SHOT	= 36;
const TURRET_MAX_HEALTH	= 4;
const TURRET_DAMAGE = 10;


 
function turretClass() {
	this.enemyType = EnemyType.TURRET;
	
	this.x = 0;
	this.y = 0;

	// Shooting
	this.myShotList =           [];
	this.ticksUntilCanShoot =    0;
	
	// Stats
	this.readyToRemove =    false;
	this.health =               0;

        // Direction
	this.direction =  'SOUTH';
	this.distanceToFocus = 10000;
	this.focusPlayer = false;

	// Animation stuff
	this.sprite;
	this.frameIndex =      0;
	this.tickCount =       0;
	this.ticksPerFrame =  15;


	this.init = function( enemyPic ) {
		this.health = TURRET_MAX_HEALTH;
		this.readyToRemove = false;
		this.sprite = enemyPic;
		this.reset();
	}

	this.reset = function(resetX, resetY) {

		for(var i=0; i<roomGrid.length; i++) {
			if( roomGrid[i] == TILE_TURRET) {
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol = i%ROOM_COLS;
				this.homeX = tileCol * TILE_W + 0.5*TILE_W;
				this.homeY = tileRow * TILE_H + 0.5*TILE_H;
				roomGrid[i] = TILE_GROUND;
				break; // found it, so no need to keep searching 
			} // end of if
		}
		this.x = this.homeX;
		this.y = this.homeY;

		this.health =   TURRET_MAX_HEALTH;
		this.readyToRemove =  false;
	}


    this.enemyTypeName = function() {
        return Object.keys(EnemyType)[this.enemyType];
    }

	this.changeDirection = function(direction) {
		if( direction != undefined ) {
			this.direction = direction;
			return;
		}
		var randomDirection = Math.ceil(Math.random()*4);
		
		if (randomDirection == 1)		{this.direction = 'NORTH'}
		else if (randomDirection == 2)	{this.direction = 'EAST'}
		else if (randomDirection == 3)	{this.direction = 'SOUTH'}
		else if (randomDirection == 4)	{this.direction = 'WEST'}
		else { 
			console.log('random direction error', randomDirection, "default direction to SOUTH");
			this.direction = 'SOUTH';
		}
	}

		
        // move here means to update the turret this frame, which includes finding out where the player is,
        // facing the direction the player is at, and only firing if the player is right in its line of fire.
	this.move = function() {
		this.removeBullet();
		this.ticksUntilCanShoot = Math.max(0, this.ticksUntilCanShoot - 1);
		
		// working on a chase movement pattern
		if( Math.abs(this.x - p1.x) <= this.distanceToFocus ) {
			this.focusPlayer = true;
		} else { this.focusPlayer = false; }

		if( this.focusPlayer == true ) {
	
                        // Change direction to face player

			// Compare the magnitudes of the vertical and horizontal distance between
			// turret and player.
			// If vertical distance is more, then determine if it is NORTH or SOUTH.
			// Same for horizontal distance.
			var verDiff = p1.y - this.y;
			var horDiff = p1.x - this.x;
			if( Math.abs(verDiff) >= Math.abs(horDiff) ) {
				if( verDiff < 0) {
					this.changeDirection('NORTH');
				} else {
					this.changeDirection('SOUTH');
				}
			} else {
				if( horDiff < 0) {
					this.changeDirection('WEST');
				} else {
					this.changeDirection('EAST');
				}
			}

                        // If not on cooldown and player is right in its line of fire, then fire
                        if( this.ticksUntilCanShoot <= 0 &&
			    (((this.direction === 'NORTH' || this.direction === 'SOUTH')
			      && Math.abs(p1.x - this.x) < 32) ||
		             ((this.direction === 'EAST' || this.direction === 'WEST')
			      && Math.abs(p1.y - this.y) < 32))) {
				this.boomStickShot();
                        }
	
		}

		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();	
		}
		
	}

	this.boomStickShot = function(){
		let tempShot = new boomStickClass(true, TURRET_DAMAGE);
		tempShot.shootFrom(this);
		this.myShotList.push(tempShot);
		boomstickFire.play();
		this.ticksUntilCanShoot = TICKS_TO_WAIT_AFTER_SHOT;
	}

	this.removeBullet = function(){
		for(var i = this.myShotList.length - 1; i >= 0 ; i--){
			if(this.myShotList[i].readyToRemove){
				this.myShotList.splice(i,1);
			}
		}
	}

	this.draw = function() {
		// drawRect(this.x, this.y, 32,32, 3, 'green');

		this.tickCount++;
		if(this.tickCount == this.ticksPerFrame){
			this.tickCount = 0;
			if(this.sprite == turretSprite1){
				this.sprite = turretSprite2;
			} else { this.sprite = turretSprite1 }
		}
		
		canvasContext.drawImage( this.sprite, this.x, this.y );
		colorRect(this.x, this.y, 5,5, "blue");

		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}
	}

	function detectAABBCollision(playerX, enemyX, playerY, enemyY){
		if(	playerX < enemyX + TILE_W &&
			playerX + TILE_W > enemyX &&
			playerY < enemyY + TILE_H &&
			playerY + TILE_H > enemyY ) 
		{
			console.log("collision DETECTED");
		}

	}

	


}
