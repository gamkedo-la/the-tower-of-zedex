const SHOT_SPEED = 6.0;
const SHOT_LIFE = 40;
const SHOT_DISPLAY_RADIUS = 4.0;

function boomStickClass(targetPlayer, damage) {
    this.x;
	this.y;
	this.width = 32;
	this.height = 32;
	this.rect = {
		left: this.x,
		right: this.x + this.width,
		top: this.y,
		bottom: this.y + this.height
	}
	this.targetPlayer = targetPlayer;
	this.damage = damage;
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


	    if (this.targetPlayer) {
		    // The only enemy that can target player is turret, which uses
		    // the property "direction"
		    if (entityFiring.direction == 'NORTH'){
			    this.xv = 0;
			    this.yv = -SHOT_SPEED;
		    } else if(entityFiring.direction == 'EAST'){
			    this.xv = SHOT_SPEED;
			    this.yv = 0;
		    } else if(entityFiring.direction == 'SOUTH'){
			    this.xv = 0;
			    this.yv = SHOT_SPEED;
		    } else if(entityFiring.direction == 'WEST'){
			    this.xv = -SHOT_SPEED;
			    this.yv = 0;
		    }
	    } else {
		    // If not targetting player, then the player is shooting
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

	    }
	    

            
	    this.shotLife = SHOT_LIFE;
	}

	// The one who instantiated this is responsible for calling this every frame.
	this.movement = function() {
            if(this.shotLife > 0){
		    this.shotLife--;
		    this.x += this.xv;
		    this.y += this.yv;
			//update rect
			this.rect = {
				left: this.x,
				right: this.x + this.width,
				top: this.y,
				bottom: this.y + this.height
			}
            }
	    else {
		    this.readyToRemove = true;
	    }

	    if(this.targetPlayer) {
		    if (this.x > p1.x &&
			this.x < p1.x + 32 &&
			this.y > p1.y &&
			this.y < p1.y + 32 )
		    {
			    this.shotLife = 0;
			    this.readyToRemove = true;
			    if(p1.ticksUntilDamage <= 0) {
			    	p1.ticksUntilDamage = 15;
	                hudDisplay.affectCurrentHealth(-this.damage, "You got hit by a bullet!", MessageType.DANGER);
				    playerHurt.play();
				}
			    // Player reset upon death  happens in the top level update function, so we don't
			    // care about that here.
		    }
	    }
	    else {
		    for(var i = 0; i < enemyList.length; i++){
			    if(	this.x > enemyList[i].x 		&& 
				this.x < enemyList[i].x + 32 	&& // 32 is a stand-in for tile width
				this.y > enemyList[i].y &&
				this.y < enemyList[i].y + 32 )
			    {
				    this.shotLife = 0;
				    this.readyToRemove = true;
				    messagingSystem.log(enemyList[i].enemyTypeName() + " has taken 1 damage.");
				    messagingSystem.log(enemyList[i].enemyTypeName() +
							" Health: "+enemyList[i].health);
				    enemyList[i].health -= this.damage;
				    if( enemyList[i].health < 1){
					    enemyList[i].readyToRemove = true;
				    }
			    }
		    } 
	    }

		

	}	

	this.hitTest = function(thisEnemy) {
		// Now that BoomStick is generalized to work with hitting players as well as enemies,
		// this function ought to be redone/renamed. It doesn't seem like it's being used,
		// so I leave it be for now. Future person using this function take note.  - Marvin
		if(this.shotLife <= 0) {
			this.readyToRemove = true;
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}	

	// The one who instantiated this is responsible for calling draw every frame.
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
	
