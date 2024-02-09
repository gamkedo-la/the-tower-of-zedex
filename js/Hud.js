const HUD_INV_COLS= 3;
const HUD_INV_ROWS= 2; 
function HudClass() {

    this.maxHealth = 99;
    this.currentHealth = 90;

    this.maxAmmo = 9;
    this.currentAmmo = 9;

    this.hudX=0;
    this.hudY=450;
    this.hudElementSpacingWidth = 80;

    this.heartX = 50;
    this.heartY = 538;
    this.printHealthX = 36;
    this.printHealthY = 546;
    
    this.boomstickX = 50;
    this.boomstickY = 538;
    this.printAmmoX = 56;
    this.printAmmoY = 566;

    this.swordX = 50;
    this.swordY = 538;

    this.boxSize = 42;
    this.boxGap = 10;
    this.inventoryX = 300;
    this.inventoryY = 490;


    this.restoreHealth = function() {
        console.log("Player has used a potion");
        this.currentHealth = this.maxHealth;
    };

    this.restoreAmmo = function() {
    console.log("Player has used an ammo box");
    this.currentAmmo = this.maxAmmo;
    };




	this.pickupTypes = {
		0: function() {
            console.log("This inventory slot is EMPTY");

        },
		1: function() {
            this.restoreHealth();
        
        },
		2: function() {
            this.restoreAmmo();
            
        },
		3: function() {
            console.log("You have a Pick");
            
        },
		4: function() {
            console.log("You have the Key")
            
        },
	}

    this.inventory = [ 
		1, 1, 2, 
		0, 3, 0,
	];

    

    this.messageWindowX = 485;
    this.messageWindowY = 490;
    this.messageWindowWidth = 300;
    this.messageWindowHeight = 98

    this.isInvincible = false;
    this.maxInvincibilityFrames = 30
    this.invincibilityFrames = 10;
    
    this.checkInvisibility = function() {
     //   console.log(this.isInvincible,this.invincibilityFrames)
        if(hudDisplay.isInvincible){
            if(hudDisplay.invincibilityFrames < 1){
              hudDisplay.isInvincible = false;
              hudDisplay.invincibilityFrames = hudDisplay.maxInvincibilityFrames;
            }
            else {
              hudDisplay.invincibilityFrames--;
            }
        }
    }

   
    this.draw = function() {

		var spacing = this.hudElementSpacingWidth;

		drawBitmapCenteredAtLocationWithRotation(healthIcon, this.heartX+spacing*0, this.heartY, 0 );
		printText(this.currentHealth, this.printHealthX+spacing*0, this.printHealthY, 24, "white");

		drawBitmapCenteredAtLocationWithRotation(boomstickIcon, this.heartX+spacing*1, this.heartY, 0 );
		printText(this.currentAmmo, this.printAmmoX+spacing*1, this.printAmmoY, 24, "white");
		printText("[ x ]", 120, this.printAmmoY-64, 16, "yellow");

		drawBitmapCenteredAtLocationWithRotation(swordIcon, this.swordX+spacing*2, this.swordY, 0 );
		printText("[space]", this.printAmmoX+spacing*1+50, this.printAmmoY-64, 16, "yellow");

		for( i=0; i<HUD_INV_COLS; i++ ) {
			for( j=0; j<HUD_INV_ROWS; j++ ) {
				var xPosition = this.inventoryX + ((this.boxSize + this.boxGap) * i);
				var yPosition = this.inventoryY + ((this.boxSize + this.boxGap) * j);

				// draw Inventory Boxes
				drawRect(xPosition, yPosition, this.boxSize, this.boxSize, 2, 'grey')

				// draw pickup Icons
				//canvasContext.drawImage(pickupIcons, 32*i, 32*j, 32, 32, xPosition+5, yPosition+5, 32,32)
                var inventoryIndex = 3*j+i;
                if(this.inventory[inventoryIndex] == 0){
                    
                }
                else if(this.inventory[inventoryIndex] == 1){
                    canvasContext.drawImage(pickupPotion, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == 2){
                    canvasContext.drawImage(pickupAmmo, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == 3){
                    canvasContext.drawImage(pickupKey, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == 4){
                    canvasContext.drawImage(pickupMasterKey, xPosition+5, yPosition+5, 32,32)
                }
                

				// draw key numbers
				printText( (1+i)+(j*3) , xPosition, yPosition+6, 20, "cyan" )
			}
		}
		
		drawRect(this.messageWindowX, this.messageWindowY, this.messageWindowWidth, this.messageWindowHeight, 4, 'white');
    }

	

};

var hudDisplay = new HudClass();

