function zombieClass() {
  this.enemyType = EnemyType.ZOMBIE;

  this.x = 0;
  this.y = 0;
  this.width = 32;
  this.height = 32;
  this.rect = {
    left: this.x,
    right: this.x + this.width,
    top: this.y,
    bottom: this.y + this.height,
  };
  this.speed = 2.0;

  // Stats
  this.readyToRemove = false;
  this.maxHealth = 3;
  this.health = 0;
  this.attackDamage = 3;
  this.ticksToFreeze = 0;

  // Direction
  this.direction = "SOUTH";
  this.walkNorth = false;
  this.walkEast = false;
  this.walkSouth = true;
  this.walkWest = false;

  // Move frequency
  this.ticksFromLastMovement = 0;
  this.ticksUntilNextMovement = 2;
  this.ticksFromLastDirectionChange = 0;
  this.ticksUntilDirectionChange = 60;

  this.distanceToChase = 100;
  this.chasePlayer = false;

  // Animation stuff
  this.sprite;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = 15;

  this.init = function (enemyPic) {
    this.health = this.maxHealth;
    this.readyToRemove = false;
    this.sprite = enemyPic;
    this.reset();
  };

  this.reset = function (resetX, resetY) {
    for (var i = 0; i < roomGrid.length; i++) {
      if (roomGrid[i] == TILE_ZOMBIE) {
        var tileRow = Math.floor(i / ROOM_COLS);
        var tileCol = i % ROOM_COLS;
        this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
        this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
        roomGrid[i] = TILE_GROUND;
        break; // found it, so no need to keep searching
      } // end of if
    }
    this.x = this.homeX;
    this.y = this.homeY;

    this.health = this.maxHealth;
    this.readyToRemove = false;
  };

  this.enemyTypeName = function () {
    return Object.keys(EnemyType)[this.enemyType];
  };

  this.changeDirection = function (direction) {
    if (direction != undefined) {
      this.direction = direction;
      return;
    }
    var randomDirection = Math.ceil(Math.random() * 4);

    if (randomDirection == 1) {
      this.direction = "NORTH";
    } else if (randomDirection == 2) {
      this.direction = "EAST";
    } else if (randomDirection == 3) {
      this.direction = "SOUTH";
    } else if (randomDirection == 4) {
      this.direction = "WEST";
    } else {
      console.log(
        "random direction error",
        randomDirection,
        "default direction to SOUTH"
      );
      this.direction = "SOUTH";
    }
  };

  this.move = function () {
    if (this.ticksToFreeze > 0) {
      this.ticksToFreeze--;
      return;
    }

    // working on a chase movement pattern
    if (Math.abs(this.x - p1.x) <= this.distanceToChase) {
      this.chasePlayer = true;
    } else {
      this.chasePlayer = false;
    }

    if (this.chasePlayer == true) {
      if (Math.abs(p1.x - this.x) >= Math.abs(p1.y - this.y)) {
        if (p1.x > this.x) {
          this.changeDirection("EAST");
        } else this.changeDirection("WEST");
      } else {
        if (p1.y > this.y) {
          this.changeDirection("SOUTH");
        } else {
          this.changeDirection("NORTH");
        }
      }
    }

    var nextX = this.x;
    var nextY = this.y;
    var nextTileX = this.x;
    var nextTileY = this.y;

    // next X/Y depending on direction
    if (this.direction == "NORTH") {
      nextY -= this.speed;
      nextTileY = this.y - 16;
    }
    if (this.direction == "EAST") {
      nextX += this.speed;
      nextTileX = this.x + 16;
    }
    if (this.direction == "SOUTH") {
      nextY += this.speed;
      nextTileY = this.y + 16;
    }
    if (this.direction == "WEST") {
      nextX -= this.speed;
      nextTileX = this.x - 16;
    }

    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextTileX, nextTileY);
    var walkIntoTileType = TILE_WALL;

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }

    switch (walkIntoTileType) {
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
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
    this.ticksFromLastMovement = 0;
  };

  this.draw = function () {
    // drawRect(this.x, this.y, 32,32, 3, 'green');
    if (this.ticksToFreeze > 0) {
      colorRect(this.x, this.y, TILE_W, TILE_H, "dodgerblue");
    }
    if (this.ticksToFreeze <= 0) {
      this.tickCount++;
      if (this.tickCount == this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.sprite == zombieSprite1) {
          this.sprite = zombieSprite2;
        } else {
          this.sprite = zombieSprite1;
        }
      }
    }

    canvasContext.drawImage(this.sprite, this.x, this.y);
    //colorRect(this.x, this.y, 5,5, "blue")
  };

  this.freeze = function (ticksToFreeze) {
    this.ticksToFreeze = ticksToFreeze;
  };
}
