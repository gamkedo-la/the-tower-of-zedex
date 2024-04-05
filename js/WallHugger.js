// wall hugger enemy
// traces around the walls it finds

function wallHuggerClass() {
    this.enemyType = EnemyType.WALL_HUGGER;
	
	this.x = 0;
	this.y = 0;
	this.width = 32;
	this.height = 32;
	this.rect = {
		left: this.x,
		right: this.x + this.width,
		top: this.y,
		bottom: this.y + this.height
	}
	this.speed = 1;
	
	// Stats
	this.readyToRemove =  false;
	this.maxHealth =      9999999; // invulnerable
	this.health =         9999999;
	this.attackDamage =   2;
	this.ticksToFreeze = 0;

	// Direction
	this.walkNorth =  true;
	this.walkEast =   false;
	this.walkSouth =  false;
	this.walkWest =   false;

	// Animation stuff
	this.sprite;
	this.frameIndex =     0;
	this.tickCount =      0;
	this.ticksPerFrame =  5;

	this.init = function( enemyPicUnused ) {
		this.sprite = wallHuggerSprite1;
        this.reset();
	}

	this.reset = function(resetX, resetY) {

        for(var i=0; i<roomGrid.length; i++) {
			if( roomGrid[i] == TILE_WALL_HUGGER) {
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol = i%ROOM_COLS;
				this.homeX = tileCol * TILE_W;
				this.homeY = tileRow * TILE_H;
				roomGrid[i] = TILE_CRYPT_WALL1; // TILE_GROUND; (since it is inside the wall)
                console.log("spawning a wall hugger at "+this.homeX+","+this.homeY);
				break; // found it, so no need to keep searching 
			} // end of if
		}
		this.x = this.homeX;
		this.y = this.homeY;
		this.rect = {
			left: this.x,
			right: this.x + this.width,
			top: this.y,
			bottom: this.y + this.height
		}

		this.health =   this.maxHealth;
		this.readyToRemove =  false;
	}

    this.enemyTypeName = function() {
        return Object.keys(EnemyType)[this.enemyType];
    }

	this.move = function() {
		if (this.ticksToFreeze > 0) {
			this.ticksToFreeze--;
			return;
		}

		var nextX = this.x;
		var nextY = this.y;

		var standingOnTileType = roomGrid[getTileIndexAtPixelCoord(nextX,nextY)];
        //if (standingOnTileType) console.log("wallhugger is standing on a "+standingOnTileType+" at "+this.x+","+this.y);

        if (this.walkNorth) nextY -= this.speed;
        if (this.walkSouth) nextY += this.speed;
        if (this.walkEast) nextX += this.speed;
        if (this.walkWest) nextX -= this.speed;

		var walkIntoTileType = roomGrid[getTileIndexAtPixelCoord(nextX,nextY)];
        //if (walkIntoTileType) console.log("wallhug about to hit tile "+walkIntoTileType);

        if (!walkIntoTileType) {
            //console.log("wallhugger sees floor at "+nextX+","+nextY+" - changing directions!");
            // floor ahead! try another way
            if (this.walkNorth) { this.walkNorth=false; this.walkEast=true; }
            else if (this.walkEast) { this.walkEast=false; this.walkSouth=true; }
            else if (this.walkSouth) { this.walkSouth=false; this.walkWest=true; }
            else if (this.walkWest) { this.walkWest=false; this.walkNorth=true; }
        } else {
            // keep going - there is more wall up ahead
            this.x = nextX;
            this.y = nextY;
        }
		
	}

	this.draw = function() {
		if (this.ticksToFreeze <= 0) {
			this.tickCount++;
			if(this.tickCount == this.ticksPerFrame){
				this.tickCount = 0;
				if(this.sprite == wallHuggerSprite1){
					this.sprite = wallHuggerSprite2;
				} else { this.sprite = wallHuggerSprite1 }
			}
		
			if (this.walkNorth) this.rotation = 0;
			if (this.walkEast) this.rotation = 90 * (Math.PI/180);
			if (this.walkSouth) this.rotation = 180 * (Math.PI/180);
			if (this.walkWest) this.rotation = 270 * (Math.PI/180);
		}
		
        colorRect(this.x, this.y, this.width, this.height);
        drawBitmapCenteredAtLocationWithRotation(this.sprite,this.x,this.y,this.rotation);
        // unrotated, works great:
        // canvasContext.drawImage( this.sprite, this.x-16, this.y-16 ); // sprite is centered on its xy
	}

	
	this.freeze = function(ticksToFreeze) {
		this.ticksToFreeze = ticksToFreeze;
	}
	


}
