// tuning constants
const PLAYER_MOVE_SPEED = 4.0;
const BULLET_DAMAGE = 1;
const FRAMES_PER_ANIM = 1;
function warriorClass() {
  // variables to keep track of position
  this.x = 0;
  this.y = 0;
  this.width = 30;
  this.height = 30;
  this.rect = {
    left: this.x,
    right: this.x + this.width,
    top: this.y,
    bottom: this.y + this.height,
  };

  // boomstick shot list
  this.myShotList = [];
  this.totalShots = 3;

  this.playerState = "NORMAL"; // NORMAL, ATTACKING, SHOOTING
  this.facingDirection = "DOWN";

  this.sx = 0;
  this.sy = 0;

  this.bumpSlideX = 0;
  this.bumpSlideY = 0;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  this.framesUntilAnim = FRAMES_PER_ANIM;
  this.animFrame = 0;
  this.ticks = 0;
  this.ticksUntilDamage = 5;

  // key controls used for this
  this.setupControls = function (northKey, eastKey, southKey, westKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
  };

  this.init = function (whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  };

  this.reset = function () {
    hudDisplay.currentHealth = hudDisplay.maxHealth;
    this.keysHeld = 0;
    for (var i = 0; i < roomGrid.length; i++) {
      if (roomGrid[i] == TILE_PLAYER) {
        var tileRow = Math.floor(i / ROOM_COLS);
        var tileCol = i % ROOM_COLS;
        this.x = tileCol * TILE_W; //+ 0.5*TILE_W;
        this.y = tileRow * TILE_H; //+ 0.5*TILE_H;
        roomGrid[i] = TILE_GROUND;
        console.log("removing player tile");
        break; // found it, so no need to keep searching
      } // end of if
    } // end of for
  }; // end of reset

  this.swordAttack = function () {
    if (this.playerState != "NORMAL") {
      return;
    }
    this.playerState = "ATTACKING";
    messagingSystem.log("Sword attack initiated.", MessageType.ACTION);

    var attackCenterX = this.x;
    var attackCenterY = this.y;
    var attackW = TILE_W;
    var attackH = TILE_H;

    // var attackRect = {
    // 	left: this.x,
    // 	right: this.x + this.width,
    // 	top: this.y,
    // 	bottom: this.y + this.height
    // }

    if (this.facingDirection == "DOWN") {
      attackCenterX += TILE_W / 2;
      attackCenterY += TILE_H * 1.5;
      attackW = TILE_W * 1.5;

      // attackRect.left = 	this.x - 16;
      // attackRect.right = 	this.x + 32;
      // attackRect.top = 	this.y + 32;
      // attackRect.bottom = this.y + 64;
    }
    if (this.facingDirection == "UP") {
      attackCenterX += TILE_W / 2;
      attackCenterY -= TILE_H / 2;
      attackW = TILE_W * 1.5;

      // attackRect.left = 	this.x;
      // attackRect.right = 	this.x + 48;
      // attackRect.top = 	this.y - 32;
      // attackRect.bottom = this.y;
    }
    if (this.facingDirection == "LEFT") {
      attackCenterX -= TILE_W / 2;
      attackCenterY += TILE_H / 2 + 8;
      attackH = TILE_H * 1.5;

      // attackRect.left = 	this.x - 32;
      // attackRect.right = 	this.x;
      // attackRect.top = 	this.y - 16;
      // attackRect.bottom = this.y + 32;
    }
    if (this.facingDirection == "RIGHT") {
      attackCenterX += TILE_W + 8;
      attackCenterY += TILE_H / 2;
      attackH = TILE_H * 1.5;

      // attackRect.left = 	this.x + 32;
      // attackRect.right = 	this.x + 64;
      // attackRect.top = 	this.y;
      // attackRect.bottom = this.y + 48;
    }
    var attackX = attackCenterX - attackW / 2;
    var attackY = attackCenterY - attackH / 2;

    colorRect(attackX, attackY, attackW, attackH, "orange");
    //colorRect(attackRect.left, attackRect.bottom, attackW, attackH, "orange");

    swordSwing.play();
    console.log(attackRect);
    // loop through enemy list and check if enemy overlaps hitbox
    for (var i = 0; i < enemyList.length; i++) {
      if (
        enemyList[i].x + 16 > attackX &&
        enemyList[i].x + 16 < attackX + attackW &&
        enemyList[i].y + 16 > attackY &&
        enemyList[i].y + 16 < attackY + attackH
      ) {
        // if(rectCollision(enemyList[i].rect, attackRect)){
        // 	console.log(rectCollision(enemyList[i].rect, attackRect))

        messagingSystem.log(
          enemyList[i].enemyTypeName() + " has taken 1 damage."
        );
        messagingSystem.log(
          enemyList[i].enemyTypeName() + " Health: " + enemyList[i].health
        );
        enemyList[i].health -= 1;
        if (enemyList[i].health < 1) {
          enemyList[i].readyToRemove = true;
        }
      }
    }
  };

  this.boomStickShot = function () {
    if (hudDisplay.currentAmmo > 0) {
      if (this.myShotList.length < this.totalShots) {
        let tempShot = new boomStickClass(false, BULLET_DAMAGE);
        tempShot.shootFrom(this);
        this.myShotList.push(tempShot);
        hudDisplay.currentAmmo -= 1;
        boomstickFire.play();
        messagingSystem.log("Player fires boom stick!", MessageType.ACTION);
      }
    }
  };

  this.removeBullet = function () {
    for (var i = this.myShotList.length - 1; i >= 0; i--) {
      if (this.myShotList[i].readyToRemove) {
        this.myShotList.splice(i, 1);
      }
    }
  };

  this.handleEnemyCollision = function () {
    this.ticksUntilDamage = 10;
    this.ticks += 1;

    // BASIC SINGLE POINT COLLISION CHECK
    // NEED TO UPGRADE TO CHECK ALL EDGES/SIDES
    for (var i = 0; i < enemyList.length; i++) {
      // console.log(enemyList[i])
      if (
        this.x > enemyList[i].x &&
        this.x < enemyList[i].x + TILE_W &&
        this.y > enemyList[i].y &&
        this.y < enemyList[i].y + TILE_H
      ) {
        messagingSystem.log(
          `Player and ${enemyList[i].enemyTypeName()} in collision!`,
          MessageType.DANGER
        );

        // if(this.ticks >= this.ticksUntilDamage) {
        // 	this.ticks = 0;
        hudDisplay.currentHealth -= enemyList[i].attackDamage;
        var difX = this.x - enemyList[i].x;
        var difY = this.y - enemyList[i].y;
        if (Math.abs(difX) > Math.abs(difY)) {
          if (difX < 0) {
            this.bumpSlideX = -10;
          } else {
            this.bumpSlideX = 10;
          }
        } else {
          if (difY < 0) {
            this.bumpSlideY = -10;
          } else {
            this.bumpSlideY = 10;
          }
        }

        playerHurt.play();
        //}
      }
    }
  };

  this.move = function () {
    this.prevX = this.x;
    this.prevY = this.y;
    var nextX = this.x + this.bumpSlideX;
    var nextY = this.y + this.bumpSlideY;
    this.movedRect = {
      left: nextX,
      right: nextX + this.width,
      top: nextY,
      bottom: nextY + this.height,
    };
    this.bumpSlideX *= 0.8;
    this.bumpSlideY *= 0.8;

    this.removeBullet();

    if (this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingUp;
      this.sx = 0;
    }
    if (this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingRight;
      this.sx = 32;
    }
    if (this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingDown;
      this.sx = 64;
    }
    if (this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED;
      this.myBitmap = playerFacingLeft;
      this.sx = 96;
    }

    this.x = nextX;
    this.y = nextY;
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    //var walkIntoTileIndex = tileCollisionCheck(this.movedRect, roomGrid);
    //var walkIntoTileType = TILE_WALL;

    // if( walkIntoTileIndex != undefined) {
    // 	// walkIntoTileType = roomGrid[walkIntoTileIndex];
    // 	walkIntoTyleType = tileCollisionCheck(this.movedRect, roomGrid);
    // }
    walkIntoTileType = tileCollisionCheck(this.movedRect, roomGrid);

    switch (walkIntoTileType) {
      case TILE_GROUND:
        this.handleEnemyCollision();
        break;
      case TILE_GOAL:
        if (inEditorPlayMode()) {
          quitLevelInEditor();
        } else {
          if (inShopLevel()) {
            exitShopLevel();
            currentLevel += 1;
            loadLevel(level[currentLevel]);
          } else {
            loadShopLevel();
          }
        }
        break;
      case TILE_DOOR:
        for (var i = 0; i < hudDisplay.inventory.length; i++) {
          if (hudDisplay.inventory[i] == 3 || hudDisplay.inventory[i] == 4) {
            hudDisplay.inventory[i] = 0;
            useKey.play();
            roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
            return;
          }
        }
        this.x = Math.round(this.x / TILE_W) * TILE_W;
        this.y = Math.round(this.y / TILE_H) * TILE_H;
        break;
      case TILE_MASTER_KEY:
        if (hudDisplay.addItem(4)) {
          roomGrid[walkIntoTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_KEY:
        if (hudDisplay.addItem(3)) {
          roomGrid[walkIntoTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_POTION:
        if (hudDisplay.addItem(1)) {
          roomGrid[walkIntoTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_AMMO:
        if (hudDisplay.addItem(2)) {
          roomGrid[walkIntoTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_FREEZE_SCROLL:
        if (hudDisplay.addItem(5)) {
          roomGrid[walkIntoTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_CHEST:
        roomGrid[walkIntoTileIndex] = TILE_MASTER_KEY;

        break;
      case TILE_SPIKE:
        this.ticksUntilDamage = 5;
        this.ticks += 1;

        if (this.ticks >= this.ticksUntilDamage) {
          this.ticks = 0;
          hudDisplay.currentHealth -= 1;
          playerHurt.play();
          messagingSystem.log("Player is hurt!", MessageType.DANGER);
        }
        break;
      case TILE_CRYPT_DAMAGE_FLOOR:
        this.ticksUntilDamage = 5;
        this.ticks += 1;

        if (this.ticks >= this.ticksUntilDamage) {
          this.ticks = 0;
          hudDisplay.currentHealth -= 5;
          playerHurt.play();
        }
        break;
      case TILE_SPIKE_WALL:
        hudDisplay.currentHealth -= 2;
        playerHurt.play();
        break;
      case TILE_WALL:

      default:
        // messagingSystem.log('Player hits wall!', MessageType.DANGER);
        //this works-ish, but it's not the best way to handle it, ultimately want to test collision on x and y axis separately
        this.x = Math.round(this.x / TILE_W) * TILE_W;
        this.y = Math.round(this.y / TILE_H) * TILE_H;
        // any other tile type number was found... do nothing, for now
        break;
    }

    // this.handleEnemyCollision();

    for (var i = 0; i < this.myShotList.length; i++) {
      this.myShotList[i].movement();
    }
  };

  this.drawPlayerAttackHitBoxes = function () {
    var attackCenterX = this.x;
    var attackCenterY = this.y;
    var attackW = TILE_W;
    var attackH = TILE_H;

    if (this.facingDirection == "DOWN") {
      attackCenterY += TILE_H * 1.5;
      attackW = TILE_W * 1.5;
    }
    if (this.facingDirection == "UP") {
      attackCenterY -= TILE_H / 2;
      attackW = TILE_W * 1.5;
    }
    if (this.facingDirection == "LEFT") {
      attackCenterX -= TILE_W / 2;
      attackCenterY += TILE_H / 2;
      attackH = TILE_H * 1.5;
    }
    if (this.facingDirection == "RIGHT") {
      attackCenterX += TILE_W + 8;
      attackCenterY += TILE_H / 2;
      attackH = TILE_H * 1.5;
    }

    var attackX = attackCenterX - attackW / 2;
    var attackY = attackCenterY - attackH / 2;

    canvasContext.strokeStyle = "white";
    canvasContext.lineWidth = 1;
    canvasContext.strokeRect(attackX, attackY, attackW, attackH);
  };

  this.draw = function () {
    // if(this.playerState == "ATTACKING") {
    // 	this.ticksPerAnimationFrame = 5;
    // 	this.ticks++;
    // 	this.animationFrames = 3;
    // 	this.
    // 	canvasContext.drawImage(playerSprites, this.sx, this.sy, this.tileSize, this.tileSize, this.x, this.y);

    // 	if (this.ticks == 5) {
    // 		canvasContext.drawImage(playerSprites, this.sx, this.sy, this.tileSize, this.tileSize, this.x, this.y)
    // 	}

    // } else {
    var facingRow = 0;
    if (this.facingDirection == "DOWN") {
      facingRow = 0;
    }
    if (this.facingDirection == "LEFT") {
      facingRow = 1;
    }
    if (this.facingDirection == "RIGHT") {
      facingRow = 2;
    }
    if (this.facingDirection == "UP") {
      facingRow = 3;
    }
    if (this.playerState == "ATTACKING") {
      drawBitmapCenteredAnimFrame(
        playerAttackSprites,
        this.x + 16,
        this.y + 16,
        this.animFrame,
        facingRow,
        64
      );
    } else {
      canvasContext.drawImage(this.myBitmap, this.x, this.y);
    }
    // drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
    colorRect(this.x, this.y, 5, 5, "magenta");
    // console.log(this.myBitmap.width)
    if (this.framesUntilAnim-- < 0) {
      this.framesUntilAnim = FRAMES_PER_ANIM;
      this.animFrame++;
      var framesPerState = 1;
      if (this.playerState == "ATTACKING") {
        framesPerState = 3;
      }
      if (this.animFrame >= framesPerState) {
        this.animFrame = 0;
        this.playerState = "NORMAL";
      }
    }
    // if(this.playerState == "ATTACK") {
    // 	colorRect(attackX, attackY, attackW, attackH, "white");
    // 	ticks++;
    // 	if(ticks >= 5){
    // 		this.playerState =="NONE";
    // 	}
    // }

    for (var i = 0; i < this.myShotList.length; i++) {
      this.myShotList[i].draw();
    }
  };
} // end of class
