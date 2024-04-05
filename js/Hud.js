const HUD_INV_COLS = 3;
const HUD_INV_ROWS = 2;

const INV_EMPTY = 0;
const INV_POTION = 1;
const INV_AMMO = 2;
const INV_KEY = 3;
const INV_MASTERKEY = 4;
const INV_SPELLSCROLL = 5;

const FREEZE_RADIUS = 100;	// In pixels
const FREEZE_DURATION_IN_TICKS = 300;

function HudClass() {

    this.maxHealth = 99;
    this.currentHealth = 90;

    this.maxAmmo = 9;
    this.currentAmmo = 9;

    this.hudX = 0;
    this.hudY = 450;
    this.hudElementSpacingWidth = 80;

    this.heartX = 48;
    this.heartY = 506;
    this.printHealthX = 36;
    this.printHealthY = 546;

    this.boomstickX = 50;
    this.boomstickY = 538;
    this.printAmmoX = 56;
    this.printAmmoY = 566;

    this.swordX = 48;
    this.swordY = 506;

    this.boxSize = 42;
    this.boxGap = 10;
    this.inventoryX = 300;
    this.inventoryY = 490;

    this.affectCurrentHealth = function(healthDelta, message, messageType = MessageType.INFO) {
        this.currentHealth += healthDelta;

        let msg = message;
        let msgType = messageType;

        if (!msg) {
            if (healthDelta < 0) {
                msg = "You are hurt!";
                msgType = MessageType.DANGER;
            }
            else if (healthDelta > 0) {
                msg = "You have gained health!";
                msgType = MessageType.INFO
            }
        }

        messagingSystem.log(msg, msgType);
    }

    this.restoreHealth = function() {
        this.affectCurrentHealth(this.maxHealth - this.currentHealth);
    };

    this.restoreAmmo = function() {
        messagingSystem.log("You have gained ammo!", MessageType.INFO);
        this.currentAmmo = this.maxAmmo;
    };

    this.freezeEnemies = function() {
        // From the player's position (assuming that the player is the only one who can use this ability), get
        // the list of enemies from within the radius of 5 tiles. For each enemy, add a boolean flag to
        // represent whether they are frozen. If frozen, their movement and animation to stop. Otherwise,
        // business as usual.

        // Populating list of enemies within player's radius
        const enemiesWithinRadius = [];
        for (let i = 0; i < enemyList.length; i++) {
            const currEnemy = enemyList[i];
            if (((currEnemy.x - p1.x) ** 2 + (currEnemy.y - p1.y) ** 2) <= FREEZE_RADIUS ** 2) {
                enemiesWithinRadius.push(currEnemy);
            }
        }

        // Mark each enemy as frozen
        for (let i = 0; i < enemiesWithinRadius.length; i++) {
            const currEnemy = enemiesWithinRadius[i];
            currEnemy.freeze(FREEZE_DURATION_IN_TICKS);
        }
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
            messagingSystem.log("You restore health!", MessageType.ACTION);
            this.restoreHealth();

        },
        2: function() {
            messagingSystem.log("You restore ammo!", MessageType.ACTION);
            this.restoreAmmo();

        },
        3: function() {
            messagingSystem.log("You have a Pick", MessageType.ACTION);

        },
        4: function() {
            messagingSystem.log("You have the Key", MessageType.ACTION);

        },
        5: function() {
            messagingSystem.log("You used the Freeze Scroll", MessageType.ACTION);
            this.freezeEnemies();

        },
    }

    // Adds the given item and returns true if there is an empty slot, otherwise returns false.
    this.addItem = function(itemAsInt) {
        for (var i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] == 0) {
                this.inventory[i] = itemAsInt;
                pickup.play();

                if (inShopLevel()) {
                    destroyShopItems();
                }
                return true;
            }
        }

        return false;
    }

    // INV_POTION, 	 INV_POTION, 	INV_AMMO, 	 INV_EMPTY, 	 INV_KEY, 	 INV_SPELLSCROLL,
    this.inventory = [
        INV_EMPTY, INV_EMPTY, INV_EMPTY,
        INV_EMPTY, INV_EMPTY, INV_SPELLSCROLL,
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
        if (hudDisplay.isInvincible) {
            if (hudDisplay.invincibilityFrames < 1) {
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

        drawBitmapCenteredAtLocationWithRotation(healthIcon, this.heartX + spacing * 0, this.heartY, 0);
        printText(this.currentHealth, this.printHealthX + spacing * 0, this.printHealthY, 24, "white");

        drawBitmapCenteredAtLocationWithRotation(boomstickIcon, this.heartX + spacing * 1, this.heartY, 0);
        printText(this.currentAmmo, this.printAmmoX + spacing * 1, this.printAmmoY, 24, "white");
        printText("[ x ]", 120, this.printAmmoY - 64, 16, "yellow");

        drawBitmapCenteredAtLocationWithRotation(swordIcon, this.swordX + spacing * 2, this.swordY, 0);
        printText("[space]", this.printAmmoX + spacing * 1 + 50, this.printAmmoY - 64, 16, "yellow");

        for (i = 0; i < HUD_INV_COLS; i++) {
            for (j = 0; j < HUD_INV_ROWS; j++) {
                var xPosition = this.inventoryX + ((this.boxSize + this.boxGap) * i);
                var yPosition = this.inventoryY + ((this.boxSize + this.boxGap) * j);

                // draw Inventory Boxes
                drawRect(xPosition, yPosition, this.boxSize, this.boxSize, 2, 'grey')

                // draw pickup Icons
                //canvasContext.drawImage(pickupIcons, 32*i, 32*j, 32, 32, xPosition+5, yPosition+5, 32,32)
                var inventoryIndex = 3 * j + i;
                if (this.inventory[inventoryIndex] == INV_EMPTY) {

                }
                else if (this.inventory[inventoryIndex] == INV_POTION) {
                    canvasContext.drawImage(pickupPotion, xPosition + 5, yPosition + 5, 32, 32)
                }
                else if (this.inventory[inventoryIndex] == INV_AMMO) {
                    canvasContext.drawImage(pickupAmmo, xPosition + 5, yPosition + 5, 32, 32)
                }
                else if (this.inventory[inventoryIndex] == INV_KEY) {
                    canvasContext.drawImage(pickupKey, xPosition + 5, yPosition + 5, 32, 32)
                }
                else if (this.inventory[inventoryIndex] == INV_MASTERKEY) {
                    canvasContext.drawImage(pickupMasterKey, xPosition + 5, yPosition + 5, 32, 32)
                } else if (this.inventory[inventoryIndex] == INV_SPELLSCROLL) {
                    canvasContext.drawImage(pickupSpellScroll, xPosition + 5, yPosition + 5, 32, 32)
                }


                // draw key numbers
                printText((1 + i) + (j * 3), xPosition, yPosition + 6, 20, "cyan")
            }
        }

        const messagesYPosition = this.messageWindowY + this.messageWindowHeight / 4;
        const messagesYGap = 20;
        const messagesToDisplay = 4;
        const messages = messagingSystem.tail(4);

        for (let i = 0; i < messagesToDisplay && i <= messages.length - 1; i++) {
            printText(messages[i].message, this.messageWindowX + 20, messagesYPosition + messagesYGap * i, 16, MessageColor[messages[i].type]);
        }
        drawRect(this.messageWindowX, this.messageWindowY, this.messageWindowWidth, this.messageWindowHeight, 4, 'white');
    }



};

var hudDisplay = new HudClass();
