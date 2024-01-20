// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  
  p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey == thisPlayer.controlKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
    thisPlayer.facingDirection = "up";
  }
  if(thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
    thisPlayer.facingDirection = "right";
  }
  if(thisKey == thisPlayer.controlKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
    thisPlayer.facingDirection = "down";
  }
  if(thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
    thisPlayer.facingDirection = "left";
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  if(evt.key == "q"){
    healthDisplay.health-=1;
  }
  if(evt.key == "w"){
    healthDisplay.health+=1;
  }
  if(evt.key == " "){
    p1.swordAttack();
  }
  if(evt.key == "1"){
    loadLevel(level[0])
    p1.reset();
  }
  if(evt.key == "2"){
    loadLevel(level[1])
    p1.reset();
  }
  if(evt.key == "3"){
    loadLevel(level[2])
    p1.reset();
  }
  
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
}