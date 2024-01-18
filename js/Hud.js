
function HudClass() {

    this.maxHealth = 99;
    this.currentHealth = 90;
    this.maxMagic = 99;
    this.currentMagic = 90;

    this.keysHeld = 0;

    this.hudX=0;
    this.hudY=450;
    this.hudElementSpacingWidth = 80;

    this.heartX = 50;
    this.heartY = 500;
    this.printHealthX = 36;
    this.printHealthY = 555;

    this.magicX = 50;
    this.magicY = 500;
    this.printMagicX = 36;
    this.printMagicY = 555;

    this.keyX = 50;
    this.keyY = 490;
    this.printKeyX = 36;
    this.printKeyY = 555

    this.messageWindowX = 485;
    this.messageWindowY = 458;
    this.messageWindowWidth = 300;
    this.messageWindowHeight = 130

    this.isInvincible = false;
    this.maxInvincibilityFrames = 30
    this.invincibilityFrames = 10;
    
    this.checkInvisibility = function() {
        console.log(this.isInvincible,this.invincibilityFrames)
        if(healthDisplay.isInvincible){
            if(healthDisplay.invincibilityFrames < 1){
              healthDisplay.isInvincible = false;
              healthDisplay.invincibilityFrames = healthDisplay.maxInvincibilityFrames;
            }
            else {
              healthDisplay.invincibilityFrames--;
            }
        }
    }
    
    this.draw = function() {

            var spacing = this.hudElementSpacingWidth;

            drawBitmapCenteredAtLocationWithRotation(healthIcon, this.heartX+spacing*0, this.heartY, 0 );
            printText(this.currentHealth, this.printHealthX+spacing*0, this.printHealthY, 24, "white");

            drawBitmapCenteredAtLocationWithRotation(magicIcon, this.heartX+spacing*1, this.heartY, 0 );
            printText(this.currentMagic, this.printHealthX+spacing*1, this.printHealthY, 24, "white");

            drawBitmapCenteredAtLocationWithRotation(keyIcon, this.keyX+spacing*2, this.keyY, 0 );
            printText(this.keysHeld, this.printKeyX+spacing*2, this.printKeyY, 24, "white");
        
        

        canvasContext.beginPath();
        canvasContext.strokeStyle = "white";
        canvasContext.lineJoin = "round";
        canvasContext.lineWidth = "6";
        canvasContext.rect( this.messageWindowX, this.messageWindowY, this.messageWindowWidth, this.messageWindowHeight )
        canvasContext.stroke();

        // for(i=0; i<this.currentHealth;i++) {
        //     drawBitmapCenteredAtLocationWithRotation(healthUnit, this.originX+this.unitSpacing*i, this.originY, 0);    
        // }
        
    }

};

var healthDisplay = new HudClass();

