const HUD_INV_COLS= 3;
const HUD_INV_ROWS= 2; 

const INV_EMPTY= 0;
const INV_POTION= 1;
const INV_AMMO= 2;
const INV_KEY= 3;
const INV_MASTERKEY= 4;
const INV_SPELLSCROLL= 5;
 
function HudClass() {

    this.maxHealth = 99;
    this.currentHealth = 90;

    this.maxAmmo = 9;
    this.currentAmmo = 9;

    this.hudX=0;
    this.hudY=450;
    this.hudElementSpacingWidth = 80;

    this.heartX = 18;
    this.heartY = 506;
    this.printHealthX = 36;
    this.printHealthY = 546;
    
    this.boomstickX = 50;
    this.boomstickY = 538;
    this.printAmmoX = 56;
    this.printAmmoY = 566;

    this.swordX = 18;
    this.swordY = 506;

    this.boxSize = 42;
    this.boxGap = 10;
    this.inventoryX = 300;
    this.inventoryY = 490;


    this.restoreHealth = function() {
        messagingSystem.log("Player has used a potion");
        this.currentHealth = this.maxHealth;
    };

    this.restoreAmmo = function() {
    console.log("Player has used an ammo box");
    this.currentAmmo = this.maxAmmo;
    };

    this.checkInventoryForEmptySlot = function(currentSlotValue) {
        console.log(currentSlotValue == INV_EMPTY);
        return currentSlotValue == INV_EMPTY;
    };


	this.pickupTypes = {
		0: function() {
            messagingSystem.log("This inventory slot is EMPTY");

        },
		1: function() {
            this.restoreHealth();
        
        },
		2: function() {
            this.restoreAmmo();
            
        },
		3: function() {
            messagingSystem.log("You have a Pick");
            
        },
		4: function() {
            messagingSystem.log("You have the Key");
            
        },
        5: function() {
            messagingSystem.log("You have the Scroll");
            
        },
	}

    this.inventory = [ 
		INV_POTION, INV_POTION, INV_AMMO, 
		INV_EMPTY, INV_KEY, INV_SPELLSCROLL,
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
                if(this.inventory[inventoryIndex] == INV_EMPTY){
                    
                }
                else if(this.inventory[inventoryIndex] == INV_POTION){
                    canvasContext.drawImage(pickupPotion, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == INV_AMMO){
                    canvasContext.drawImage(pickupAmmo, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == INV_KEY){
                    canvasContext.drawImage(pickupKey, xPosition+5, yPosition+5, 32,32)
                }
                else if(this.inventory[inventoryIndex] == INV_MASTERKEY){
                    canvasContext.drawImage(pickupMasterKey, xPosition+5, yPosition+5, 32,32)
                }else if(this.inventory[inventoryIndex] == INV_SPELLSCROLL){
                    canvasContext.drawImage(pickupSpellScroll, xPosition+5, yPosition+5, 32,32)
				}
 

				// draw key numbers
				printText( (1+i)+(j*3) , xPosition, yPosition+6, 20, "cyan" )
			}
		}
		
		printText(messagingSystem.tail().message, this.messageWindowX + 20, this.messageWindowY + this.messageWindowHeight / 2, 16, "yellow");
		drawRect(this.messageWindowX, this.messageWindowY, this.messageWindowWidth, this.messageWindowHeight, 4, 'white');
    }

	

};

var hudDisplay = new HudClass();
