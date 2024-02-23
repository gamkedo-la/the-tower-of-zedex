const SHOT_SPEED = 6.0;
const SHOT_LIFE = 40;
const SHOT_DISPLAY_RADIUS = 4.0;

function BoomStickClass() {
    this.x;
	this.y;

	this.readyToRemove = false;
	this.sprite = bullet0;

	this.sprite;
	this.frameIndex =      0;
	this.tickCount =       0;
	this.ticksPerFrame =  3;
	
	this.reset = function() {
        this.xv = 0;
		this.yv = 0;
		this.shotLife = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.readyToRemove = true;
	}

    // this.isShotReadyToFire = function(){
	// 	return (this.shotLife <= 0);
	// }

    this.shootFrom = function(entityFiring){
		this.x = entityFiring.x;
		this.y = entityFiring.y;

        if(p1.facingDirection == "UP"){	
		    this.xv = 0;
		    this.yv = -SHOT_SPEED;
        } else if(p1.facingDirection == "RIGHT"){
            this.xv = SHOT_SPEED;
            this.yv = 0;
        } else if(p1.facingDirection == "DOWN"){
            this.xv = 0;
            this.yv = SHOT_SPEED;
        } else if(p1.facingDirection == "LEFT"){
            this.xv = -SHOT_SPEED;
            this.yv = 0;
        }

		this.shotLife = SHOT_LIFE;
	}

    this.movement = function() {
        if(this.shotLife > 0){
			this.shotLife--;
            this.x += this.xv;
            this.y += this.yv;
        }
		else {
			this.readyToRemove = true;
		}

		for(var i = 0; i < enemyList.length; i++){
			if(	this.x > enemyList[i].x 		&& 
				this.x < enemyList[i].x + 32 	&& // 32 is a stand-in for tile width
				this.y > enemyList[i].y &&
				this.y < enemyList[i].y + 32 )
				{
					this.shotLife = 0;
					this.readyToRemove = true;
					console.log(enemyList[i]+" has taken 1 damage.");
					console.log(enemyList[i]+" Health: "+enemyList[i].health);
					enemyList[i].health -= 1;
					if( enemyList[i].health < 1){
						enemyList[i].readyToRemove = true;
				}
			}
		}

	}	

	this.hitTest = function(thisEnemy) { 
		if(this.shotLife <= 0) {
			this.readyToRemove = true;
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}	
	
	this.draw = function(){
		if(this.shotLife > 0){
			
			this.tickCount++;
			if(this.tickCount == this.ticksPerFrame){
				this.tickCount = 0;
				if(this.sprite == bullet0){
					this.sprite = bullet1;
				} else if( this.sprite == bullet1 ){
					this.sprite = bullet2;
				} else {
					this.sprite = bullet0;
				}
			}
			drawBitmapCenteredAtLocationWithRotation( this.sprite, this.x, this.y, 0.0 );
		}
	}


}
	