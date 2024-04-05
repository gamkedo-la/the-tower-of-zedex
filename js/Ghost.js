
function ghostClass() {
	this.enemyType = EnemyType.GHOST;
	
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
	this.speed = 6.0;
	
	// Stats
	this.readyToRemove =    false;
	this.maxHealth =      2;
	this.health =         0;
	this.attackDamage =   3;
	this.ticksToFreeze = 0;

	// Direction
	this.direction =  'south';
	this.walkNorth =  false;
	this.walkEast =   false;
	this.walkSouth =  true;
	this.walkWest =   false;

	// Move frequency
	this.ticksFromLastMovement =	0;
	this.ticksUntilNextMovement =	2;
	this.ticksFromLastDirectionChange = 0;
	this.ticksUntilDirectionChange = 40;

	// Animation stuff
	this.sprite;
	this.frameIndex =      0;
	this.tickCount =       0;
	this.ticksPerFrame =  10;

	this.init = function( enemyPic ) {
		this.health = this.maxHealth;
		this.readyToRemove = false;
		this.sprite = enemyPic;
		this.reset();
	}

	this.reset = function(resetX, resetY) {

		for(var i=0; i<roomGrid.length; i++) {
			if( roomGrid[i] == TILE_GHOST) {
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

	this.changeDirection = function() {
		var randomDirection = Math.ceil(Math.random()*4);
		
		if (randomDirection == 1)		{this.direction = 'north'}
		else if (randomDirection == 2)	{this.direction = 'east'}
		else if (randomDirection == 3)	{this.direction = 'south'}
		else if (randomDirection == 4)	{this.direction = 'west'}
		else { 
			console.log('random direction error', randomDirection, "default direction to south");
			this.direction = 'south'
		}
	}

	this.move = function() {
		if (this.ticksToFreeze > 0) {
			this.ticksToFreeze--;
			return;
		}

		this.ticksFromLastMovement++;
		this.ticksFromLastDirectionChange++;
	
		if ( this.ticksFromLastDirectionChange >= this.ticksUntilDirectionChange ) {
			this.changeDirection();
			this.ticksFromLastDirectionChange = 0;
		}
		if ( this.ticksFromLastMovement >= this.ticksUntilNextMovement ) {
			var nextX = this.x;
			var nextY = this.y;

			// randomly choose direction
			//this.changeDirection()
				
			// next X/Y depending on direction
			if(this.direction == 'north') {
				nextY -= this.speed;
			}
			if(this.direction == 'east') {
				nextX += this.speed;
			}
			if(this.direction == 'south') {
				nextY += this.speed;
			}
			if(this.direction == 'west') {
				nextX -= this.speed;
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
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_KEY:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_SPIKE:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_CRYPT_WALL1:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_CRYPT_WALL2:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_CRYPT_WALL3:
					this.x = nextX;
					this.y = nextY;
					break;	
			        case TILE_WALL:
				        this.changeDirection();
					break;
				case TILE_SPIKE_WALL:
					this.changeDirection();
					break;
				default:
					this.changeDirection();
					// any other tile type number was found... do nothing, for now
					break;
			}
			this.ticksFromLastMovement = 0;
		}
		
	}

	this.draw = function() {
		//colorRect(this.x, this.y, 32,32, 'white');

		if (this.ticksToFreeze <= 0) {
			this.tickCount++;
			if(this.tickCount == this.ticksPerFrame){
				this.tickCount = 0;
				if(this.sprite == ghostSprite1){
					this.sprite = ghostSprite2;
				} else { this.sprite = ghostSprite1 }
			}
		}
	
		
	
		canvasContext.drawImage( this.sprite, this.x, this.y );
		//colorRect(this.x, this.y, 5,5, "white")
	}

	this.freeze = function(ticksToFreeze) {
		this.ticksToFreeze = ticksToFreeze;
	}

	


}
