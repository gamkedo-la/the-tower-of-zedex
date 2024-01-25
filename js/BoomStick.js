const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function BoomStickClass() {
    this.x;
	this.y;

	this.readyToRemove = false;
	this.graphic = document.createElement("img");
	
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

        if(p1.facingDirection == "up"){	
		    this.xv = 0;
		    this.yv = -SHOT_SPEED;
        } else if(p1.facingDirection == "right"){
            this.xv = SHOT_SPEED;
            this.yv = 0;
        } else if(p1.facingDirection == "down"){
            this.xv = 0;
            this.yv = SHOT_SPEED;
        } else if(p1.facingDirection == "left"){
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
			this.readyToRemove = true
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
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white')
		}
	}
}
	